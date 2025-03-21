import {
  ModalBody,
  ModalClose,
  ModalTitle,
  ModalRoot,
  ModalTrigger,
} from "@/components/Modal/Modal";
import { Button } from "@/components/ui/Button";
import { Block } from "@/components/ui/Block";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import GhostWithUmbrellaImage from "../../../public/images/ghost-with-umbrella.svg";

export const InfoModal = () => {
  return (
    <ModalRoot>
      <ModalTrigger asChild>
        <Button elevation={1} size="lg">
          <span className="flex size-5 flex-col items-center justify-center">
            <span className="bg-main-950 mb-0.5 size-[3.5px] rounded-full dark:bg-white" />
            <span className="bg-main-950 h-3 w-[3.5px] dark:bg-white" />
          </span>
        </Button>
      </ModalTrigger>

      <ModalBody className="w-full max-w-[1000px]">
        <VisuallyHidden>
          <ModalTitle>Umbrella Info</ModalTitle>
        </VisuallyHidden>
        <Block elevation={2} className="relative">
          <ModalClose className="absolute top-4 right-4" />

          <div className="mx-auto flex w-full max-w-[728px] flex-col gap-9 pt-14 pb-[80px]">
            <div className="flex justify-between">
              <h1 className="text-[78px] leading-[6rem] font-bold dark:text-white">
                <span className="block">What is</span>
                <span className="block">Umbrella?</span>
              </h1>
              <GhostWithUmbrellaImage />
            </div>

            <p>
              Umbrella is an Aave system allowing stake Aave aTokens to earn rewards, but accepting
              risk of slashing to cover any deficit accrued on the Aave pools.
            </p>

            <h2 className="text-3xl font-semibold dark:text-white">How does Umbrella work?</h2>

            <div>
              <p>
                As commented, users can stake assets such as aUSDC into Umbrella, and receive
                rewards for taking on slashing risk.
              </p>
              <p className="mt-4">The process involves the following:</p>
              <ul className="my-5 pl-6">
                <li className="relative">
                  <span className="absolute -left-5 font-bold">1.</span>
                  <span className="mr-1 font-bold">Staking:</span>
                  Users deposit their aTokens (e.g., aUSDC) into Umbrella, and receive Umbrella
                  stake aUSDC.
                </li>
                <li className="relative">
                  <span className="absolute -left-5 font-bold">2.</span>
                  <span className="mr-1 font-bold">Rewards Accumulation:</span>
                  While the user has its aUSDC staked on Umbrella, they still earn yield from
                  supplying on Aave, but also additional rewards in one or multiple tokens, which
                  may include AAVE, GHO, or other assets, depending on the pool.
                </li>
                <li className="relative">
                  <span className="absolute -left-5 font-bold">3.</span>
                  <span className="mr-1 font-bold">Claiming rewards:</span>
                  At any point in time, users can claim all rewards accrued.
                </li>
                <li className="relative">
                  <span className="absolute -left-5 font-bold">4.</span>
                  <span className="mr-1 font-bold">
                    Withdrawal process (cooldown and withdrawal window):
                  </span>
                  To withdraw staked assets, users must first initiate a cooldown period that can
                  last for example 20 days, depending on Umbrella’s configuration. Once the cooldown
                  period ends, the user has a withdrawal window to complete the withdrawal, also
                  depending on Umbrella’s configuration, but for example of 2 days.
                </li>
              </ul>
              <p>
                This structured process ensures that withdrawals are orderly and prevents sudden
                spikes in unstaking, which could potentially destabilize the system.
              </p>
            </div>

            <h2 className="text-3xl font-semibold dark:text-white">User Risks</h2>

            <ul className="pl-6">
              <li className="relative mb-4">
                <span className="absolute -left-5 font-bold">&bull;</span>
                This interface is non-custodial: it allows users to connect their wallet
                applications, building transactions to be submitted to the Umbrella smart contracts.
              </li>
              <li className="relative mb-4">
                <span className="absolute -left-5 font-bold">&bull;</span>
                All configurations of Umbrella are based on smart contracts controlled by the Aave
                decentralized governance. This means that over time, aspects like rewards, cooldown
                period, withdrawal window, or even assets available to stake depend solely and
                exclusively on the Umbrella smart contracts, not anyhow on this interface.
              </li>
              <li className="relative mb-4">
                <span className="absolute -left-5 font-bold">&bull;</span>
                The Umbrella system of smart contracts this interface connects is based on a
                principle of risk and reward:{" "}
                <span className="font-bold">
                  if you are a user staking in Umbrella and a deficit is accrued on the connected
                  asset on the Aave pool, you can potentially be slashed.
                </span>{" "}
                By interacting with the Umbrella contract, you explicitly accept this risk and any
                consequences arising from it, including earning rewards as compensation for assuming
                the risk.
              </li>
            </ul>
            <h2 className="text-3xl font-semibold dark:text-white">More information and links</h2>
            <ul className="pl-6">
              <li className="relative mb-4">
                <span className="absolute -left-5 font-bold">&bull;</span>
                Aave Governance forum describing Umbrella
              </li>
              <li className="relative mb-4">
                <span className="absolute -left-5 font-bold">&bull;</span>
                Aave Umbrella smart contracts addresses
              </li>
              <li className="relative mb-4">
                <span className="absolute -left-5 font-bold">&bull;</span>
                Aave Umbrella smart contracts codebase
              </li>
              <li className="relative mb-4">
                <span className="absolute -left-5 font-bold">&bull;</span>
                Aave Umbrella UI codebase
              </li>
            </ul>
          </div>
        </Block>
      </ModalBody>
    </ModalRoot>
  );
};
