import { mainnetFork } from "@/configs/mainnetFork";
import { RPCS } from "@/constants/rpcs";
import { createPublicClient, http } from "viem";

export const client = createPublicClient({
  chain: mainnetFork,
  transport: http(RPCS[mainnetFork.id]),
});
