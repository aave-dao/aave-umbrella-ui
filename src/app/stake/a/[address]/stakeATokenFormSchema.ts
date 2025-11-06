import { SignableTxForm } from "@/types/form";
import { Reserve } from "@/types/token";
import { calculateNewHealthFactor } from "@/utils/calculations";
import { ApprovalSchema, PermitSchema, validatePermitAndApproval } from "@/utils/shemas";
import { z } from "zod";

export type StakeATokenFormValues = SignableTxForm;

export const createStakeATokenFormSchema = ({
  reserveId,
  reserves,
  maxAmount,
  isSafeWallet,
}: {
  reserveId: number;
  reserves: Reserve[];
  maxAmount: bigint;
  isSafeWallet: boolean;
}) => {
  return z
    .object({
      amount: z.coerce.bigint().positive().max(maxAmount),
      permit: PermitSchema.optional(),
      approval: ApprovalSchema.optional(),
    })
    .superRefine((val, ctx) => {
      if (!isSafeWallet) {
        validatePermitAndApproval(val, ctx);
      }

      const newBalance = maxAmount - val.amount;
      const newHF = calculateNewHealthFactor({ positions: reserves }, { reserveId, balance: newBalance });

      if (newHF < 1.1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["amount"],
          message: "Health factor",
        });
      }
    });
};
