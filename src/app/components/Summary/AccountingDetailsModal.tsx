import { ModalBody, ModalClose, ModalRoot, ModalTitle, ModalTrigger } from "@/components/Modal/Modal";
import { Asset, StkToken } from "@/types/token";
import { Block } from "@/components/ui/Block";
import { useAccount } from "wagmi";
import { Download } from "lucide-react";

export type AccountingDetailsModalProps = {
  umbrellaTokens?: StkToken[];
  assets: Asset[];
};

export const AccountingDetailsModal = ({ umbrellaTokens, assets }: AccountingDetailsModalProps) => {
  const { address } = useAccount();

  if (!address || !umbrellaTokens || !assets) {
    return null;
  }

  const filteredUmbrellaTokens = umbrellaTokens.filter((token) => token.balanceFormatted && token.balanceFormatted > 0);

  const exportStakeCSV = () => {
    const headers = ["Asset", "Balance", "USD Value", "Supply Yield", "Rewards Yield", "Accrued Rewards Value"];
    const csvContent = [
      headers.join(","),
      ...filteredUmbrellaTokens.map((token) =>
        [
          token.symbol,
          token.balanceFormatted || 0,
          token.usdAmount || 0,
          token.apyData.pool.total || 0,
          token.apyData.rewards.total || 0,
          token.totalRewardsUSDAmount || 0,
        ].join(","),
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "stake.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportRewardsCSV = () => {
    const headers = ["Reward Token", "Source Asset", "Accrued Balance", "USD Value"];
    const rewardsData = filteredUmbrellaTokens
      .flatMap((token) =>
        token.rewards.map((reward) => ({
          ...reward,
          sourceToken: token,
        })),
      )
      .filter((reward) => (reward.balanceFormatted || 0) > 0);

    const csvContent = [
      headers.join(","),
      ...rewardsData.map((reward) =>
        [reward.symbol, reward.sourceToken.symbol, reward.balanceFormatted || 0, reward.usdAmount || 0].join(","),
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "rewards.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <ModalRoot>
      <ModalTrigger asChild>
        <button className="cursor-pointer text-left text-sm text-white/60 underline hover:text-white">
          Accounting details
        </button>
      </ModalTrigger>
      <ModalBody className="w-full max-w-4xl">
        <Block className="p-0" elevation={3}>
          <div className="bg-main-100 dark:bg-main-950">
            <div className="bg-main-950 border-main-800 flex items-center justify-between border-b p-6 text-white">
              <ModalTitle className="text-lg font-semibold text-white">Accounting details</ModalTitle>
              <div className="flex items-center gap-3">
                <button
                  onClick={exportStakeCSV}
                  className="bg-main-800 hover:bg-main-700 flex items-center gap-2 px-3 py-2 text-sm text-white transition-colors"
                  title="Export stake data to CSV"
                >
                  <Download className="h-4 w-4" />
                  Stake CSV
                </button>
                <button
                  onClick={exportRewardsCSV}
                  className="bg-main-800 hover:bg-main-700 flex items-center gap-2 px-3 py-2 text-sm text-white transition-colors"
                  title="Export rewards data to CSV"
                >
                  <Download className="h-4 w-4" />
                  Rewards CSV
                </button>
                <ModalClose className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100" />
              </div>
            </div>

            <div className="dark:bg-main-900 border-main-800 dark:border-main-800 border-b bg-white">
              <table className="w-full">
                <thead className="text-sm">
                  <tr className="border-main-800 dark:border-main-800 border-b">
                    <th className="text-main-900 p-3 pl-6 text-left dark:text-white">Asset</th>
                    <th className="text-main-900 p-3 dark:text-white">Balance</th>
                    <th className="text-main-900 p-3 dark:text-white">USD Value</th>
                    <th className="text-main-900 p-3 dark:text-white">Supply Yield</th>
                    <th className="text-main-900 p-3 dark:text-white">Rewards Yield</th>
                    <th className="text-main-900 p-3 dark:text-white">Accrued Rewards Value</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {filteredUmbrellaTokens.map((token) => (
                    <tr key={token.address} className="border-main-200 dark:border-main-800 border-b last:border-b-0">
                      <td className="p-3 pl-6">
                        <div className="flex items-center gap-3">
                          <div>
                            <div className="text-main-900 font-mono dark:text-white">{token.symbol}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 text-center">
                        <span className="text-main-900 font-mono select-all dark:text-white">
                          {Number(token.balanceFormatted || 0).toLocaleString("en-US", {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 6,
                          })}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <span className="text-main-900 font-mono select-all dark:text-white">
                          $
                          {Number(token.usdAmount || 0).toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <span className="text-main-900 font-mono select-all dark:text-white">
                          {Number(token.apyData.pool.total || 0).toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 4,
                          })}
                          %
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <span className="text-main-900 font-mono select-all dark:text-white">
                          {Number(token.apyData.rewards.total || 0).toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 4,
                          })}
                          %
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <span className="text-main-900 font-mono select-all dark:text-white">
                          $
                          {Number(token.totalRewardsUSDAmount || 0).toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="border-main-800 dark:border-main-800 dark:bg-main-900 mt-4 border-t bg-white">
              <div>
                <table className="w-full">
                  <thead className="text-sm">
                    <tr className="border-main-800 dark:border-main-800 border-b">
                      <th className="text-main-900 p-3 pl-6 text-left dark:text-white">Reward Token</th>
                      <th className="text-main-900 p-3 text-left dark:text-white">Source Asset</th>
                      <th className="text-main-900 p-3 dark:text-white">Accrued Balance</th>
                      <th className="text-main-900 p-3 dark:text-white">USD Value</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {filteredUmbrellaTokens
                      .flatMap((token) =>
                        token.rewards.map((reward) => ({
                          ...reward,
                          sourceToken: token,
                        })),
                      )
                      .filter((reward) => (reward.balanceFormatted || 0) > 0)
                      .map((reward, index) => (
                        <tr
                          key={`${reward.address}-${index}`}
                          className="border-main-200 dark:border-main-800 border-b last:border-b-0"
                        >
                          <td className="p-3 pl-6">
                            <div className="flex items-center gap-3">
                              <div>
                                <div className="text-main-900 font-mono dark:text-white">{reward.symbol}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="text-main-900 font-mono dark:text-white">{reward.sourceToken.symbol}</div>
                          </td>
                          <td className="p-3 text-center">
                            <span className="text-main-900 font-mono select-all dark:text-white">
                              {Number(reward.balanceFormatted || 0).toLocaleString("en-US", {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 18,
                              })}
                            </span>
                          </td>
                          <td className="p-3 text-center">
                            <span className="text-main-900 font-mono select-all dark:text-white">
                              $
                              {Number(reward.usdAmount || 0).toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Block>
      </ModalBody>
    </ModalRoot>
  );
};
