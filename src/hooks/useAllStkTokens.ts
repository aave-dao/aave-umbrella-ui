import { UMBRELLA_DATA_AGGREGATION_HELPER_ABI } from "@/abis/umbrellaDataAggregationHelper";
import { ZERO_CONTRACT_ADDRESS } from "@/constants/contracts";
import { PRICE_FEED_DECIMALS } from "@/constants/oracle";
import { useAllReserves } from "@/hooks/useAllReserves";
import { useCurrentMarket } from "@/hooks/useCurrentMarket";
import { Reward, StkToken } from "@/types/token";
import { calculateApyData } from "@/utils/calculations";
import { calculateRewardApy } from "@/utils/calculations/apy/apy";
import { getCurrentUnixTimestamp } from "@/utils/date";
import { formatBigInt, formatUSDPrice } from "@/utils/formatting";
import {
  extractStataToken,
  extractUnderlyingToken,
  findTokenInPathData,
  StkTokenPathData,
  UserPathData,
} from "@/utils/web3";
import { useMemo } from "react";
import { useAccount, useReadContract } from "wagmi";

export const applyMinimumTotalAssets = (totalAssets: bigint, distributionEnd: bigint) => {
  const now = BigInt(getCurrentUnixTimestamp());

  if (now > distributionEnd) {
    return totalAssets;
  }

  if (totalAssets > 10n ** 6n) {
    return totalAssets;
  }

  return 10n ** 6n;
};

export const useAllStkTokens = () => {
  const { address: owner } = useAccount();
  const { chainId, umbrellaDataAggregationHelper, umbrellaHelper, oracle } = useCurrentMarket();

  const { data: reserves, isLoading: isReservesLoading } = useAllReserves();

  const { data, isLoading, ...rest } = useReadContract({
    chainId,
    abi: UMBRELLA_DATA_AGGREGATION_HELPER_ABI,
    address: umbrellaDataAggregationHelper,
    functionName: "getAllAggregatedData",
    args: [umbrellaHelper, oracle, owner ?? ZERO_CONTRACT_ADDRESS],
  });

  return {
    data: useMemo(() => {
      if (!data || !reserves) return undefined;

      const [aggregatedData, pathData, userAggregatedData, userPathData] = data;

      return aggregatedData
        .map(({ stakeTokenData, rewardsTokenData, totalAssets, targetLiquidity, maxTotalAssets }, index) => {
          const { stakeUserBalance, rewardsTokenUserData } = userAggregatedData[index] ?? {};
          const stkTokenPathData = pathData[index] as StkTokenPathData;
          const stkTokenUserPathData = userPathData[index] as UserPathData;

          const underlying = extractUnderlyingToken(stkTokenPathData, stkTokenUserPathData);
          const reserveAddress = findTokenInPathData(stkTokenPathData, "a")?.tokenData.token;
          const reserve = reserves.find((reserve) => reserve.address === reserveAddress);
          const stataToken = extractStataToken(stkTokenPathData, stkTokenUserPathData);
          const rewards: Reward[] = rewardsTokenData.map(
            ({ rewardTokenData, distributionEnd, maxEmissionPerSecond }, rewardIndex) => {
              const { currentReward } = rewardsTokenUserData?.[rewardIndex] ?? {};

              const apy = calculateRewardApy({
                maxEmissionPerSecond,
                targetLiquidity,
                totalAssets: applyMinimumTotalAssets(totalAssets, distributionEnd),
                distributionEnd,
                decimals: stakeTokenData.decimals,
                price: stakeTokenData.price,
                priceFeedDecimals: PRICE_FEED_DECIMALS,
                token: {
                  decimals: rewardTokenData.decimals,
                  price: rewardTokenData.price,
                  priceFeedDecimals: PRICE_FEED_DECIMALS,
                },
              });

              return {
                type: "underlying",
                address: rewardTokenData.token,
                name: rewardTokenData.name,
                symbol: rewardTokenData.symbol,
                decimals: rewardTokenData.decimals,
                balance: currentReward,
                balanceFormatted: formatBigInt(currentReward, rewardTokenData.decimals),
                latestAnswer: rewardTokenData.price,
                latestAnswerFormatted: formatBigInt(rewardTokenData.price, PRICE_FEED_DECIMALS),
                usdAmount: formatUSDPrice({
                  balance: currentReward,
                  decimals: rewardTokenData.decimals,
                  usdPrice: rewardTokenData.price,
                }),
                apy,
                distributionEnd,
                maxEmissionPerSecond,
              };
            },
          );
          const stkToken: Omit<StkToken, "apyData"> = {
            type: "stk",
            address: stakeTokenData.token,
            name: stakeTokenData.name,
            symbol: stakeTokenData.symbol,
            decimals: stakeTokenData.decimals,
            balance: stakeUserBalance,
            balanceFormatted: formatBigInt(stakeUserBalance, stakeTokenData.decimals),
            latestAnswer: stakeTokenData.price,
            latestAnswerFormatted: formatBigInt(stakeTokenData.price, PRICE_FEED_DECIMALS),
            usdAmount: formatUSDPrice({
              balance: stakeUserBalance,
              decimals: stakeTokenData.decimals,
              usdPrice: stakeTokenData.price,
            }),
            isUnderlyingStataToken: !!reserveAddress,
            totalAssets,
            totalRewardsUSDAmount: rewards.reduce((acc, { usdAmount }) => acc + (usdAmount ?? 0), 0),
            targetLiquidity,
            maxTotalAssets,
            rewards,
            reserve: reserve ?? null,
            stata:
              stataToken && reserve
                ? {
                    ...stataToken,
                    reserve,
                    underlying: {
                      ...underlying,
                      reserve,
                    },
                  }
                : null,
            underlying: {
              ...underlying,
              reserve: reserve ?? null,
            },
          };

          return {
            ...stkToken,
            apyData: calculateApyData(stkToken),
          } satisfies StkToken;
        })
        .filter((stkToken) => !!stkToken);
    }, [reserves, data]),
    isLoading: isReservesLoading || isLoading,
    ...rest,
  } as const;
};
