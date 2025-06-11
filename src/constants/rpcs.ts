import { mainnetFork } from "@/configs/mainnetFork";
import { ChainId } from "@/types/market";
import { baseSepolia, mainnet } from "wagmi/chains";

export const RPCS: Record<ChainId, string | undefined> = {
  [mainnet.id]: process.env.NEXT_PUBLIC_MAINNET,

  // testnets
  [baseSepolia.id]: process.env.NEXT_PUBLIC_BASE_SEPOLIA || undefined,

  // forked mainnet in Tenderly
  [mainnetFork.id]: process.env.NEXT_PUBLIC_TENDERLY_VNET_RPC!,
} as const;
