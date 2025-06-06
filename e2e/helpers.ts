import { Page } from "@playwright/test";

export async function chooseForkedChain(page: Page) {
  await page.getByRole("combobox").click();
  await page.getByText("Virtual Mainnet").click();
}

export async function connectToMockWallet(page: Page) {
  await page.getByRole("button", { name: "Connect Wallet" }).click();
  await page.getByTestId("rk-wallet-option-mock").click();
}
