'use client';

import LogoImage from '@/assets/logo.svg';
import BubbleAnimation from '@/assets/bubble-spinner.svg';
import { MoveRight, PartyPopper } from 'lucide-react';
import Link from 'next/link';
import { SessionProvider, useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import { getUserAction } from '@/actions/get-user-action';

const ONE_SECOND = 1000;

const PageComponent = () => {
  const session = useSession();
  const [successfulPayment, setSuccessfulPayment] = useState<boolean | undefined>(undefined);
  const pollingRef = useRef<NodeJS.Timeout>();
  const fetchingUser = useRef(false);

  const cancelPolling = () => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = undefined;
    }
  };

  const handleFetchUser = async () => {
    if (fetchingUser.current) return;

    fetchingUser.current = true;

    try {
      const { data } = (await getUserAction({ email: session.data?.user?.email! }))!;

      if (data?.user?.subscription?.status === 'ACTIVE') {
        cancelPolling();
        setSuccessfulPayment(true);
      }
    } finally {
      fetchingUser.current = false;
    }
  }

  useEffect(() => {
    if (session.data?.user?.email) {
      pollingRef.current = setInterval(() => {
        handleFetchUser();
      }, ONE_SECOND);
    }

    return () => {
      clearInterval(pollingRef.current);
    };
  }, [session]);

  return (
    <main className="w-full flex flex-col items-center mt-10 mb-5 px-4">
      <LogoImage />

      {successfulPayment === true && (
        <h1 className="font-heading text-2xl text-center mt-4 text-[#8381D9] font-semibold">
          Pagamento realizado com sucesso!
        </h1>
      )}

      {successfulPayment === undefined && (
        <p className="font-body text-base text-gray-500 mt-4">
          Estamos processando seu pagamento, aguarde...
        </p>
      )}

      <div className="mt-[70px]">
        {successfulPayment === undefined ? <BubbleAnimation /> : (
          <PartyPopper
            color="#8381D9"
            size={80}
            strokeWidth={1.7}
          />
        )}
      </div>

      {successfulPayment === true && (
        <Link
          href="/"
          className="mt-10 text-[#8381D9] w-full flex items-center justify-center gap-[6px] font-heading font-medium text-[18px] hover:underline hover:text-accent underline-offset-4"
          prefetch={false}>
          Continuar
          <MoveRight className="w-5 h-5 pt-[3px]" />
        </Link>
      )}
    </main>
  );
}

export default function Page() {
  return (
    <SessionProvider>
      <PageComponent />
    </SessionProvider>
  );
}