'use client';

import { createCheckoutSessionAction } from "@/actions/create-checkout-session-action";
import { getUserAction } from "@/actions/get-user-action";
import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { ThreeDots } from "react-loader-spinner";

const PRICE_ID = 'price_1Q1aMHJSJfF3PcrgibBuJDxL';

type CheckoutButtonProps = {
  user: {
    email: string;
  }
}

export const CheckoutButton: FC<CheckoutButtonProps> = ({ user }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    setIsLoading(true);

    const { data: currentUser } = (await getUserAction({ email: user.email }))!;

    const { data } = (await createCheckoutSessionAction({
      customerId: currentUser?.user?.customerId!,
      priceId: PRICE_ID,
      cancelURL: window.location.href,
      successURL: `${window.location.origin}/pagamento/processamento`,
    }))!;

    if (!data?.url) {
      alert('Erro inesperado ao gerar o link de pagamento, tente novamente');
      setIsLoading(false);
      return;
    }

    router.push(data.url);
  }

  return (
    <button
      onClick={handleSubscribe}
      disabled={isLoading}
      className="w-full bg-yellow-500 font-body font-medium text-[18px] text-white tracking-wide py-1 flex justify-center disabled:pointer-events-none disabled:opacity-40"
    >
      {isLoading ? (
        <ThreeDots
          height="27"
          width="40"
          radius="9"
          color="#fff"
          ariaLabel="three-dots-loading"
          visible={true}
        />
      ) : 'Escolher Plano'}
    </button >
  );
}