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
  const [openTooltip, setOpenTooltip] = useState<string | null>(null);
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
      maxTotalAssets,
      underlying,
      isUnderlyingStataToken,
      apyData,
    } = token;

    const stakedUSD = Number(formatUnits(totalAssets, decimals)) * latestAnswerFormatted;
    const targetLiquidityUSD = Number(formatUnits(targetLiquidity, decimals)) * latestAnswerFormatted;
    const maxTotalAssetsUSD = Number(formatUnits(maxTotalAssets, decimals)) * latestAnswerFormatted;

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
            <div className="text-main-500">Supply Cap</div>
            <NumberDisplay value={maxTotalAssetsUSD} type="currency" className="font-bold" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-main-500">Current Yield</div>
            <NumberDisplay value={apyData.total} type="percent" className="font-bold" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-main-500">Yield at Target</div>
            <NumberDisplay value={apyData.targetTotal} type="percent" className="font-bold" />
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
      maxTotalAssets,
    } = selectedToken;

    const rewardColors = ["bg-green-300", "bg-orange-300", "bg-red-300", "bg-pink-300", "bg-yellow-300"];

    const stakedUSD = Number(formatUnits(totalAssets, decimals)) * latestAnswerFormatted;
    const targetLiquidityUSD = Number(formatUnits(targetLiquidity, decimals)) * latestAnswerFormatted;

    const currentUmbrellaData = umbrellaData?.find((data) => data.stakeTokenConfig.stakeToken.address === address);
    const maxTotalAssetsUSD = Number(formatUnits(maxTotalAssets, decimals)) * latestAnswerFormatted;

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

              <div className="grid grid-cols-2 gap-10">
                <div className="border-main-200 flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <div className="text-main-500 text-sm font-medium">Total Staked</div>
                    <NumberDisplay value={stakedUSD} type="currency" className="text-lg font-bold" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="text-main-500 text-sm font-medium">Supply Cap</div>
                    <NumberDisplay value={maxTotalAssetsUSD} type="currency" className="text-lg font-bold" />
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <div className="text-main-500 text-sm font-medium">Yield</div>
                      <NumberDisplay value={apyData.total} type="percent" className="text-lg font-bold" />
                    </div>

                    <TabletAndDesktop>
                      <div className="flex flex-col gap-3">
                        <div className="bg-main-100 dark:bg-main-700 flex h-2 w-full overflow-hidden">
                          {apyData.pool.total > 0 && (
                            <div
                              className="bg-[#959aff]"
                              style={{ width: `${(apyData.pool.total / apyData.total) * 100}%` }}
                            />
                          )}

                          {apyData.rewards.components.map((component, index) => (
                            <div
                              key={`${component.reward.address}-${index}`}
                              className={rewardColors[index % rewardColors.length]}
                              style={{ width: `${(component.apy / apyData.total) * 100}%` }}
                            />
                          ))}
                        </div>

                        <div className="flex flex-col gap-2 text-sm">
                          {apyData.pool.total > 0 && (
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="size-2 bg-[#959aff]"></div>
                                <span className="text-main-500 text-sm">Aave Supply Yield</span>
                              </div>
                              <NumberDisplay
                                value={apyData.pool.total}
                                type="percent"
                                className="text-main-500 text-sm"
                              />
                            </div>
                          )}

                          {apyData.rewards.components.map((component, index) => (
                            <div
                              key={`${component.reward.address}-${index}`}
                              className="flex items-center justify-between"
                            >
                              <div className="flex items-center gap-2">
                                <div className={`size-2 ${rewardColors[index % rewardColors.length]}`}></div>
                                <span className="text-main-500 text-sm">
                                  Umbrella rewards in {component.reward.symbol}
                                </span>
                              </div>
                              <NumberDisplay value={component.apy} type="percent" className="text-main-500 text-sm" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabletAndDesktop>
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <div className="text-main-500 text-sm font-medium">Target Liquidity</div>
                    <NumberDisplay value={targetLiquidityUSD} type="currency" className="text-lg font-bold" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="text-main-500 text-sm font-medium">Yield at Target</div>
                    <NumberDisplay value={apyData.targetTotal} type="percent" className="text-lg font-bold" />
                  </div>
                </div>
              </div>

              {currentUmbrellaData && (
                <div className="border-main-200 border-t pt-6">
                  <div className="grid grid-cols-2 gap-x-10 gap-y-6">
                    <div className="flex flex-col">
                      <div className="text-main-500 mb-2 text-sm font-medium">Cooldown Period</div>
                      <div className="text-lg font-bold">
                        {Math.floor(currentUmbrellaData.stakeTokenConfig.cooldown / (24 * 60 * 60))} days
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="text-main-500 mb-2 text-sm font-medium">Unstake Window</div>
                      <div className="text-lg font-bold">
                        {Math.floor(Number(currentUmbrellaData.stakeTokenConfig.unstakeWindow) / (24 * 60 * 60))} days
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
                      <div className="text-main-500 flex items-center gap-1 text-sm">
                        <NumberDisplay
                          value={Number(formatUnits(currentUmbrellaData.umbrellaConfig.deficitOffset, decimals))}
                        />
                        <AssetIcon
                          type="underlying"
                          symbol={underlying.symbol}
                          assetTag={isUnderlyingStataToken ? "stata" : undefined}
                          className="size-5"
                        />
                      </div>
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
                      <div className="text-main-500 flex items-center gap-1 text-sm">
                        <NumberDisplay
                          value={Number(formatUnits(currentUmbrellaData.umbrellaConfig.pendingDeficit, decimals))}
                        />
                        <AssetIcon
                          type="underlying"
                          symbol={underlying.symbol}
                          assetTag={isUnderlyingStataToken ? "stata" : undefined}
                          className="size-5"
                        />
                      </div>
                    </div>
                    <div className="col-span-2 flex flex-col">
                      <div className="text-main-500 mb-2 text-sm font-medium">Exchange Rate</div>
                      <div className="flex items-center gap-2">
                        <NumberDisplay
                          value={
                            Number(formatUnits(currentUmbrellaData.stakeTokenConfig.totalAssets, decimals)) /
                            Number(formatUnits(currentUmbrellaData.stakeTokenConfig.totalSupply, decimals))
                          }
                          className="text-lg font-bold"
                        />
                        <div className="text-main-500 flex items-center gap-1 text-sm">
                          <AssetIcon
                            type="underlying"
                            symbol={underlying.symbol}
                            assetTag={isUnderlyingStataToken ? "stata" : undefined}
                            className="size-5"
                          />
                          <span>per</span>
                          <AssetIcon
                            type="underlying"
                            symbol={underlying.symbol}
                            assetTag={isUnderlyingStataToken ? "stkStata" : "stk"}
                            className="size-5"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
                  maxTotalAssets,
                  underlying,
                  isUnderlyingStataToken,
                  apyData,
                }) => {
                  const stakedUSD = Number(formatUnits(totalAssets, decimals)) * latestAnswerFormatted;
                  const targetLiquidityUSD = Number(formatUnits(targetLiquidity, decimals)) * latestAnswerFormatted;
                  const maxTotalAssetsUSD = Number(formatUnits(maxTotalAssets, decimals)) * latestAnswerFormatted;

                  return (
                    <Tooltip
                      key={address}
                      open={openTooltip === address}
                      onOpenChange={(open) => setOpenTooltip(open ? address : null)}
                    >
                      <TooltipTrigger asChild>
                        <div
                          className="border-main-100 dark:border-main-600 flex shrink-0 cursor-pointer items-center gap-2 border-l px-4 first:border-l-0 last:pr-0"
                          onClick={() => setOpenTooltip(openTooltip === address ? null : address)}
                        >
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
                          <div className="flex items-center justify-between gap-2">
                            <div className="dark:text-main-500">Supply Cap</div>
                            <div className="text-main-900 dark:text-white">
                              <NumberDisplay value={maxTotalAssetsUSD} type="currency" className="font-bold" />
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
                              <NumberDisplay value={apyData.targetTotal} type="percent" className="font-bold" />
                            </div>
                          </div>
                          <div className="mt-3 flex w-full">
                            <Button
                              className="w-full px-2 py-1 text-sm"
                              elevation={1}
                              onClick={() => {
                                setSelectedToken(stkTokens.find((token) => token.address === address) || null);
                                setOpenTooltip(null);
                              }}
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
