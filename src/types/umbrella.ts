import { Address } from "viem";

export type UmbrellaStakeTokenConfig = {
  stakeToken: {
    address: Address;
    price: number;
    latestAnswer: bigint;
    name: string;
    symbol: string;
    decimals: number;
  };
  totalAssets: bigint;
  totalSupply: bigint;
  cooldown: number;
  unstakeWindow: bigint;
};

export type UmbrellaRewardConfig = {
  reward: {
    address: Address;
    price: number;
    latestAnswer: bigint;
    name: string;
    symbol: string;
    decimals: number;
  };
  maxEmissionPerSecond: bigint;
  distributionEnd: bigint;
};

export type UmbrellaRewardsControllerConfig = {
  targetLiquidity: bigint;
  rewardConfigs: UmbrellaRewardConfig[];
};

export type UmbrellaConfig = {
  reserve: Address;
  deficitOffset: bigint;
  pendingDeficit: bigint;
};

export type UmbrellaData = {
  stakeTokenConfig: UmbrellaStakeTokenConfig;
  rewardsControllerConfigs: UmbrellaRewardsControllerConfig;
  umbrellaConfig: UmbrellaConfig;
};
