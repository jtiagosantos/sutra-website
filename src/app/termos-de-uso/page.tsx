'use client';

import { getNotionPageAction } from '@/actions/get-notion-page-action';
import LogoImage from '@/assets/logo.svg';
import { useAction } from 'next-safe-action/hooks';
import { NotionRenderer } from 'react-notion-x';
import BubbleAnimation from '@/assets/bubble-spinner.svg';
import Link from 'next/link';

export default function Page() {
  const { result, status } = useAction(getNotionPageAction, {
    executeOnMount: {
      input: {
        pageId: '13d5bebcc7c480b490e2d31fb9ab260e',
      },
    },
  });

  const isLoading = ['idle', 'executing'].includes(status);

  return (
    <main className="max-w-[1200px] mx-auto w-full flex flex-col items-start my-10 px-4 font-body text-gray-500 tracking-wide">
      <span className="block w-fit mx-auto">
        <Link href="/">
          <LogoImage />
        </Link>
      </span>

      <h2 className="font-heading text-[22px] mt-8 text-[#8381D9] font-semibold mb-10 w-full text-center">
        Termos de Uso e Condições Gerais
      </h2>

      {isLoading ? (
        <div className="mx-auto w-fit my-[30px]">
          <BubbleAnimation />
        </div>
      ) : (
        <NotionRenderer
          recordMap={result.data!}
          fullPage={false}
          darkMode={false}
        />
      )}
    </main>
  );
}