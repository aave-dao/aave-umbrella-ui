export const UMBRELLA_DATA_AGGREGATION_HELPER_ABI = [
  {
    inputs: [
      { internalType: "address", name: "rewardsController_", type: "address" },
      { internalType: "address", name: "owner_", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  { inputs: [], name: "EthTransferFailed", type: "error" },
  { inputs: [], name: "OnlyRescueGuardian", type: "error" },
  { inputs: [{ internalType: "address", name: "owner", type: "address" }], name: "OwnableInvalidOwner", type: "error" },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "token", type: "address" }],
    name: "SafeERC20FailedOperation",
    type: "error",
  },
  { inputs: [], name: "ZeroAddress", type: "error" },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "caller", type: "address" },
      { indexed: true, internalType: "address", name: "token", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      { indexed: false, internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "ERC20Rescued",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "caller", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      { indexed: false, internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "NativeTokensRescued",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "previousOwner", type: "address" },
      { indexed: true, internalType: "address", name: "newOwner", type: "address" },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "REWARDS_CONTROLLER",
    outputs: [{ internalType: "contract IRewardsController", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "emergencyEtherTransfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "erc20Token", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "emergencyTokenTransfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract IUmbrella", name: "umbrella", type: "address" },
      { internalType: "contract IAaveOracle", name: "aaveOracle", type: "address" },
      { internalType: "address", name: "user", type: "address" },
    ],
    name: "getAllAggregatedData",
    outputs: [
      {
        components: [
          {
            components: [
              { internalType: "address", name: "token", type: "address" },
              { internalType: "uint256", name: "price", type: "uint256" },
              { internalType: "string", name: "name", type: "string" },
              { internalType: "string", name: "symbol", type: "string" },
              { internalType: "uint8", name: "decimals", type: "uint8" },
            ],
            internalType: "struct DataAggregationHelper.TokenData",
            name: "stakeTokenData",
            type: "tuple",
          },
          { internalType: "uint256", name: "totalAssets", type: "uint256" },
          { internalType: "uint256", name: "maxTotalAssets", type: "uint256" },
          { internalType: "uint256", name: "targetLiquidity", type: "uint256" },
          { internalType: "address", name: "reserve", type: "address" },
          { internalType: "bool", name: "isStakeConfigured", type: "bool" },
          {
            components: [
              {
                components: [
                  { internalType: "address", name: "token", type: "address" },
                  { internalType: "uint256", name: "price", type: "uint256" },
                  { internalType: "string", name: "name", type: "string" },
                  { internalType: "string", name: "symbol", type: "string" },
                  { internalType: "uint8", name: "decimals", type: "uint8" },
                ],
                internalType: "struct DataAggregationHelper.TokenData",
                name: "rewardTokenData",
                type: "tuple",
              },
              { internalType: "uint256", name: "maxEmissionPerSecond", type: "uint256" },
              { internalType: "uint256", name: "distributionEnd", type: "uint256" },
            ],
            internalType: "struct DataAggregationHelper.RewardTokenData[]",
            name: "rewardsTokenData",
            type: "tuple[]",
          },
        ],
        internalType: "struct DataAggregationHelper.StakeTokenData[]",
        name: "",
        type: "tuple[]",
      },
      {
        components: [
          { internalType: "address", name: "stakeToken", type: "address" },
          {
            components: [
              { internalType: "enum DataAggregationHelper.TokenType", name: "typeOfToken", type: "uint8" },
              {
                components: [
                  { internalType: "address", name: "token", type: "address" },
                  { internalType: "uint256", name: "price", type: "uint256" },
                  { internalType: "string", name: "name", type: "string" },
                  { internalType: "string", name: "symbol", type: "string" },
                  { internalType: "uint8", name: "decimals", type: "uint8" },
                ],
                internalType: "struct DataAggregationHelper.TokenData",
                name: "tokenData",
                type: "tuple",
              },
            ],
            internalType: "struct DataAggregationHelper.TokenFromRoute[]",
            name: "tokensFromRoute",
            type: "tuple[]",
          },
        ],
        internalType: "struct DataAggregationHelper.TokenRouteData[]",
        name: "",
        type: "tuple[]",
      },
      {
        components: [
          { internalType: "address", name: "stakeToken", type: "address" },
          { internalType: "uint256", name: "stakeUserBalance", type: "uint256" },
          {
            components: [
              { internalType: "address", name: "reward", type: "address" },
              { internalType: "uint256", name: "currentReward", type: "uint256" },
            ],
            internalType: "struct DataAggregationHelper.RewardTokenUserData[]",
            name: "rewardsTokenUserData",
            type: "tuple[]",
          },
        ],
        internalType: "struct DataAggregationHelper.StakeTokenUserData[]",
        name: "",
        type: "tuple[]",
      },
      {
        components: [
          { internalType: "address", name: "stakeToken", type: "address" },
          {
            components: [
              { internalType: "enum DataAggregationHelper.TokenType", name: "typeOfToken", type: "uint8" },
              { internalType: "address", name: "token", type: "address" },
              { internalType: "uint256", name: "userBalance", type: "uint256" },
            ],
            internalType: "struct DataAggregationHelper.BalanceOfTokenFromRoute[]",
            name: "balancesOfRouteTokens",
            type: "tuple[]",
          },
        ],
        internalType: "struct DataAggregationHelper.TokenRouteBalances[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract IUmbrella", name: "umbrella", type: "address" },
      { internalType: "contract IAaveOracle", name: "aaveOracle", type: "address" },
    ],
    name: "getTokensAggregatedData",
    outputs: [
      {
        components: [
          {
            components: [
              { internalType: "address", name: "token", type: "address" },
              { internalType: "uint256", name: "price", type: "uint256" },
              { internalType: "string", name: "name", type: "string" },
              { internalType: "string", name: "symbol", type: "string" },
              { internalType: "uint8", name: "decimals", type: "uint8" },
            ],
            internalType: "struct DataAggregationHelper.TokenData",
            name: "stakeTokenData",
            type: "tuple",
          },
          { internalType: "uint256", name: "totalAssets", type: "uint256" },
          { internalType: "uint256", name: "maxTotalAssets", type: "uint256" },
          { internalType: "uint256", name: "targetLiquidity", type: "uint256" },
          { internalType: "address", name: "reserve", type: "address" },
          { internalType: "bool", name: "isStakeConfigured", type: "bool" },
          {
            components: [
              {
                components: [
                  { internalType: "address", name: "token", type: "address" },
                  { internalType: "uint256", name: "price", type: "uint256" },
                  { internalType: "string", name: "name", type: "string" },
                  { internalType: "string", name: "symbol", type: "string" },
                  { internalType: "uint8", name: "decimals", type: "uint8" },
                ],
                internalType: "struct DataAggregationHelper.TokenData",
                name: "rewardTokenData",
                type: "tuple",
              },
              { internalType: "uint256", name: "maxEmissionPerSecond", type: "uint256" },
              { internalType: "uint256", name: "distributionEnd", type: "uint256" },
            ],
            internalType: "struct DataAggregationHelper.RewardTokenData[]",
            name: "rewardsTokenData",
            type: "tuple[]",
          },
        ],
        internalType: "struct DataAggregationHelper.StakeTokenData[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract IUmbrella", name: "umbrella", type: "address" },
      { internalType: "contract IAaveOracle", name: "aaveOracle", type: "address" },
    ],
    name: "getTokensRouteData",
    outputs: [
      {
        components: [
          { internalType: "address", name: "stakeToken", type: "address" },
          {
            components: [
              { internalType: "enum DataAggregationHelper.TokenType", name: "typeOfToken", type: "uint8" },
              {
                components: [
                  { internalType: "address", name: "token", type: "address" },
                  { internalType: "uint256", name: "price", type: "uint256" },
                  { internalType: "string", name: "name", type: "string" },
                  { internalType: "string", name: "symbol", type: "string" },
                  { internalType: "uint8", name: "decimals", type: "uint8" },
                ],
                internalType: "struct DataAggregationHelper.TokenData",
                name: "tokenData",
                type: "tuple",
              },
            ],
            internalType: "struct DataAggregationHelper.TokenFromRoute[]",
            name: "tokensFromRoute",
            type: "tuple[]",
          },
        ],
        internalType: "struct DataAggregationHelper.TokenRouteData[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract IUmbrella", name: "umbrella", type: "address" },
      { internalType: "contract IAaveOracle", name: "aaveOracle", type: "address" },
    ],
    name: "getUmbrellaData",
    outputs: [
      {
        components: [
          {
            components: [
              {
                components: [
                  { internalType: "address", name: "token", type: "address" },
                  { internalType: "uint256", name: "price", type: "uint256" },
                  { internalType: "string", name: "name", type: "string" },
                  { internalType: "string", name: "symbol", type: "string" },
                  { internalType: "uint8", name: "decimals", type: "uint8" },
                ],
                internalType: "struct DataAggregationHelper.TokenData",
                name: "stakeToken",
                type: "tuple",
              },
              { internalType: "uint256", name: "totalAssets", type: "uint256" },
              { internalType: "uint256", name: "maxTotalAssets", type: "uint256" },
              { internalType: "uint256", name: "totalSupply", type: "uint256" },
              { internalType: "uint256", name: "cooldown", type: "uint256" },
              { internalType: "uint256", name: "unstakeWindow", type: "uint256" },
            ],
            internalType: "struct DataAggregationHelper.StakeTokenConfig",
            name: "stakeTokenConfig",
            type: "tuple",
          },
          {
            components: [
              { internalType: "uint256", name: "targetLiquidity", type: "uint256" },
              {
                components: [
                  {
                    components: [
                      { internalType: "address", name: "token", type: "address" },
                      { internalType: "uint256", name: "price", type: "uint256" },
                      { internalType: "string", name: "name", type: "string" },
                      { internalType: "string", name: "symbol", type: "string" },
                      { internalType: "uint8", name: "decimals", type: "uint8" },
                    ],
                    internalType: "struct DataAggregationHelper.TokenData",
                    name: "reward",
                    type: "tuple",
                  },
                  { internalType: "uint256", name: "maxEmissionPerSecond", type: "uint256" },
                  { internalType: "uint256", name: "distributionEnd", type: "uint256" },
                ],
                internalType: "struct DataAggregationHelper.RewardConfig[]",
                name: "rewardConfigs",
                type: "tuple[]",
              },
            ],
            internalType: "struct DataAggregationHelper.RewardsControllerConfigs",
            name: "rewardsControllerConfigs",
            type: "tuple",
          },
          {
            components: [
              { internalType: "address", name: "reserve", type: "address" },
              { internalType: "uint256", name: "deficitOffset", type: "uint256" },
              { internalType: "uint256", name: "pendingDeficit", type: "uint256" },
            ],
            internalType: "struct DataAggregationHelper.UmbrellaConfig",
            name: "umbrellaConfig",
            type: "tuple",
          },
        ],
        internalType: "struct DataAggregationHelper.UmbrellaData[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract IUmbrella", name: "umbrella", type: "address" },
      { internalType: "address", name: "user", type: "address" },
    ],
    name: "getUserAggregatedData",
    outputs: [
      {
        components: [
          { internalType: "address", name: "stakeToken", type: "address" },
          { internalType: "uint256", name: "stakeUserBalance", type: "uint256" },
          {
            components: [
              { internalType: "address", name: "reward", type: "address" },
              { internalType: "uint256", name: "currentReward", type: "uint256" },
            ],
            internalType: "struct DataAggregationHelper.RewardTokenUserData[]",
            name: "rewardsTokenUserData",
            type: "tuple[]",
          },
        ],
        internalType: "struct DataAggregationHelper.StakeTokenUserData[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract IUmbrella", name: "umbrella", type: "address" },
      { internalType: "address", name: "user", type: "address" },
    ],
    name: "getUserBalancesFromRouteTokens",
    outputs: [
      {
        components: [
          { internalType: "address", name: "stakeToken", type: "address" },
          {
            components: [
              { internalType: "enum DataAggregationHelper.TokenType", name: "typeOfToken", type: "uint8" },
              { internalType: "address", name: "token", type: "address" },
              { internalType: "uint256", name: "userBalance", type: "uint256" },
            ],
            internalType: "struct DataAggregationHelper.BalanceOfTokenFromRoute[]",
            name: "balancesOfRouteTokens",
            type: "tuple[]",
          },
        ],
        internalType: "struct DataAggregationHelper.TokenRouteBalances[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "maxRescue",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  { inputs: [], name: "renounceOwnership", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "whoCanRescue",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
] as const;
