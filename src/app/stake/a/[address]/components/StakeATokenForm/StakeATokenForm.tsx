import { Address, formatUnits, parseUnits } from "viem";

import { StakeATokenSummary } from "@/app/stake/a/[address]/components/StakeATokenForm/StakeATokenSummary";
import { createStakeATokenFormSchema, StakeATokenFormValues } from "@/app/stake/a/[address]/stakeATokenFormSchema";
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
import { Reserve, StkToken } from "@/types/token";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";

const increaseToPercent = (amount: bigint, decimals: number, percent: number) => {
  return (amount * parseUnits(String(1 + percent), decimals)) / 10n ** BigInt(decimals);
};

export type StakeATokenFormProps = {
  asset: Address;
  stkToken: StkToken;
  reserves: Reserve[];
};

export const StakeATokenForm = ({ asset, stkToken, reserves }: StakeATokenFormProps) => {
  const client = useQueryClient();
  const isSafeWallet = useIsSafeWallet();
  const { batchHelper: spender } = useCurrentMarket();
  const { signingStatus } = useTxFormSignature();

  const reserve = stkToken.reserve!;
  const { reserveId, balance, decimals, symbol, latestAnswer } = reserve!;
  const maxAmount = balance || 0n;

  const schema = useMemo(
    () =>
      createStakeATokenFormSchema({
        maxAmount,
        reserves,
        reserveId,
        isSafeWallet,
      }),
    [maxAmount, reserveId, reserves, isSafeWallet],
  );
  const formMethods = useForm<StakeATokenFormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const { stake, data: hash, isPending: isTxPending, error: depositError } = useStake();
  const {
    approveAndStake,
    data: safeHash,
    isPending: isSafeTxPending,
    error: approveAndStakeError,
  } = useSafeApproveAndStake();

  const onSubmit = async ({ amount, permit, approval }: StakeATokenFormValues) => {
    if (!amount) {
      return;
    }

    const isMaxAmountStaking = amount === maxAmount;
    const amountToStake = isMaxAmountStaking ? increaseToPercent(amount, decimals, 0.005) : amount;
    const umbrellaAddress = stkToken.address;

    if (permit || approval) {
      const { status } = await stake({
        amount: amountToStake,
        umbrellaAddress,
        assetAddress: asset,
        permit,
        description: `Stake ${formatUnits(amount, decimals)} ${symbol}`,
      });

      if (status === "success") {
        client.invalidateQueries({
          queryKey: ["allReserves"],
        });
      }
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
        title="Stake aToken"
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
                const isMaxAmountStaking = amount === maxAmount;
                const amountToStake = isMaxAmountStaking ? increaseToPercent(amount, decimals, 0.005) : amount;
                return (
                  <SignTransaction
                    control={formMethods.control}
                    asset={asset}
                    spender={spender}
                    amount={amountToStake}
                  />
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

      <StakeATokenSummary reserve={reserve} stkToken={stkToken} hash={hash} reserves={reserves} />
    </FormProvider>
  );
};
