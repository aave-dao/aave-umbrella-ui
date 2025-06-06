import { useMarketChain } from "@/hooks/useMarketChain";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";

export type ExplorerLinkProps = { hash: string };

export const ExplorerLink = ({ hash }: ExplorerLinkProps) => {
  const chain = useMarketChain();

  return (
    <Link
      href={`${chain.blockExplorers?.default.url}/tx/${hash}`}
      target="_blank"
      className="text-main-500 flex cursor-pointer items-center gap-1 text-sm"
    >
      <span>Show in Explorer</span>
      <ExternalLinkIcon size={14} />
    </Link>
  );
};
