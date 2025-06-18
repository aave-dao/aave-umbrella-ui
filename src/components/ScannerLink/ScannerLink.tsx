import { appChains } from "@/configs/wagmi";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { type ComponentProps, type PropsWithChildren } from "react";
import { type Address } from "viem";

const getScannerUrl = (chainId: number) => {
  const chainConfig = appChains.find((chain) => chain.id === chainId);
  return chainConfig?.blockExplorers?.default.url;
};

export type ScannerLinkProps = PropsWithChildren &
  Omit<ComponentProps<typeof Link>, "href"> & {
    address?: Address;
    chainId: number;
  };

export const ScannerLink = ({
  address,
  chainId,
  className,
  target = "_blank",
  children,
  ...props
}: ScannerLinkProps) => {
  const scannerUrl = getScannerUrl(chainId);

  if (!scannerUrl || !address) {
    return children;
  }

  return (
    <Link
      {...props}
      href={`${scannerUrl}/address/${address}`}
      target={target}
      className={cn("hover:underline", className)}
    >
      {children}
    </Link>
  );
};
