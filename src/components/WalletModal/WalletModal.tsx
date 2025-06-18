import { CopyToClipboard } from "@/components/CopyToClipboard/CopyToClipboard";
import { ModalBody, ModalClose, ModalRoot, ModalTitle, ModalTrigger } from "@/components/Modal/Modal";
import { Block, BlocksColumn } from "@/components/ui/Block";
import { Button } from "@/components/ui/Button";
import { Transaction } from "@/components/WalletModal/Transaction";
import { byTimestampDesc } from "@/constants/sorts";
import { useMobileMediaQuery } from "@/hooks/useMediaQuery";
import { useNativeToken } from "@/hooks/useNativeToken";
import { useTransactionsTrackerStore } from "@/providers/TransactionsTrackerProvider/TransactionsTrackerProvider";
import { textCenterEllipsis } from "@/utils/formatting";
import { getScannerUrl } from "@/utils/web3";
import { ExternalLinkIcon } from "lucide-react";
import { ComponentProps, PropsWithChildren, useMemo } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { AssetIcon } from "../AssetIcon/AssetIcon";

export type WalletModalProps = PropsWithChildren<Pick<ComponentProps<typeof ModalRoot>, "open" | "onOpenChange">>;

export const WalletModal = ({ open, onOpenChange, children }: WalletModalProps) => {
  const isMobile = useMobileMediaQuery();
  const { address, chainId, connector } = useAccount();
  const { data } = useNativeToken();
  const { disconnect } = useDisconnect();

  const transactionsStore = useTransactionsTrackerStore((state) => state.store);
  const clearAll = useTransactionsTrackerStore((state) => state.reset);

  const sortedTransactions = useMemo(() => {
    if (!address) {
      return [];
    }
    const transactions = transactionsStore[address];

    return Object.values(transactions || []).toSorted(byTimestampDesc);
  }, [transactionsStore, address]);

  if (!chainId || !address) {
    return null;
  }

  const handleClearAll = () => {
    clearAll();
  };

  const handleDisconnectClick = () => {
    onOpenChange?.(false);
    disconnect();
  };

  return (
    <ModalRoot open={open} onOpenChange={onOpenChange}>
      <ModalTrigger asChild>{children}</ModalTrigger>

      <ModalBody className="w-full max-w-(--mobile-container) md:max-w-[478px]">
        <BlocksColumn>
          <Block elevation={isMobile ? 1 : 2} className="bg-main-50 flex items-center justify-between px-[30px] py-6">
            <ModalTitle className="text-lg font-bold">Wallet</ModalTitle>
            <ModalClose />
          </Block>

          <Block elevation={isMobile ? 1 : 2} className="relative px-[30px] py-6 md:px-10 md:py-10">
            <div className="flex flex-col items-center gap-9">
              <div className="flex flex-col items-center md:gap-6">
                {!!connector?.icon ? (
                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={connector.icon} alt={connector.name} className="size-[72px] md:size-[90px]" />
                    <AssetIcon
                      chainId={chainId}
                      className="absolute right-0 -bottom-1 size-5 border-2 border-white md:size-6"
                    />
                  </div>
                ) : (
                  <AssetIcon chainId={chainId} className="size-[72px] md:size-[90px]" />
                )}

                <div className="flex items-center justify-center gap-1.5">
                  <div className="text-xl font-bold">{textCenterEllipsis(address, 4, 4)}</div>
                  <CopyToClipboard value={address} />
                </div>

                <div className="text-lg">{`${data?.balanceFormatted} ${data?.symbol}`}</div>
              </div>

              <div className="flex w-full flex-col gap-5 md:gap-8">
                <div className="flex items-center justify-between border-b pb-4 md:pb-6">
                  <div className="text-lg font-bold">Transactions</div>
                  <button className="cursor-pointer text-base underline underline-offset-2" onClick={handleClearAll}>
                    Clear all
                  </button>
                </div>

                <div className="flex max-h-[240px] flex-col gap-4 overflow-y-auto md:gap-8">
                  {sortedTransactions.map((transaction) => (
                    <Transaction key={transaction.hash} {...transaction} />
                  ))}
                </div>
              </div>

              <div className="flex w-full flex-col gap-5 md:flex-row md:items-center md:gap-9">
                <Button
                  href={getScannerUrl(chainId, address)}
                  target="_blank"
                  elevation={1}
                  size="lg"
                  className="flex items-center gap-1"
                >
                  All Transactions <ExternalLinkIcon size={14} className="cursor-pointer" />
                </Button>
                <Button elevation={1} size="lg" onClick={handleDisconnectClick}>
                  Disconnect
                </Button>
              </div>
            </div>
          </Block>
        </BlocksColumn>
      </ModalBody>
    </ModalRoot>
  );
};
