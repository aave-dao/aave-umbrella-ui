import { UMBRELLA_DATA_AGGREGATION_HELPER_ABI } from "@/abis/umbrellaDataAggregationHelper";
import type { UseReadContractReturnType } from "wagmi";

type AllStkTokensData = NonNullable<
  UseReadContractReturnType<typeof UMBRELLA_DATA_AGGREGATION_HELPER_ABI, "getAllAggregatedData">["data"]
>;

export const allStkTokensMock: AllStkTokensData = [
  [
    {
      stakeTokenData: {
        token: "0xD15e98f7AD53954fc96A7904738Eb1Ed1f6F0422",
        price: 100198410n,
        name: "Umbrella Stake Wrapped Aave Base Sepolia USDC V1",
        symbol: "stkwaBasSepUSDC.V1",
        decimals: 6,
      },
      totalAssets: 1001504984320n,
      targetLiquidity: 50000000000000n,
      isStakeConfigured: true,
      rewardsTokenData: [
        {
          rewardTokenData: {
            token: "0xba50Cd2A20f6DA35D788639E581bca8d0B5d4D5f",
            price: 99982437n,
            name: "USD Coin",
            symbol: "USDC",
            decimals: 6,
          },
          maxEmissionPerSecond: 160000n,
          distributionEnd: 1753788774n,
        },
        {
          rewardTokenData: {
            token: "0x0a215D8ba66387DCA84B284D18c3B4ec3de6E54a",
            price: 100043658n,
            name: "Tether USD",
            symbol: "USDT",
            decimals: 6,
          },
          maxEmissionPerSecond: 0n,
          distributionEnd: 1741892964n,
        },
      ],
    },
    {
      stakeTokenData: {
        token: "0x9287a4e4DDb8715862D5c94E6f3108E1E9A83321",
        price: 100048523n,
        name: "Umbrella Stake Wrapped Aave Base Sepolia USDT V1",
        symbol: "stkwaBasSepUSDT.V1",
        decimals: 6,
      },
      totalAssets: 1017407484390n,
      targetLiquidity: 50000000000000n,
      isStakeConfigured: true,
      rewardsTokenData: [
        {
          rewardTokenData: {
            token: "0x0a215D8ba66387DCA84B284D18c3B4ec3de6E54a",
            price: 100043658n,
            name: "Tether USD",
            symbol: "USDT",
            decimals: 6,
          },
          maxEmissionPerSecond: 160000n,
          distributionEnd: 1753788774n,
        },
        {
          rewardTokenData: {
            token: "0xba50Cd2A20f6DA35D788639E581bca8d0B5d4D5f",
            price: 99982437n,
            name: "USD Coin",
            symbol: "USDC",
            decimals: 6,
          },
          maxEmissionPerSecond: 0n,
          distributionEnd: 1741892964n,
        },
      ],
    },
    {
      stakeTokenData: {
        token: "0xf9a03b111e22180172F5DF879ac3c5d19BA75975",
        price: 10432024000000n,
        name: "Umbrella Stake Wrapped Aave Base Sepolia WBTC V1",
        symbol: "stkwaBasSepWBTC.V1",
        decimals: 8,
      },
      totalAssets: 201654125n,
      targetLiquidity: 15000000000n,
      isStakeConfigured: true,
      rewardsTokenData: [
        {
          rewardTokenData: {
            token: "0x54114591963CF60EF3aA63bEfD6eC263D98145a4",
            price: 10432024000000n,
            name: "Wrapped BTC",
            symbol: "WBTC",
            decimals: 8,
          },
          maxEmissionPerSecond: 0n,
          distributionEnd: 1744313198n,
        },
        {
          rewardTokenData: {
            token: "0x47Db195BAf46898302C06c31bCF46c01C64ACcF9",
            price: 10432024000000n,
            name: "Aave Base Sepolia WBTC",
            symbol: "aBasSepWBTC",
            decimals: 8,
          },
          maxEmissionPerSecond: 10n,
          distributionEnd: 1753788774n,
        },
      ],
    },
    {
      stakeTokenData: {
        token: "0x36edA587e02e897Db071000ac37606B2767d68aa",
        price: 274668821875n,
        name: "Umbrella Stake Wrapped Aave Base Sepolia cbETH V1",
        symbol: "stkwaBasSepcbETH.V1",
        decimals: 18,
      },
      totalAssets: 1n,
      targetLiquidity: 10000000000000000000000n,
      isStakeConfigured: true,
      rewardsTokenData: [
        {
          rewardTokenData: {
            token: "0x73a5bB60b0B0fc35710DDc0ea9c407031E31Bdbb",
            price: 249741758265n,
            name: "Aave Base Sepolia WETH",
            symbol: "aBasSepWETH",
            decimals: 18,
          },
          maxEmissionPerSecond: 0n,
          distributionEnd: 1746532174n,
        },
        {
          rewardTokenData: {
            token: "0x54114591963CF60EF3aA63bEfD6eC263D98145a4",
            price: 10432024000000n,
            name: "Wrapped BTC",
            symbol: "WBTC",
            decimals: 8,
          },
          maxEmissionPerSecond: 0n,
          distributionEnd: 1741892964n,
        },
        {
          rewardTokenData: {
            token: "0xD171b9694f7A2597Ed006D41f7509aaD4B485c4B",
            price: 274668821875n,
            name: "Coinbase Wrapped Staked ETH ",
            symbol: "cbETH",
            decimals: 18,
          },
          maxEmissionPerSecond: 15855000000000n,
          distributionEnd: 1753789430n,
        },
      ],
    },
    {
      stakeTokenData: {
        token: "0x16C2230c3B1116Acdf3dE7202893cb5f0fBde6E6",
        price: 1377174000n,
        name: "Umbrella Stake Wrapped Aave Base Sepolia LINK V1",
        symbol: "stkwaBasSepLINK.V1",
        decimals: 18,
      },
      totalAssets: 1519000000000000000000n,
      targetLiquidity: 150000000000000000000000n,
      isStakeConfigured: true,
      rewardsTokenData: [
        {
          rewardTokenData: {
            token: "0x810D46F9a9027E28F9B01F75E2bdde839dA61115",
            price: 1377174000n,
            name: "ChainLink Token",
            symbol: "LINK",
            decimals: 18,
          },
          maxEmissionPerSecond: 237800000000000n,
          distributionEnd: 1753788774n,
        },
      ],
    },
    {
      stakeTokenData: {
        token: "0xfD055B11563b80648091d0F69704dD647714e134",
        price: 249741758265n,
        name: "Umbrella Stake Wrapped Ether V1",
        symbol: "stkWETH.V1",
        decimals: 18,
      },
      totalAssets: 177100000000000000n,
      targetLiquidity: 25000000000000000000000n,
      isStakeConfigured: true,
      rewardsTokenData: [
        {
          rewardTokenData: {
            token: "0x9Fd6d1DBAd7c052e0c43f46df36eEc6a68814B63",
            price: 274668821875n,
            name: "Aave Base Sepolia cbETH",
            symbol: "aBasSepcbETH",
            decimals: 18,
          },
          maxEmissionPerSecond: 1377865961199n,
          distributionEnd: 1755099348n,
        },
        {
          rewardTokenData: {
            token: "0x73a5bB60b0B0fc35710DDc0ea9c407031E31Bdbb",
            price: 249741758265n,
            name: "Aave Base Sepolia WETH",
            symbol: "aBasSepWETH",
            decimals: 18,
          },
          maxEmissionPerSecond: 0n,
          distributionEnd: 1748860284n,
        },
        {
          rewardTokenData: {
            token: "0xD171b9694f7A2597Ed006D41f7509aaD4B485c4B",
            price: 274668821875n,
            name: "Coinbase Wrapped Staked ETH ",
            symbol: "cbETH",
            decimals: 18,
          },
          maxEmissionPerSecond: 15855000000000n,
          distributionEnd: 1753789644n,
        },
        {
          rewardTokenData: {
            token: "0x9F56ff6c3441bb89eBFf1c0bc75D4096C33230d1",
            price: 274668821875n,
            name: "Wrapped Aave Base Sepolia cbETH",
            symbol: "waBasSepcbETH",
            decimals: 18,
          },
          maxEmissionPerSecond: 688932980599n,
          distributionEnd: 1755100110n,
        },
      ],
    },
  ],
  [
    {
      stakeToken: "0xD15e98f7AD53954fc96A7904738Eb1Ed1f6F0422",
      tokensFromRoute: [
        {
          typeOfToken: 3,
          tokenData: {
            token: "0xf430cb6E2b85f99222fBFA6dFEa18Ff60FA6B32a",
            price: 100198410n,
            name: "Wrapped Aave Base Sepolia USDC",
            symbol: "waBasSepUSDC",
            decimals: 6,
          },
        },
        {
          typeOfToken: 2,
          tokenData: {
            token: "0x10F1A9D11CDf50041f3f8cB7191CBE2f31750ACC",
            price: 99982437n,
            name: "Aave Base Sepolia USDC",
            symbol: "aBasSepUSDC",
            decimals: 6,
          },
        },
        {
          typeOfToken: 1,
          tokenData: {
            token: "0xba50Cd2A20f6DA35D788639E581bca8d0B5d4D5f",
            price: 99982437n,
            name: "USD Coin",
            symbol: "USDC",
            decimals: 6,
          },
        },
      ],
    },
    {
      stakeToken: "0x9287a4e4DDb8715862D5c94E6f3108E1E9A83321",
      tokensFromRoute: [
        {
          typeOfToken: 3,
          tokenData: {
            token: "0xf63dA51069FAe9448747FA425F8Cb84B0149eC0F",
            price: 100048523n,
            name: "Wrapped Aave Base Sepolia USDT",
            symbol: "waBasSepUSDT",
            decimals: 6,
          },
        },
        {
          typeOfToken: 2,
          tokenData: {
            token: "0xcE3CAae5Ed17A7AafCEEbc897DE843fA6CC0c018",
            price: 100043658n,
            name: "Aave Base Sepolia USDT",
            symbol: "aBasSepUSDT",
            decimals: 6,
          },
        },
        {
          typeOfToken: 1,
          tokenData: {
            token: "0x0a215D8ba66387DCA84B284D18c3B4ec3de6E54a",
            price: 100043658n,
            name: "Tether USD",
            symbol: "USDT",
            decimals: 6,
          },
        },
      ],
    },
    {
      stakeToken: "0xf9a03b111e22180172F5DF879ac3c5d19BA75975",
      tokensFromRoute: [
        {
          typeOfToken: 3,
          tokenData: {
            token: "0x5d7538579560F5fdD54F9D264DBe0e697b5BF668",
            price: 10432024000000n,
            name: "Wrapped Aave Base Sepolia WBTC",
            symbol: "waBasSepWBTC",
            decimals: 8,
          },
        },
        {
          typeOfToken: 2,
          tokenData: {
            token: "0x47Db195BAf46898302C06c31bCF46c01C64ACcF9",
            price: 10432024000000n,
            name: "Aave Base Sepolia WBTC",
            symbol: "aBasSepWBTC",
            decimals: 8,
          },
        },
        {
          typeOfToken: 1,
          tokenData: {
            token: "0x54114591963CF60EF3aA63bEfD6eC263D98145a4",
            price: 10432024000000n,
            name: "Wrapped BTC",
            symbol: "WBTC",
            decimals: 8,
          },
        },
      ],
    },
    {
      stakeToken: "0x36edA587e02e897Db071000ac37606B2767d68aa",
      tokensFromRoute: [
        {
          typeOfToken: 3,
          tokenData: {
            token: "0x9F56ff6c3441bb89eBFf1c0bc75D4096C33230d1",
            price: 274668821875n,
            name: "Wrapped Aave Base Sepolia cbETH",
            symbol: "waBasSepcbETH",
            decimals: 18,
          },
        },
        {
          typeOfToken: 2,
          tokenData: {
            token: "0x9Fd6d1DBAd7c052e0c43f46df36eEc6a68814B63",
            price: 274668821875n,
            name: "Aave Base Sepolia cbETH",
            symbol: "aBasSepcbETH",
            decimals: 18,
          },
        },
        {
          typeOfToken: 1,
          tokenData: {
            token: "0xD171b9694f7A2597Ed006D41f7509aaD4B485c4B",
            price: 274668821875n,
            name: "Coinbase Wrapped Staked ETH ",
            symbol: "cbETH",
            decimals: 18,
          },
        },
      ],
    },
    {
      stakeToken: "0x16C2230c3B1116Acdf3dE7202893cb5f0fBde6E6",
      tokensFromRoute: [
        {
          typeOfToken: 3,
          tokenData: {
            token: "0xFb3AB5ABd3dE4703C0F296B1fe6f5E570e1631Ff",
            price: 1377174000n,
            name: "Wrapped Aave Base Sepolia LINK",
            symbol: "waBasSepLINK",
            decimals: 18,
          },
        },
        {
          typeOfToken: 2,
          tokenData: {
            token: "0x0aD46dE765522399d7b25B438b230A894d72272B",
            price: 1377174000n,
            name: "Aave Base Sepolia LINK",
            symbol: "aBasSepLINK",
            decimals: 18,
          },
        },
        {
          typeOfToken: 1,
          tokenData: {
            token: "0x810D46F9a9027E28F9B01F75E2bdde839dA61115",
            price: 1377174000n,
            name: "ChainLink Token",
            symbol: "LINK",
            decimals: 18,
          },
        },
      ],
    },
    {
      stakeToken: "0xfD055B11563b80648091d0F69704dD647714e134",
      tokensFromRoute: [
        {
          typeOfToken: 1,
          tokenData: {
            token: "0x4200000000000000000000000000000000000006",
            price: 249741758265n,
            name: "Wrapped Ether",
            symbol: "WETH",
            decimals: 18,
          },
        },
      ],
    },
  ],
  [],
  [],
];
