import { Address, Hex } from "viem";
import { client } from "./client";

export const setERC20Balance = async ({
  wallet,
  amount,
  token,
}: {
  wallet: Address;
  amount: bigint;
  token: Address;
}) => {
  try {
    await client.request<{
      method: "tenderly_setBalance";
      Parameters: [erc20: Hex, to: Hex, value: Hex];
      ReturnType: Hex;
    }>({
      method: "tenderly_setErc20Balance",
      params: [token, wallet, `0x${amount.toString(16)}`],
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to set balance of ERC20 token");
  }
};
