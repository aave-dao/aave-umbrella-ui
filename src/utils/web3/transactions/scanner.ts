import { appChains } from "@/configs/wagmi";
import { Address } from "viem";

export const getScannerUrl = (chainId: number, address: Address) => {
  const chainConfig = appChains.find((chain) => chain.id === chainId);
  return `${chainConfig?.blockExplorers?.default.url}/address/${address}`;
};
