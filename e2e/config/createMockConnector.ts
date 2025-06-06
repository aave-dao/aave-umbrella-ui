import { defaultAnvilAccount } from "@e2e/config/e2e.constants";
import { WalletDetailsParams } from "@rainbow-me/rainbowkit";
import { CreateConnectorFn, mock } from "wagmi";

export function createMockConnector(walletDetails: WalletDetailsParams): CreateConnectorFn {
  const mockConnector: CreateConnectorFn = (config) => {
    return {
      ...mock({
        accounts: [defaultAnvilAccount],
      })(config),
      rkDetails: walletDetails.rkDetails,
    };
  };

  return mockConnector;
}
