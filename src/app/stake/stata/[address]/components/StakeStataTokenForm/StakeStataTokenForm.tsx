import { StakeStataTokenSummary } from "@/app/stake/stata/[address]/components/StakeStataTokenForm/StakeStataTokenSummary";
import {
  createStakeStataFormSchema,
  StakeStataFormValues,
} from "@/app/stake/stata/[address]/stakeStataTokenFormSchema";
import { ControlledAmountField } from "@/components/ControlledAmountField/ControlledAmountField";
import { SignTransaction } from "@/components/SignTransaction/SignTransaction";
import { SignTransactionFormConnector } from "@/components/SignTransaction/SignTransactionFormConnector";
import { StakingWarningMessage } from "@/components/StakingWarningMessage/StakingWarningMessage";
import { TransactionCard } from "@/components/Transaction/TransactionCard";
import { Button } from "@/components/ui/Button";
import { useCurrentMarket } from "@/hooks/useCurrentMarket";
import { useIsSafeWallet } from "@/hooks/useIsSafeWallet/useIsSafeWallet";
import { useSafeApproveAndStake } from "@/hooks/useSafeApproveAndStake";
import { useStake } from "@/hooks/useStake";
import { useTxFormSignature } from "@/providers/TxFormProvider/TxFormContext";
import { StataToken, StkToken } from "@/types/token";
import { calculateMaxStakeAmount } from "@/utils/calculations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Address, formatUnits } from "viem";

export type StakeStataTokenFormProps = {
  asset: Address;
  stkToken: StkToken;
  stataToken: StataToken;
};

export const StakeStataTokenForm = ({ asset, stkToken, stataToken }: StakeStataTokenFormProps) => {
  const { batchHelper: spender } = useCurrentMarket();
  const isSafeWallet = useIsSafeWallet();
  const { signingStatus } = useTxFormSignature();

  const { stake, data: hash, isPending: isTxPending, error: depositError } = useStake();
  const {
    approveAndStake,
    data: safeHash,
    isPending: isSafeTxPending,
    error: approveAndStakeError,
  } = useSafeApproveAndStake();

  const maxAmount = calculateMaxStakeAmount(stkToken, stataToken.balance || 0n);
  const { decimals, latestAnswer } = stataToken;

  const schema = useMemo(() => createStakeStataFormSchema({ maxAmount, isSafeWallet }), [maxAmount, isSafeWallet]);
  const formMethods = useForm<StakeStataFormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = ({ amount, permit, approval }: StakeStataFormValues) => {
    const umbrellaAddress = stkToken.address;

    if (!amount) {
      return;
    }

    if (permit || approval) {
      stake({
        amount,
        umbrellaAddress,
        assetAddress: asset,
        permit,
        description: `Stake ${formatUnits(amount, decimals)} ${stataToken.symbol}`,
      });
    } else {
      approveAndStake({
        umbrellaAddress: stkToken.address,
        assetAddress: asset,
        amount,
        spender,
      });
    }
  };

  return (
    <FormProvider {...formMethods}>
      <TransactionCard
        title="Stake Wrapped aToken"
        hash={hash}
        safeHash={safeHash}
        loading={isTxPending || isSafeTxPending}
        error={depositError || approveAndStakeError}
      >
        <StakingWarningMessage />
        <div className="flex flex-col justify-start gap-5 self-stretch">
          <h2 className="font-bold dark:text-white">Select amount</h2>

          <Controller
            name="amount"
            control={formMethods.control}
            disabled={signingStatus === "pending" || isTxPending || isSafeTxPending}
            render={({ field }) => (
              <ControlledAmountField
                {...field}
                autoFocus
                maxValue={maxAmount}
                decimals={decimals}
                usdPrice={latestAnswer}
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-4 md:self-center">
          {!isSafeWallet ? (
            <SignTransactionFormConnector>
              {({ amount }) => {
                return (
                  <SignTransaction control={formMethods.control} asset={asset} spender={spender} amount={amount} />
                );
              }}
            </SignTransactionFormConnector>
          ) : null}
          <Button
            primary
            elevation={1}
            onClick={formMethods.handleSubmit(onSubmit)}
            loading={isTxPending || isSafeTxPending}
            disabled={isTxPending || isSafeTxPending || !formMethods.formState.isValid}
            outerClassName="w-full md:w-[248px]"
            className="flex items-center gap-2"
          >
            {isSafeWallet ? "Approve & Stake" : "Stake"}
          </Button>
        </div>
      </TransactionCard>

      <StakeStataTokenSummary token={stataToken} stkToken={stkToken} hash={hash} />
    </FormProvider>
  );
};
