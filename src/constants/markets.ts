import { forkedMainnet } from "@/configs/tenderly.config";
import { Market } from "@/types/market";
import { AaveV3BaseSepolia, AaveV3Ethereum, UmbrellaBaseSepolia, UmbrellaEthereum } from "@bgd-labs/aave-address-book";

export const MARKETS: Market[] = [
  {
    id: `${AaveV3Ethereum.CHAIN_ID}-${AaveV3Ethereum.POOL}`,
    name: "Ethereum",
    chainId: AaveV3Ethereum.CHAIN_ID,
    poolProvider: AaveV3Ethereum.POOL_ADDRESSES_PROVIDER,
    uiPoolDataProvider: AaveV3Ethereum.UI_POOL_DATA_PROVIDER,
    oracle: AaveV3Ethereum.ORACLE,
    rewardsController: UmbrellaEthereum.UMBRELLA_REWARDS_CONTROLLER,
    umbrellaHelper: UmbrellaEthereum.UMBRELLA,
    batchHelper: UmbrellaEthereum.UMBRELLA_BATCH_HELPER,
    umbrellaDataAggregationHelper: UmbrellaEthereum.DATA_AGGREGATION_HELPER,
    wrapNativeTokenAddress: AaveV3Ethereum.ASSETS.WETH.UNDERLYING,
  },

  ...(process.env.NEXT_PUBLIC_TESTNETS_ENABLED === "true"
    ? [
        {
          id: `${AaveV3BaseSepolia.CHAIN_ID}-${AaveV3BaseSepolia.POOL}`,
          name: "Base Sepolia",
          chainId: AaveV3BaseSepolia.CHAIN_ID,
          poolProvider: AaveV3BaseSepolia.POOL_ADDRESSES_PROVIDER,
          uiPoolDataProvider: AaveV3BaseSepolia.UI_POOL_DATA_PROVIDER,
          oracle: AaveV3BaseSepolia.ORACLE,
          rewardsController: UmbrellaBaseSepolia.UMBRELLA_REWARDS_CONTROLLER,
          umbrellaHelper: UmbrellaBaseSepolia.UMBRELLA,
          // batchHelper: UmbrellaBaseSepolia.UMBRELLA_BATCH_HELPER,
          batchHelper: "0x32eb722eF6fC2B5ea50e833Fb538769fF09A6C1c", // New version
          // umbrellaDataAggregationHelper: UmbrellaBaseSepolia.DATA_AGGREGATION_HELPER,
          umbrellaDataAggregationHelper: "0xDdE9091B6F9003f3b7070Ce7c377Eee09a8e0245", // New version
          wrapNativeTokenAddress: AaveV3BaseSepolia.ASSETS.WETH.UNDERLYING,
        } as const,
      ]
    : []),

  ...(process.env.NEXT_PUBLIC_TENDERLY_VNETS_ENABLED === "true"
    ? [
        {
          id: `${forkedMainnet.id}-${AaveV3Ethereum.POOL}`,
          name: forkedMainnet.name,
          chainId: forkedMainnet.id,
          poolProvider: AaveV3Ethereum.POOL_ADDRESSES_PROVIDER,
          uiPoolDataProvider: AaveV3Ethereum.UI_POOL_DATA_PROVIDER,
          oracle: AaveV3Ethereum.ORACLE,
          rewardsController: UmbrellaEthereum.UMBRELLA_REWARDS_CONTROLLER,
          umbrellaHelper: UmbrellaEthereum.UMBRELLA,
          batchHelper: UmbrellaEthereum.UMBRELLA_BATCH_HELPER,
          umbrellaDataAggregationHelper: UmbrellaEthereum.DATA_AGGREGATION_HELPER,
          wrapNativeTokenAddress: AaveV3Ethereum.ASSETS.WETH.UNDERLYING,
        } as const,
      ]
    : []),
];
