import { createPublicClient, http, PublicClient } from "viem";
import { baseSepolia } from "viem/chains";
import { UMBRELLA_DATA_AGGREGATION_HELPER_ABI } from "../../src/abis/umbrellaDataAggregationHelper";
import { baseSepoliaE2eForkUrl, defaultAnvilAccount } from "@e2e/config/e2e.constants";
import { MARKETS } from "@/constants/markets";

const baseSepoliaMarket = MARKETS[1];
const { umbrellaDataAggregationHelper, umbrellaHelper, oracle } = baseSepoliaMarket;

const owner = defaultAnvilAccount;

/**
 * Script to warm up Anvil by executing the `getAllAggregatedData` function
 * from the `umbrellaDataAggregationHelper` contract.
 * This is useful for preloading data into the cache before running tests because it is an expensive operation that would make tests fail due to timeout.
 * ⚠️ Notice that anvil fork must be run with --disable-block-gas-limit flag to avoid hitting block gas limits when calling getAllAggregatedData.
 */
async function warmupAnvil() {
  console.log("🔥 Starting Anvil warmup...");

  const client = createPublicClient({
    chain: baseSepolia,
    transport: http(baseSepoliaE2eForkUrl),
  });

  try {
    console.log("⏳ Waiting for Anvil to be ready...");
    await waitForAnvil(client as PublicClient);

    console.log("🚀 Executing getAllAggregatedData warmup...");
    const startTime = Date.now();

    const result = await client.readContract({
      address: umbrellaDataAggregationHelper,
      abi: UMBRELLA_DATA_AGGREGATION_HELPER_ABI,
      functionName: "getAllAggregatedData",
      args: [umbrellaHelper, oracle, owner],
    });

    const endTime = Date.now();
    console.log(`✅ Warmup completed in ${endTime - startTime}ms`);
    console.log(`📊 Result: ${result[0].length} stake tokens loaded`);

    // Run second time to verify that it is cached
    console.log("🔄 Testing cache performance...");
    const cacheStartTime = Date.now();

    await client.readContract({
      address: umbrellaDataAggregationHelper,
      abi: UMBRELLA_DATA_AGGREGATION_HELPER_ABI,
      functionName: "getAllAggregatedData",
      args: [umbrellaHelper, oracle, owner],
    });

    const cacheEndTime = Date.now();
    console.log(`⚡ Cache hit completed in ${cacheEndTime - cacheStartTime}ms`);
    console.log("🎉 Anvil warmup successful!");
  } catch (error) {
    console.error("❌ Warmup failed:", error);
    process.exit(1);
  }
}

async function waitForAnvil(client: PublicClient, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      await client.getBlockNumber();
      return;
    } catch (error) {
      if (i === maxRetries - 1) {
        throw new Error("Anvil not ready after maximum retries");
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}

if (require.main === module) {
  warmupAnvil();
}
