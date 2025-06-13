import { Token } from "@/app/components/Token/Token";
import { AssetIcon } from "@/components/AssetIcon/AssetIcon";
import { Mobile, TabletAndDesktop } from "@/components/MediaQueries/MediaQueries";
import { ModalBody, ModalClose, ModalRoot, ModalTitle } from "@/components/Modal/Modal";
import { NumberDisplay } from "@/components/NumberDisplay/NumberDisplay";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/Tooltip/Tooltip";
import { Block } from "@/components/ui/Block";
import { Button } from "@/components/ui/Button";
import { useUmbrellaData } from "@/hooks/useUmbrellaData";
import { StkToken } from "@/types/token";
import { ChevronDown, InfoIcon } from "lucide-react";
import { memo, useState } from "react";
import { formatUnits } from "viem";

const MAX_TOKENS_TO_SHOW = 4;

export type StakedSummaryProps = {
  stkTokens: StkToken[];
};

export const StakedSummary = memo(({ stkTokens }: StakedSummaryProps) => {
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const [selectedToken, setSelectedToken] = useState<StkToken | null>(null);
  const { data: umbrellaData } = useUmbrellaData();

  if (stkTokens.length === 0) {
    return null;
  }

  const totalStakedUSD = stkTokens.reduce((acc, { decimals, totalAssets, latestAnswerFormatted }) => {
    const stakedTokens = Number(formatUnits(totalAssets, decimals));
    return acc + stakedTokens * latestAnswerFormatted;
  }, 0);

  const tokensToShow = stkTokens.slice(0, MAX_TOKENS_TO_SHOW);

  const renderTokenDetails = (token: StkToken) => {
    const {
      address,
      totalAssets,
      decimals,
      latestAnswerFormatted,
      targetLiquidity,
      underlying,
      isUnderlyingStataToken,
      apyData,
    } = token;

    const stakedUSD = Number(formatUnits(totalAssets, decimals)) * latestAnswerFormatted;
    const targetLiquidityUSD = Number(formatUnits(targetLiquidity, decimals)) * latestAnswerFormatted;

    return (
      <div key={address} className="border-main-200 flex flex-col gap-4 border-b pb-4 last:border-b-0 last:pb-0">
        <div className="flex items-center gap-3">
          <Token
            token={{
              address,
              symbol: underlying.symbol,
              type: isUnderlyingStataToken ? "stkStata" : "stk",
            }}
          />
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex flex-col gap-1">
            <div className="text-main-500">Total Staked</div>
            <NumberDisplay value={stakedUSD} type="currency" className="font-bold" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-main-500">Target Liquidity</div>
            <NumberDisplay value={targetLiquidityUSD} type="currency" className="font-bold" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-main-500">Current Yield</div>
            <NumberDisplay value={apyData.total} type="percent" className="font-bold" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-main-500">Yield at Target</div>
            <NumberDisplay value={apyData.targetRewards.total} type="percent" className="font-bold" />
          </div>
        </div>

        <div className="mt-3 flex w-full">
          <Button className="w-full px-2 py-1 text-sm" elevation={1} onClick={() => setSelectedToken(token)}>
            More details
          </Button>
        </div>
      </div>
    );
  };

  const renderTokenDetailsModal = () => {
    if (!selectedToken) return null;

    const {
      address,
      totalAssets,
      decimals,
      latestAnswerFormatted,
      targetLiquidity,
      underlying,
      isUnderlyingStataToken,
      apyData,
    } = selectedToken;

    const stakedUSD = Number(formatUnits(totalAssets, decimals)) * latestAnswerFormatted;
    const targetLiquidityUSD = Number(formatUnits(targetLiquidity, decimals)) * latestAnswerFormatted;

    const currentUmbrellaData = umbrellaData?.find((data) => data.stakeTokenConfig.stakeToken.address === address);

    return (
      <ModalRoot open={!!selectedToken} onOpenChange={(open) => !open && setSelectedToken(null)}>
        <ModalBody className="w-full max-w-(--mobile-container) md:max-w-[700px]">
          <Block elevation={2} className="relative p-6 sm:px-10 sm:py-8">
            <ModalClose className="absolute top-4 right-4" />
            <ModalTitle className="sr-only">Token Details for {underlying.symbol}</ModalTitle>
            <div className="flex flex-col gap-6">
              <div className="border-main-200 flex items-center gap-3 border-b pb-4">
                <Token
                  token={{
                    address,
                    symbol: underlying.symbol,
                    type: isUnderlyingStataToken ? "stkStata" : "stk",
                  }}
                />
              </div>

              <div className="grid gap-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="text-main-500 text-sm font-medium">Total Staked</div>
                    <NumberDisplay value={stakedUSD} type="currency" className="text-lg font-bold" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="text-main-500 text-sm font-medium">Target Liquidity</div>
                    <NumberDisplay value={targetLiquidityUSD} type="currency" className="text-lg font-bold" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="text-main-500 text-sm font-medium">Aave Yield</div>
                    {apyData.pool.total > 0 ? (
                      <NumberDisplay value={apyData.pool.total} type="percent" className="text-lg font-bold" />
                    ) : (
                      <span className="text-lg font-bold">—</span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="text-main-500 text-sm font-medium">Umbrella Yield</div>
                    <NumberDisplay value={apyData.rewards.total} type="percent" className="text-lg font-bold" />
                  </div>
                </div>

                {currentUmbrellaData && (
                  <>
                    <div className="border-main-200 border-t pt-4">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="flex flex-col">
                          <div className="text-main-500 mb-2 text-sm font-medium">Cooldown Period</div>
                          <div className="text-lg font-bold">
                            {Math.floor(currentUmbrellaData.stakeTokenConfig.cooldown / (24 * 60 * 60))} days
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <div className="text-main-500 mb-2 text-sm font-medium">Unstake Window</div>
                          <div className="text-lg font-bold">
                            {Math.floor(Number(currentUmbrellaData.stakeTokenConfig.unstakeWindow) / (24 * 60 * 60))}{" "}
                            days
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <div className="text-main-500 mb-2 text-sm font-medium">Deficit Offset</div>
                          <NumberDisplay
                            value={
                              Number(formatUnits(currentUmbrellaData.umbrellaConfig.deficitOffset, decimals)) *
                              latestAnswerFormatted
                            }
                            type="currency"
                            className="text-lg font-bold"
                          />
                          <NumberDisplay
                            value={Number(formatUnits(currentUmbrellaData.umbrellaConfig.deficitOffset, decimals))}
                            className="text-main-500 text-sm"
                          />
                        </div>
                        <div className="flex flex-col">
                          <div className="text-main-500 mb-2 text-sm font-medium">Pending Deficit</div>
                          <NumberDisplay
                            value={
                              Number(formatUnits(currentUmbrellaData.umbrellaConfig.pendingDeficit, decimals)) *
                              latestAnswerFormatted
                            }
                            type="currency"
                            className="text-lg font-bold"
                          />
                          <NumberDisplay
                            value={Number(formatUnits(currentUmbrellaData.umbrellaConfig.pendingDeficit, decimals))}
                            className="text-main-500 text-sm"
                          />
                        </div>
                        <div className="flex flex-col">
                          <div className="text-main-500 mb-2 text-sm font-medium">Total Assets</div>
                          <NumberDisplay
                            value={
                              Number(formatUnits(currentUmbrellaData.stakeTokenConfig.totalAssets, decimals)) *
                              latestAnswerFormatted
                            }
                            type="currency"
                            className="text-lg font-bold"
                          />
                          <NumberDisplay
                            value={Number(formatUnits(currentUmbrellaData.stakeTokenConfig.totalAssets, decimals))}
                            className="text-main-500 text-sm"
                          />
                        </div>
                        <div className="flex flex-col">
                          <div className="text-main-500 mb-2 text-sm font-medium">Total Supply</div>
                          <NumberDisplay
                            value={
                              Number(formatUnits(currentUmbrellaData.stakeTokenConfig.totalSupply, decimals)) *
                              latestAnswerFormatted
                            }
                            type="currency"
                            className="text-lg font-bold"
                          />
                          <NumberDisplay
                            value={Number(formatUnits(currentUmbrellaData.stakeTokenConfig.totalSupply, decimals))}
                            className="text-main-500 text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </Block>
        </ModalBody>
      </ModalRoot>
    );
  };

  return (
    <>
      <Block elevation={2} className="px-4 py-3">
        <Mobile>
          <div className="flex flex-col gap-4">
            <button
              onClick={() => setIsMobileExpanded(!isMobileExpanded)}
              className="flex w-full items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <div>TVL:</div>
                <NumberDisplay value={totalStakedUSD} type="currency" className="font-bold" />
              </div>
              <ChevronDown
                className={`text-main-400 size-5 transition-transform duration-200 ${
                  isMobileExpanded ? "rotate-180" : ""
                }`}
              />
            </button>

            {isMobileExpanded && <div className="flex flex-col gap-4 pt-2">{tokensToShow.map(renderTokenDetails)}</div>}
          </div>
        </Mobile>

        <TabletAndDesktop>
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center sm:pb-0">
            <div className="border-main-400 flex w-full shrink-0 items-center gap-1 border-b sm:w-auto sm:border-b-0">
              <div>TVL:</div>
              <NumberDisplay value={totalStakedUSD} type="currency" className="font-bold" />
            </div>

            <div className="flex w-full grow flex-col items-center justify-end sm:flex-row sm:flex-wrap">
              {tokensToShow.map(
                ({
                  address,
                  totalAssets,
                  decimals,
                  latestAnswerFormatted,
                  targetLiquidity,
                  underlying,
                  isUnderlyingStataToken,
                  apyData,
                }) => {
                  const stakedUSD = Number(formatUnits(totalAssets, decimals)) * latestAnswerFormatted;
                  const targetLiquidityUSD = Number(formatUnits(targetLiquidity, decimals)) * latestAnswerFormatted;

                  return (
                    <Tooltip key={address}>
                      <TooltipTrigger asChild>
                        <div className="border-main-100 dark:border-main-600 flex shrink-0 cursor-pointer items-center gap-2 border-l px-4 first:border-l-0 last:pr-0">
                          <AssetIcon
                            type="underlying"
                            symbol={underlying.symbol}
                            assetTag={isUnderlyingStataToken ? "stkStata" : "stk"}
                            className="size-6 shrink-0"
                          />

                          <div className="flex items-center gap-1">
                            <NumberDisplay value={stakedUSD} type="currency" className="text-base font-bold" />
                            <InfoIcon className="text-main-300 ml-0.5 size-4" />
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <div className="border-main-950 dark:bg-main-950 dark:border-main-600 flex min-w-[250px] flex-col gap-1 border bg-white px-4 py-3">
                          <Token
                            token={{
                              address,
                              symbol: underlying.symbol,
                              type: isUnderlyingStataToken ? "stkStata" : "stk",
                            }}
                          />
                          <div className="bg-main-100 dark:bg-main-600 my-2 h-px w-full" />
                          <div className="flex items-center justify-between gap-2">
                            <div className="dark:text-main-500">Total Staked</div>
                            <div className="text-main-900 dark:text-white">
                              <NumberDisplay value={stakedUSD} type="currency" className="font-bold" />
                            </div>
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <div className="dark:text-main-500">Target Liquidity</div>
                            <div className="text-main-900 dark:text-white">
                              <NumberDisplay value={targetLiquidityUSD} type="currency" className="font-bold" />
                            </div>
                          </div>
                          <div className="bg-main-100 dark:bg-main-600 my-2 h-px w-full" />
                          <div className="flex items-center justify-between gap-2">
                            <div className="dark:text-main-500">Current Yield</div>
                            <div className="text-main-900 dark:text-white">
                              <NumberDisplay value={apyData.total} type="percent" className="font-bold" />
                            </div>
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <div className="dark:text-main-500">Yield at Target</div>
                            <div className="text-main-900 dark:text-white">
                              <NumberDisplay value={apyData.targetRewards.total} type="percent" className="font-bold" />
                            </div>
                          </div>
                          <div className="mt-3 flex w-full">
                            <Button
                              className="w-full px-2 py-1 text-sm"
                              elevation={1}
                              onClick={() =>
                                setSelectedToken(stkTokens.find((token) => token.address === address) || null)
                              }
                            >
                              More details
                            </Button>
                          </div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  );
                },
              )}
            </div>
          </div>
        </TabletAndDesktop>
      </Block>
      {renderTokenDetailsModal()}
    </>
  );
});

StakedSummary.displayName = "StakedSummary";
