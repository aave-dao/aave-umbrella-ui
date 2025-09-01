import { parseUnits } from "viem";
import { StkToken } from "@/types/token";

export const calculateMaxSupply = (stkToken: StkToken, totalSupplied?: bigint) => {
  const { reserve, underlying, totalAssets, maxTotalAssets } = stkToken;
  const { balance = 0n } = underlying;

  if (totalAssets >= maxTotalAssets) {
    return 0n;
  }

  if (!reserve) {
    return balance;
  }

  const { decimals, supplyCap, accruedToTreasury } = reserve;

  if (supplyCap === 0n || !totalSupplied) {
    return balance;
  }

  const scaledSupplyCap = parseUnits(String(supplyCap), decimals);
  const totalSupplyWithAccrued = totalSupplied + accruedToTreasury;
  const availableSupply = scaledSupplyCap > totalSupplyWithAccrued ? scaledSupplyCap - totalSupplyWithAccrued : 0n;

  const availableUmbrellaSupply = maxTotalAssets - totalAssets;

  const maxAvailableSupply = availableSupply >= balance ? balance : availableSupply;
  const maxAvailableUmbrellaSupply = availableUmbrellaSupply >= balance ? balance : availableUmbrellaSupply;

  const result = maxAvailableSupply < maxAvailableUmbrellaSupply ? maxAvailableSupply : maxAvailableUmbrellaSupply;

  return result;
};

export const calculateMaxUnderlyingStake = (stkToken: StkToken, totalSupplied?: bigint) => {
  const { reserve, underlying, totalAssets, maxTotalAssets } = stkToken;
  const { balance = 0n } = underlying;

  if (!reserve) {
    return balance;
  }

  const { decimals, supplyCap, accruedToTreasury } = reserve;

  let availableAaveSupply = balance;
  if (supplyCap > 0n && totalSupplied) {
    const scaledSupplyCap = parseUnits(String(supplyCap), decimals);
    const totalSupplyWithAccrued = totalSupplied + accruedToTreasury;
    const aaveAvailable = scaledSupplyCap > totalSupplyWithAccrued ? scaledSupplyCap - totalSupplyWithAccrued : 0n;
    availableAaveSupply = aaveAvailable >= balance ? balance : aaveAvailable;
  }

  let availableUmbrellaSupply = balance;
  if (totalAssets < maxTotalAssets) {
    const umbrellaAvailable = maxTotalAssets - totalAssets;
    availableUmbrellaSupply = umbrellaAvailable >= balance ? balance : umbrellaAvailable;
  } else {
    availableUmbrellaSupply = 0n;
  }

  const result = availableAaveSupply < availableUmbrellaSupply ? availableAaveSupply : availableUmbrellaSupply;
  return result;
};
