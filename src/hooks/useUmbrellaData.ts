import { UMBRELLA_DATA_AGGREGATION_HELPER_ABI } from "@/abis/umbrellaDataAggregationHelper";
import { PRICE_FEED_DECIMALS } from "@/constants/oracle";
import { UmbrellaData } from "@/types/umbrella";
import { formatBigInt } from "@/utils/formatting";
import { useMemo } from "react";
import { useReadContract } from "wagmi";
import { useCurrentMarket } from "./useCurrentMarket";

export const useUmbrellaData = () => {
  const { chainId, umbrellaDataAggregationHelper, umbrellaHelper, oracle } = useCurrentMarket();

  const { data, ...rest } = useReadContract({
    chainId,
    abi: UMBRELLA_DATA_AGGREGATION_HELPER_ABI,
    address: umbrellaDataAggregationHelper,
    functionName: "getUmbrellaData",
    args: [umbrellaHelper, oracle],
  });

  return {
    data: useMemo(() => {
      if (!data) {
        return undefined;
      }

      return data.map(({ stakeTokenConfig, rewardsControllerConfigs, umbrellaConfig }) => {
        return {
          stakeTokenConfig: {
            stakeToken: {
              address: stakeTokenConfig.stakeToken.token,
              price: formatBigInt(stakeTokenConfig.stakeToken.price, PRICE_FEED_DECIMALS),
              latestAnswer: stakeTokenConfig.stakeToken.price,
              name: stakeTokenConfig.stakeToken.name,
              symbol: stakeTokenConfig.stakeToken.symbol,
              decimals: stakeTokenConfig.stakeToken.decimals,
            },
            totalAssets: stakeTokenConfig.totalAssets,
            totalSupply: stakeTokenConfig.totalSupply,
            cooldown: Number(stakeTokenConfig.cooldown),
            unstakeWindow: stakeTokenConfig.unstakeWindow,
          },
          rewardsControllerConfigs: {
            targetLiquidity: rewardsControllerConfigs.targetLiquidity,
            rewardConfigs: rewardsControllerConfigs.rewardConfigs.map(
              ({ reward, maxEmissionPerSecond, distributionEnd }) => {
                return {
                  reward: {
                    address: reward.token,
                    price: formatBigInt(reward.price, PRICE_FEED_DECIMALS),
                    latestAnswer: reward.price,
                    name: reward.name,
                    symbol: reward.symbol,
                    decimals: reward.decimals,
                  },
                  maxEmissionPerSecond,
                  distributionEnd,
                };
              },
            ),
          },
          umbrellaConfig,
        } satisfies UmbrellaData;
      });
    }, [data]),
    ...rest,
  };
};
