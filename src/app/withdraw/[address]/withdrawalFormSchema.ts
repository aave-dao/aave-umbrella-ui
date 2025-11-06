import { SignableTxForm } from "@/types/form";
import { WithdrawalMethod } from "@/types/withdraw";
import { ApprovalSchema, PermitSchema, validatePermitAndApproval } from "@/utils/shemas";
import { z } from "zod";

export type WithdrawalFormValues = SignableTxForm & {
  withdrawalMethod: WithdrawalMethod;
};

export const createWithdrawalFormSchema = ({
  maxAmount,
  isSafeWallet,
}: {
  maxAmount: bigint;
  isSafeWallet: boolean;
}) => {
  return z
    .object({
      amount: z.coerce.bigint().positive().max(maxAmount),
      withdrawalMethod: z.enum(["withdrawToAave", "withdrawToStata", "withdrawToUnderlying"]),
      permit: PermitSchema.optional(),
      approval: ApprovalSchema.optional(),
    })
    .superRefine((val, ctx) => {
      if (!isSafeWallet) {
        validatePermitAndApproval(val, ctx);
      }
    });
};
