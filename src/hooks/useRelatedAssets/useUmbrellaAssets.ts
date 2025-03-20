import { useUmbrellaAddresses } from "@/hooks/useUmbrellaAddresses";
import { skipToken, useQuery } from "@tanstack/react-query";
import { config } from "@/configs/wagmi";
import { UMBRELLA_ABI } from "@/abis/umbrella";
import { readContract } from "@wagmi/core";
import { Address } from "viem";
import { STATA_ABI } from "@/abis/stata";
import { ONE_DAY } from "@/constants/time";
import { useMarketStore } from "@/providers/MarketProvider/MarketContext";
import { ChainId } from "@/types/market";
import { UmbrellaAssetsDictionary } from "@/types/addressesDictionary";

const readUmbrellaAsset = (address: Address, chainId: ChainId) =>
  readContract(config, {
    chainId,
    address,
    abi: UMBRELLA_ABI,
    functionName: "asset",
  });

const fetchRelatedUmbrellaAssets = async ({
  chainId,
  umbrellaAddresses,
}: {
  chainId: ChainId;
  umbrellaAddresses: Address[];
}) => {
  const relatedUmbrellaAssets: Record<Address, UmbrellaAssetsDictionary> = {};

  try {
    const stataOrUnderlyingAssets = await Promise.all(
      umbrellaAddresses.map((adr) => readUmbrellaAsset(adr, chainId)),
    );
    await Promise.all(
      stataOrUnderlyingAssets.map(async (stataOrUnderlyingAddress, index) => {
        const umbrellaAddress = umbrellaAddresses[index];

        try {
          const stataAsset = stataOrUnderlyingAddress;

          // For unknown reasons separate contract calls produce fewer requests to chain
          // comparing to readContracts function
          const [underlyingAsset, aTokenAsset] = await Promise.all([
            readContract(config, {
              chainId,
              address: stataAsset,
              abi: STATA_ABI,
              functionName: "asset",
            }),
            readContract(config, {
              chainId,
              address: stataAsset,
              abi: STATA_ABI,
              functionName: "aToken",
            }),
          ]);

          relatedUmbrellaAssets[umbrellaAddress] = {
            underlying: underlyingAsset,
            aToken: aTokenAsset,
            stataToken: stataAsset,
          };
        } catch (error) {
          const underlyinAsset = stataOrUnderlyingAddress;
          relatedUmbrellaAssets[umbrellaAddress] = {
            underlying: underlyinAsset,
          };
        }
      }),
    );

    return relatedUmbrellaAssets;
  } catch (error) {
    // TODO Handle this error globally or return an empty dictionary
    throw new Error("Could not fetch related Umbrella assets");
  }
};

export const useUmbrellaAssets = () => {
  const { chainId } = useMarketStore((state) => state.market);
  const { data: umbrellaAddresses } = useUmbrellaAddresses();

  return useQuery({
    queryFn: umbrellaAddresses
      ? () =>
          fetchRelatedUmbrellaAssets({ chainId, umbrellaAddresses: umbrellaAddresses as Address[] })
      : skipToken,
    queryKey: ["umbrellaAssets", umbrellaAddresses],
    gcTime: ONE_DAY,
    staleTime: ONE_DAY,
  });
};
