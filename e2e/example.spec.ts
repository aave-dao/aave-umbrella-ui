import { expect, test } from "@playwright/test";
import { Address } from "viem";
import { chooseForkedChain, connectToMockWallet } from "./helpers";
import { setERC20Balance } from "./tenderly/setERC20Balance";

test.describe("example", () => {
  const wallet = process.env.NEXT_PUBLIC_E2E_WALLET_ADDRESS! as Address;
  const USDT = "0xdac17f958d2ee523a2206206994597c13d831ec7";

  test.beforeEach(async () => {
    await setERC20Balance({
      wallet,
      amount: 1_000_000n,
      token: USDT,
    });
  });

  test("example test", async ({ page }) => {
    await page.goto("/");

    await chooseForkedChain(page);

    await connectToMockWallet(page);

    await expect(page.getByRole("link", { name: "Stake" })).toBeVisible();
  });
});
