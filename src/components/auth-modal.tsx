'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import LogoImage from '@/assets/logo.svg';
import { GoogleIcon } from '@/components/icons/google';
import { FC, useState } from 'react';
import { signIn } from 'next-auth/react';
import { ThreeDots } from 'react-loader-spinner';
import { Checkbox } from './ui/checkbox';
import Link from 'next/link';

type AuthModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  redirectTo?: string;
};

export const AuthModal: FC<AuthModalProps> = ({
  open,
  onOpenChange,
  redirectTo = '/',
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSign = async () => {
    if (!checked) {
      setShowError(true);
      return;
    }

    setIsLoading(true);
    await signIn('google', { redirectTo });
    setIsLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white py-8">
        <div className="w-full flex flex-col items-center">
          <LogoImage />

          <div className="mt-2 mb-8">
            <p className="font-body text-gray-600 text-base text-center">
              Gamifique sua leitura
            </p>
            <p className="font-body text-gray-600 text-base text-center my-[2px]">
              Teste sua paixão pelos livros
            </p>
            <p className="font-body text-gray-600 text-base text-center">
              Descubra novos títulos
            </p>
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Checkbox
                id="terms-and-policy"
                onCheckedChange={(checked) => {
                  if (showError) {
                    setShowError(false);
                  }
                  if (typeof checked === 'boolean') {
                    setChecked(checked);
                  }
                }}
              />
              <label
                htmlFor="terms-and-policy"
                className="text-sm font-medium leading-4 font-body text-gray-500"
              >
                Eu li e concordo com os{' '}
                <Link href="/termos-de-uso" target='_blank' rel="noopener noreferrer" className="font-body text-tropicalIndigo underline underline-offset-2">
                  Termos de Uso
                </Link>
                {' e '}
                <Link href="/politica-de-privacidade" target='_blank' rel="noopener noreferrer" className="font-body text-tropicalIndigo underline underline-offset-2">
                  Política de Privacidade
                </Link>
              </label>
            </div>

            {showError && (
              <span className="text-red-400 font-body text-xs font-medium block mt-[-12px] mb-3 w-full text-start">* Campo obrigatório</span>
            )}
          </div>

          <Button
            disabled={isLoading}
            onClick={handleSign}
            variant="outline"
            className="w-[210px] text-tropicalIndigo text-base px-4 py-[10px] font-body bg-transparent border-[2px] border-tropicalIndigo hover:border-white hover:bg-tropicalIndigo hover:text-white tracking-wider gap-2 flex flex-row items-center rounded-xl transition-all duration-300 group">
            {!isLoading ? (
              <>
                <GoogleIcon className="h-5 w-5 group-hover:hidden" />
                <GoogleIcon color="white" className="h-5 w-5 hidden group-hover:block" />
                Entrar com Google
              </>
            ) : (
              <ThreeDots
                height="24"
                width="40"
                radius="9"
                color="#8381D9"
                ariaLabel="three-dots-loading"
                visible={true}
              />
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
