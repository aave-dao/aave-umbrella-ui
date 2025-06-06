import { ChainId } from "@/types/market";
import { baseSepolia, mainnet } from "wagmi/chains";

export const DEFAULT_RPCS: Record<ChainId, string | undefined> = {
  [mainnet.id]: "https://rpc.ankr.com/eth",

  // testnets
  [baseSepolia.id]: "https://sepolia.base.org",
} as const;
