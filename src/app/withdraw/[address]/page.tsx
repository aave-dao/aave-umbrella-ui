"use client";

import { WithdrawalForm } from "@/app/withdraw/[address]/components/WithdrawalForm";
import { PageContainer } from "@/components/PageContainer/PageContainer";
import { PageLoader } from "@/components/PageLoader/PageLoader";
import { useAllStkTokens } from "@/hooks/useAllStkTokens";
import { useUmbrellaCooldownData } from "@/hooks/useAllUmbrellaCooldowns/useUmbrellaCooldownData";
import { TxFormProvider } from "@/providers/TxFormProvider/TxFormProvider";
import { useUmbrellaCooldown } from "@/store/dashboard";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";
import { Address } from "viem";

export type WithdrawPageProps = {
  params: Promise<{ address: Address }>;
};

export default function WithdrawPage(props: WithdrawPageProps) {
  const { address } = use(props.params);
  const router = useRouter();

  const { data: stkTokens, isLoading: isAllUmbrellasLoading } = useAllStkTokens();
  const { data: cooldown, isLoading: isCooldownLoading } = useUmbrellaCooldownData(address);
  const status = useUmbrellaCooldown(address);

  const stkToken = stkTokens?.find((token) => token.address === address);

  useEffect(() => {
    if (status !== "withdraw" && status !== "immediate-withdraw") {
      router.push("/");
    }
  }, [router, status]);

  if (isAllUmbrellasLoading || isCooldownLoading) {
    return <PageLoader />;
  }

  if (!stkToken || !cooldown) {
    return null;
  }

  return (
    <PageContainer>
      <TxFormProvider>
        <WithdrawalForm stkToken={stkToken} cooldown={cooldown} />
      </TxFormProvider>
    </PageContainer>
  );
}
