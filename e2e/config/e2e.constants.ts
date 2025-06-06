"use client";

import { Address } from "viem";
import { baseSepolia, Chain } from "wagmi/chains";

export const defaultAnvilAccount: Address = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

export const isE2eTestEnabled = process.env.NEXT_PUBLIC_E2E_TEST_ENABLED === "true";
if (isE2eTestEnabled) console.warn("E2E tests are enabled. This should only be used in a testing environment.");
export const baseSepoliaE2eForkUrl = "http://127.0.0.1:8545";

export const baseSepoliaUsingFork: Chain = {
  ...baseSepolia,
  rpcUrls: {
    default: { http: [baseSepoliaE2eForkUrl] },
  },
};
