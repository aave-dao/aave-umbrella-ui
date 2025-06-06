import { defineChain } from "viem";

export const mainnetFork = defineChain({
  id: Number(process.env.NEXT_PUBLIC_TENDERLY_VNET_ID ?? 73571),
  name: "Virtual Mainnet",
  nativeCurrency: { name: "VETH", symbol: "VETH", decimals: 18 },
  rpcUrls: {
    default: { http: [process.env.NEXT_PUBLIC_TENDERLY_VNET_RPC!] },
  },
});
