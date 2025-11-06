import { config } from "@/configs/wagmi";
import SafeAppsSDK, { BaseTransaction, SafeInfo } from "@safe-global/safe-apps-sdk";
import { sendCalls, sendTransaction } from "@wagmi/core";
import { Address, Hash } from "viem";

export type SendSafeTxsContext = { sdk: SafeAppsSDK; safe: SafeInfo };

export const sendSafeTxs = async (txs: BaseTransaction[], { sdk, safe }: SendSafeTxsContext) => {
  try {
    if (safe?.safeAddress) {
      return await sdk.txs.send({ txs });
    }

    try {
      await sendCalls(config, {
        calls: txs.map((tx) => ({
          to: tx.to as Address,
          value: BigInt(tx.value),
          data: tx.data as Hash,
        })),
      });
    } catch (e) {
      void e;
      for (const tx of txs) {
        await sendTransaction(config, {
          to: tx.to as Address,
          value: BigInt(tx.value),
          data: tx.data as Hash,
        });
      }
    }

    return null;
  } catch (e) {
    throw new Error("Failed to send transactions");
  }
};
