import { DEFAULT_RPCS } from "@/constants/defaultRPCs";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { metaMaskWallet, rainbowWallet, coinbaseWallet, walletConnectWallet } from "@rainbow-me/rainbowkit/wallets";
import { http } from "wagmi";
import { baseSepolia, mainnet } from "wagmi/chains";
import { forkedMainnet } from "./tenderly.config";
import { mockWallet } from "@e2e/config/mockWallet";
import { baseSepoliaE2eForkUrl, baseSepoliaUsingFork, isE2eTestEnabled } from "@e2e/config/e2e.constants";

export const appChains = [
  mainnet,

  // testnets
  isE2eTestEnabled ? baseSepoliaUsingFork : baseSepolia,
  baseSepolia,
  ...(process.env.NEXT_PUBLIC_TENDERLY_VNETS_ENABLED === "true" ? [forkedMainnet] : []),
];

export const config = getDefaultConfig({
  appName: "Umbrella UI",
  projectId: "YOUR_PROJECT_ID",
  chains: [mainnet, ...appChains.slice(1)],
  transports: {
    [mainnet.id]: http(process.env.NEXT_PUBLIC_MAINNET || DEFAULT_RPCS[mainnet.id]),
    [baseSepolia.id]: isE2eTestEnabled
      ? http(baseSepoliaE2eForkUrl)
      : http(process.env.NEXT_PUBLIC_BASE_SEPOLIA || DEFAULT_RPCS[baseSepolia.id]),
    ...(process.env.NEXT_PUBLIC_TENDERLY_VNETS_ENABLED === "true"
      ? {
          [forkedMainnet.id]: http(process.env.NEXT_PUBLIC_TENDERLY_VNET_RPC!),
        }
      : {}),
  },
  wallets: [
    {
      groupName: "Popular",
      wallets: [metaMaskWallet, rainbowWallet, coinbaseWallet, walletConnectWallet],
    },
    {
      groupName: "Test",
      wallets: [mockWallet],
    },
  ],
  ssr: isE2eTestEnabled,
});
