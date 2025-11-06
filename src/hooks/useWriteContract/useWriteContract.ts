import { ChainId } from "@/types/market";
import { isUserRejectedTransactionError } from "@/utils/errors";
import { ensureCorrectChainForTx } from "@/utils/web3";
import { useCallback } from "react";
import { useWriteContract as useWagmiWriteContract } from "wagmi";

export const useWriteContract = () => {
  const { writeContractAsync, error, ...rest } = useWagmiWriteContract();

  const wrappedWriteContractAsync = useCallback<typeof writeContractAsync>(
    async function (...args) {
      const { chainId } = args[0];

      if (!chainId) {
        throw new Error("ChainId must be provided");
      }

      await ensureCorrectChainForTx(chainId as ChainId);
      // @ts-expect-error - TODO: It should be inferred automatically, but it's not working
      return writeContractAsync(...args);
    },
    [writeContractAsync],
  );

  return {
    error: isUserRejectedTransactionError(error) ? undefined : error,
    writeContractAsync: wrappedWriteContractAsync,
    ...rest,
  } as const;
};
