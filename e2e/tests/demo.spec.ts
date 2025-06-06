import { test, expect, Page } from "@playwright/test";

test("Full flow", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await chooseSepoliaBaseChain(page);

  await connectToMockWallet(page);

  await stakeEth(page);

  await returnToDashboard(page);

  await claimAllRewards(page);

  await returnToDashboard(page);

  await initCooldown(page);

  await page.waitForTimeout(500);
});

async function chooseSepoliaBaseChain(page: Page) {
  await page.getByRole("combobox").click();
  await page.getByText("Base Sepolia", { exact: true }).click();
}

async function connectToMockWallet(page: Page) {
  await page.getByRole("button", { name: "Connect Wallet" }).click();
  await page.getByTestId("rk-wallet-option-mock").click();
}

async function stakeEth(page: Page) {
  // ETH is in the last row in the table
  await page.getByRole("link", { name: "Stake" }).last().click();
  await page.getByRole("textbox", { name: "0.000" }).fill("2");
  await page.getByRole("button", { name: "Wrap" }).click();
  await page.getByRole("button", { name: "Approve" }).click();
  await page.getByRole("button", { name: "Stake" }).click();

  await expect(page.getByRole("heading", { name: "Transaction completed!" })).toBeVisible();

  // Wait to ensure that claimable rewards are available
  await page.waitForTimeout(2000);
}

async function claimAllRewards(page: Page) {
  await page.getByRole("link", { name: "Claim all" }).click();
  await page.getByRole("button", { name: "Claim All" }).click();
  await expect(page.getByRole("heading", { name: "Transaction completed!" })).toBeVisible();
}

async function returnToDashboard(page: Page) {
  await page.getByRole("link", { name: "Return to dashboard" }).click();
}

async function initCooldown(page: Page) {
  await page.getByRole("main").getByRole("button", { name: "Cooldown" }).click();
  // TODO: add fork time traveling to test cooldown
}
