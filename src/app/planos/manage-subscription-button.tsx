import { createPortalSessionAction } from "@/actions/create-portal-session-action";
import { getUserAction } from "@/actions/get-user-action";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { ThreeDots } from "react-loader-spinner";

type ManageSubscriptionButtonProps = {
  user: {
    email: string;
  }
}

export const ManageSubscriptionButton: FC<ManageSubscriptionButtonProps> = ({ user }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleCreatePortal = async () => {
    setIsLoading(true);

    const { data: currentUser } = (await getUserAction({ email: user.email }))!;

    const { data } = (await createPortalSessionAction({
      customerId: currentUser?.user?.customerId!,
      privacyPolicyURL: window.location.origin,
      termsOfServiceURL: window.location.origin,
    }))!;

    if (!data?.url) {
      alert('Erro inesperado ao gerar o link de gerenciamento, tente novamente');
      setIsLoading(false);
      return;
    }

    router.push(data.url);
  }

  return (
    <button
      onClick={handleCreatePortal}
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
      ) : 'Gerenciar Assinatura'}
    </button >
  );
}