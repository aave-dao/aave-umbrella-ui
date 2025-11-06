import { SignableTxForm } from "@/types/form";
import { ApprovalSchema, PermitSchema, validatePermitAndApproval } from "@/utils/shemas";
import { z } from "zod";

export type StakeNativeTokenFormValues = SignableTxForm & {
  wrappedAmount: bigint;
};

export const createStakeNativeTokenFormSchema = ({
  maxAmount,
  isSafeWallet,
}: {
  maxAmount: bigint;
  isSafeWallet: boolean;
}) => {
  return z
    .object({
      amount: z.coerce.bigint().positive().max(maxAmount),
      wrappedAmount: isSafeWallet ? z.coerce.bigint() : z.coerce.bigint().positive().max(maxAmount),
      permit: PermitSchema.optional(),
      approval: ApprovalSchema.optional(),
    })
    .superRefine((val, ctx) => {
      if (!isSafeWallet) {
        validatePermitAndApproval(val, ctx);
      }
    });
};
