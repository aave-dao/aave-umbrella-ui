import { Approval } from "@/types/approval";
import { Permit } from "@/types/permit";

export type SignableTxForm = {
  amount: bigint;
  approval?: Approval;
  permit?: Permit;
};
