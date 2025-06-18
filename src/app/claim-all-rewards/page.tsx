"use client";

import { NumberDisplay } from "@/components/NumberDisplay/NumberDisplay";
import { PageContainer } from "@/components/PageContainer/PageContainer";
import { PageLoader } from "@/components/PageLoader/PageLoader";
import { TransactionCard } from "@/components/Transaction/TransactionCard";
import { Button } from "@/components/ui/Button";
import { UmbrellaRewardsBreakdown } from "@/components/UmbrellaRewardsBreakdown/UmbrellaRewardsBreakdown";
import { useAllStkTokens } from "@/hooks/useAllStkTokens";
import { useClaimSelectedRewards } from "@/hooks/useClaimSelectedRewards/useClaimSelectedRewards";
import { useSafeClaimSelectedRewards } from "@/hooks/useClaimSelectedRewards/useSafeClaimSelectedRewards";
import { useIsSafeWallet } from "@/hooks/useIsSafeWallet/useIsSafeWallet";
import { useWalletAddress } from "@/providers/WalletProvider/WalletContext";
import { sumUpAllRewards } from "@/utils/calculations";
import { withPositiveBalance } from "@/utils/data";

export default function ClaimRewardsPage() {
  const receiver = useWalletAddress();
  const isSafeWallet = useIsSafeWallet();

  const { data: stkTokens, isLoading: isStkTokensLoading } = useAllStkTokens();
  const stkTokenWithRewards = stkTokens?.filter((umbrella) => umbrella.rewards.length);
  const total = sumUpAllRewards(stkTokenWithRewards);

  const [safeClaim, { data: safeHash, isPending: isSafeClaiming, error: safeClaimError }] =
    useSafeClaimSelectedRewards();
  const [claim, { data: hash, isPending: isClaiming, error: claimError }] = useClaimSelectedRewards();

  if (isStkTokensLoading) {
    return <PageLoader />;
  }

  if (!stkTokenWithRewards) {
    return null;
  }

  const handleClaim = async () => {
    const assets = stkTokenWithRewards.map(({ address }) => address);
    const rewards = stkTokenWithRewards.map(({ rewards }) =>
      rewards.filter(withPositiveBalance).map(({ address }) => address),
    );

    if (isSafeWallet) {
      safeClaim({
        assets,
        rewards,
        receiver,
        description: "Select All Rewards",
      });
    } else {
      claim({
        assets,
        rewards,
        receiver,
        description: "Select All Rewards",
      });
    }
  };

  return (
    <PageContainer>
      <TransactionCard
        title="All accrued rewards"
        hash={hash}
        safeHash={safeHash}
        loading={isClaiming || isSafeClaiming}
        error={claimError || safeClaimError}
      >
        <div className="flex w-full flex-col">
          {stkTokenWithRewards
            ?.filter((umbrella) => umbrella.rewards.some((reward) => reward?.usdAmount))
            .map((umbrella) => <UmbrellaRewardsBreakdown key={umbrella.address} umbrella={umbrella} />)}
        </div>

        <div className="flex items-center justify-end">
          <div className="flex items-center gap-2.5">
            <div className="text-lg font-bold">Total:</div>
            <NumberDisplay value={total} type="currency" className="text-2xl font-semibold" />
          </div>
        </div>

        <div className="flex w-full self-center md:w-[248px]">
          <Button
            primary
            elevation={1}
            onClick={handleClaim}
            loading={isClaiming}
            disabled={isClaiming}
            className="flex items-center gap-2"
          >
            Claim All
          </Button>
        </div>
      </TransactionCard>
    </PageContainer>
  );
}
