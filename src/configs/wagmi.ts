import { RPCS } from "@/constants/rpcs";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { coinbaseWallet, metaMaskWallet, rainbowWallet, walletConnectWallet } from "@rainbow-me/rainbowkit/wallets";
import { http } from "wagmi";
import { baseSepolia, mainnet } from "wagmi/chains";
import { mainnetFork } from "./mainnetFork";
import { mockWallet } from "./mockedWallet";

export const appChains = [
  mainnet,

  // testnetss
  baseSepolia,

  // forked mainnet in Tenderly
  ...(process.env.NEXT_PUBLIC_TENDERLY_VNETS_ENABLED === "true" ? [mainnetFork] : []),
];

export const config = getDefaultConfig({
  appName: "Umbrella UI",
  projectId: "YOUR_PROJECT_ID",
  chains: [mainnet, ...appChains.slice(1)],
  transports: {
    [mainnet.id]: http(RPCS[mainnet.id]),
    [baseSepolia.id]: http(RPCS[baseSepolia.id]),

    ...(process.env.NEXT_PUBLIC_TENDERLY_VNETS_ENABLED === "true"
      ? {
          [mainnetFork.id]: http(RPCS[mainnetFork.id]),
        }
      : {}),
  },
  wallets: [
    {
      groupName: "Popular",
      wallets: [metaMaskWallet, rainbowWallet, coinbaseWallet, walletConnectWallet],
    },
    ...(process.env.NEXT_PUBLIC_E2E_TEST_ENABLED === "true" ? [{ groupName: "Test", wallets: [mockWallet] }] : []),
  ],
  ssr: false,
});
