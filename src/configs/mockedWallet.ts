import { Wallet, WalletDetailsParams } from "@rainbow-me/rainbowkit";
import { CreateConnectorFn } from "@wagmi/core";
import { Address } from "viem";
import { mock } from "wagmi/connectors";

const createMockConnector = (walletDetails: WalletDetailsParams): CreateConnectorFn => {
  const walletAddress = process.env.NEXT_PUBLIC_E2E_WALLET_ADDRESS as Address;

  if (!walletAddress) {
    throw new Error("NEXT_PUBLIC_E2E_WALLET_ADDRESS environment variable is not set");
  }

  const mockConnector: CreateConnectorFn = (config) => {
    return {
      ...mock({
        accounts: [walletAddress],
      })(config),
      rkDetails: walletDetails.rkDetails,
    };
  };

  return mockConnector;
};

export const mockWallet = (): Wallet => {
  return {
    id: "mock",
    name: "Mock Wallet",
    shortName: "Mock",
    installed: true,
    iconBackground: "rgba(0, 255, 0, 0.5)",
    iconUrl: "images/wallet.svg",
    downloadUrls: {},
    createConnector: createMockConnector,
  };
};
