import { useUmbrellaCooldownData } from "@/hooks/useAllUmbrellaCooldowns/useUmbrellaCooldownData";
import { useUmbrellaData } from "@/hooks/useUmbrellaData";
import { Address } from "viem";
import { useEffect, useState } from "react";
import { CooldownStatus } from "@/types/cooldown";
import { useDashboardStore } from "@/store/dashboard";

export const calculateStatus = (
  currentTime: number,
  cooldownEndsAt?: number,
  withdrawalEndsAt?: number,
): CooldownStatus => {
  if (cooldownEndsAt && withdrawalEndsAt) {
    if (currentTime < cooldownEndsAt) {
      return "cooldown";
    } else if (currentTime >= cooldownEndsAt && currentTime < withdrawalEndsAt) {
      return "withdraw";
    }
  }
  return "none";
};

export const useUmbrellaCooldownStatus = (address: Address) => {
  const [now, setNow] = useState(Math.floor(Date.now() / 1000));

  const setCooldownStatus = useDashboardStore.use.setCooldownStatus();

  const { data } = useUmbrellaCooldownData(address);
  const { data: umbrellaData } = useUmbrellaData();
  const { endOfCooldown, withdrawalEndsAt } = data || {};

  const configuredCooldownPeriod = umbrellaData?.find((item) => item.stakeTokenConfig.stakeToken.address === address)
    ?.stakeTokenConfig.cooldown;

  const status =
    configuredCooldownPeriod === 0 ? "immediate-withdraw" : calculateStatus(now, endOfCooldown, withdrawalEndsAt);

  useEffect(() => {
    const updateStatus = () => {
      setNow(Math.floor(Date.now() / 1000));
    };

    updateStatus();
    const timer = setInterval(updateStatus, 1000);
    return () => clearInterval(timer);
  }, [data]);

  useEffect(() => {
    setCooldownStatus({ assetAddress: address, status });
  }, [setCooldownStatus, address, status]);

  return { now, status };
};
