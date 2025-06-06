import { createMockConnector } from "@e2e/config/createMockConnector";
import type { Wallet } from "@rainbow-me/rainbowkit";

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
