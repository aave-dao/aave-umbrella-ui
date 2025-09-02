import { SummaryChart } from "@/app/components/Summary/SummaryChart";
import { NumberDisplay } from "@/components/NumberDisplay/NumberDisplay";
import { Button } from "@/components/ui/Button";
import { Asset, StkToken } from "@/types/token";
import { calculateAvailableToStakeUsd, calculateMetrics, calculateSimpleInterest } from "@/utils/calculations";
import { CoinsIcon } from "lucide-react";
import Image from "next/image";
import { useAccount } from "wagmi";
import { AccountingDetailsModal } from "./AccountingDetailsModal";

export type SummaryProps = {
  umbrellaTokens?: StkToken[];
  assets: Asset[];
};

export const Summary = ({ umbrellaTokens, assets }: SummaryProps) => {
  const { address } = useAccount();

  if (!address || !umbrellaTokens || !assets) {
    return null;
  }

  const { totalApy, totalStakedUsd, totalClaimableYield } = calculateMetrics(umbrellaTokens);
  const availableToStakeUsd = calculateAvailableToStakeUsd(assets);
  const monthlyYield = calculateSimpleInterest(totalStakedUsd, totalApy, 1) - totalStakedUsd;
  const yearlyYield = calculateSimpleInterest(totalStakedUsd, totalApy, 12) - totalStakedUsd;

  return (
    <div className="flex flex-col md:h-[168px] md:flex-row">
      <div className="bg-main-950 flex grow items-center justify-between px-6 py-6 md:justify-start md:gap-4 md:px-4 lg:px-10 dark:bg-[#17171a]">
        <SummaryChart totalStaked={totalStakedUsd} availableToStake={availableToStakeUsd} />

        <div className="relative flex flex-col justify-between gap-4 md:grow-1 md:flex-row md:items-start md:gap-0">
          <div className="flex flex-col gap-2 md:mr-auto">
            <h2 className="text-secondary-500">Total Staked</h2>
            <div className="flex items-end gap-1">
              <NumberDisplay
                value={totalStakedUsd}
                type="currency"
                className="text-2xl font-semibold text-white md:text-4xl"
              />
              <span className="mb-1 text-base font-bold text-[#E2E7F2] md:mb-2">/</span>
              <NumberDisplay
                value={availableToStakeUsd + totalStakedUsd}
                type="currency"
                className="mb-1 text-xs font-semibold text-[#E2E7F2] md:mb-2 md:text-base"
              />
            </div>
            <AccountingDetailsModal umbrellaTokens={umbrellaTokens} assets={assets} />
          </div>

          <div className="flex flex-col gap-1.5 md:gap-2">
            <div className="text-secondary-500 flex items-center gap-2 text-xl">
              <h2 className="text-secondary-500">You are earning</h2>
              <NumberDisplay
                value={totalApy}
                type="percent"
                className="tracking-none -mt-px text-base font-semibold md:text-lg"
              />
            </div>
            <div className="flex flex-col md:flex-row md:gap-7">
              <div className="flex flex-row items-center not-md:gap-1.5 md:flex-col md:items-start">
                <div className="text-xs text-[#BCBBBB] md:text-base">Monthly</div>
                <div className="flex items-center">
                  <span className="text-lg font-semibold text-white md:text-2xl">~</span>
                  <NumberDisplay
                    value={monthlyYield}
                    type="currency"
                    className="text-lg font-semibold text-white md:text-2xl"
                  />
                </div>
              </div>

              <div className="-mt-1 flex flex-row items-center not-md:gap-1.5 md:mt-0 md:flex-col md:items-start">
                <div className="text-xs text-[#BCBBBB] md:text-base">Yearly</div>
                <div className="flex items-center">
                  <span className="text-lg font-semibold text-white md:text-2xl">~</span>
                  <NumberDisplay
                    value={yearlyYield}
                    type="currency"
                    className="text-lg font-semibold text-white md:text-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-main-950 relative flex justify-between bg-[#F4B00D] px-6 py-5 not-md:items-center md:w-[234px] md:flex-col md:justify-center md:px-4 md:py-0 lg:px-7">
        <Image
          src="/images/summary-bg.svg"
          width={100}
          height={100}
          alt="Token"
          priority
          className="absolute top-0 right-0 not-md:size-[84px]"
        />
        <div className="flex flex-col">
          <div className="text-base leading-none md:font-semibold">
            Claimable <br className="not-md:hidden" /> Rewards
          </div>
          <NumberDisplay
            value={totalClaimableYield}
            type="currency"
            className="-mb-1 text-2xl font-semibold md:mt-2 md:mb-3 md:text-[30px]"
          />
        </div>
        <div className="not-md:flex not-md:items-center">
          {totalClaimableYield > 0 && (
            <Button elevation={1} href="/claim-all-rewards" primary className="gap-2 font-semibold">
              <CoinsIcon size={16} />
              Claim all
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
