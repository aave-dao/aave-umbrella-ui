import { config } from "@/configs/wagmi";
import { useUmbrellaCooldownData } from "@/hooks/useAllUmbrellaCooldowns/useUmbrellaCooldownData";
import { useUmbrellaCooldownStatus } from "@/hooks/useAllUmbrellaCooldowns/useUmbrellaCooldownStatus";
import { useStartCooldown } from "@/hooks/useStartCooldown";
import { useQueryClient } from "@tanstack/react-query";
import { waitForTransactionReceipt } from "@wagmi/core";

import { Mobile, TabletAndDesktop } from "@/components/MediaQueries/MediaQueries";
import { Button } from "@/components/ui/Button";
import { useCurrentMarket } from "@/hooks/useCurrentMarket";
import { useIsSafeWallet } from "@/hooks/useIsSafeWallet/useIsSafeWallet";
import { useSafeStartCooldown } from "@/hooks/useSafeStartCooldown";
import { useTrackTransaction } from "@/providers/TransactionsTrackerProvider/TransactionsTrackerProvider";
import { StkToken } from "@/types/token";
import { ChevronsDownIcon, TimerResetIcon } from "lucide-react";

export type ActionsProps = {
  token: StkToken;
};

export const Actions = ({ token }: ActionsProps) => {
  const client = useQueryClient();
  const isSafeWallet = useIsSafeWallet();
  const { chainId } = useCurrentMarket();

  const trackTransaction = useTrackTransaction();

  const { address, balance: stakedAmount } = token;

  const [safeStartCooldown] = useSafeStartCooldown();
  const [startCooldown, { isPending: isStartCooldownPending }] = useStartCooldown();
  const { status } = useUmbrellaCooldownStatus(address);
  const { data: cooldownData } = useUmbrellaCooldownData(address);

  const shouldShowInitiateCooldown = () => {
    if (status === "none") {
      return true;
    }

    if (status === "cooldown" || status === "withdraw") {
      if (!stakedAmount || !cooldownData?.amount) {
        return false;
      }
      return stakedAmount > cooldownData.amount;
    }

    return false;
  };

  const handleCooldownClick = async () => {
    if (isSafeWallet) {
      const hash = (await safeStartCooldown({
        assetAddress: address,
      })) as `0x${string}`;

      if (hash) {
        trackTransaction({ chainId, hash, description: `Start cooldown` });
        const { status } = await waitForTransactionReceipt(config, { hash });

        if (status === "success") {
          client.invalidateQueries({ queryKey: ["cooldowns"] });
        }
      }
    } else {
      const hash = await startCooldown({ assetAddress: address });
      trackTransaction({ chainId, hash, description: `Start cooldown` });
      const { status } = await waitForTransactionReceipt(config, { hash });

      if (status === "success") {
        client.invalidateQueries({ queryKey: ["cooldowns"] });
      }
    }
  };

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-center md:gap-4">
      {(status === "withdraw" || status === "immediate-withdraw") && (
        <Button href={`/withdraw/${address}`} prefetch primary elevation={1} size="lg" className="gap-1 font-semibold">
          <ChevronsDownIcon size={16} />
          Withdraw
        </Button>
      )}
      {shouldShowInitiateCooldown() && (
        <>
          <Mobile>
            <Button
              elevation={1}
              size="lg"
              loading={isStartCooldownPending}
              disabled={isStartCooldownPending}
              onClick={handleCooldownClick}
              className="gap-1 font-semibold"
              title="Initiate cooldown"
            >
              <TimerResetIcon size={16} />
              Cooldown
            </Button>
          </Mobile>

          <TabletAndDesktop>
            <Button
              elevation={1}
              size="lg"
              loading={isStartCooldownPending}
              disabled={isStartCooldownPending}
              onClick={handleCooldownClick}
              className="gap-2 font-semibold"
              title="Initiate cooldown"
            >
              <TimerResetIcon size={16} />
              {status !== "withdraw" && "Cooldown"}
            </Button>
          </TabletAndDesktop>
        </>
      )}
    </div>
  );
};
