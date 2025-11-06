import { Asset } from "@/types/token";
import { StkToken } from "@/types/token";

export const calculateAvailableToStakeUsd = (assets: Asset[]) => {
  return assets.reduce((acc, asset) => {
    if (asset.usdAmount) {
      return acc + asset.usdAmount;
    }

    return acc;
  }, 0);
};

export const calculateMaxStakeAmount = (stkToken: StkToken, userBalance: bigint) => {
  const { totalAssets, maxTotalAssets } = stkToken;

  const availableUmbrellaSupply = maxTotalAssets > totalAssets ? maxTotalAssets - totalAssets : 0n;
  const result = availableUmbrellaSupply >= userBalance ? userBalance : availableUmbrellaSupply;

  return result;
};
