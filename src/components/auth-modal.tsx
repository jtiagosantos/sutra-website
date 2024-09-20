'use client';

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import LogoImage from '@/assets/logo.svg'
import { GoogleIcon } from "@/components/icons/google";
import { FC, useState } from "react";
import { signIn } from 'next-auth/react';
import { ThreeDots } from "react-loader-spinner";

type AuthModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  redirectTo?: string;
};

export const AuthModal: FC<AuthModalProps> = ({ open, onOpenChange, redirectTo = '/' }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSign = async () => {
    setIsLoading(true);
    await signIn('google', { redirectTo });
    setIsLoading(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white py-8">
        <div className="w-full flex flex-col items-center">
          <LogoImage />
          <div className="mt-2 mb-4">
            <p className="font-body text-gray-600 text-base text-center">Gamifique sua leitura</p>
            <p className="font-body text-gray-600 text-base text-center my-[2px]">Teste sua paixão pelos livros</p>
            <p className="font-body text-gray-600 text-base text-center">Participe da classificação</p>
          </div>
          <Button
            disabled={isLoading}
            onClick={handleSign}
            variant="outline"
            className="w-[210px] text-[#8381D9] text-base px-4 py-[10px] font-body bg-transparent border-[2px] border-[#8381D9] hover:border-white hover:bg-[#8381D9] hover:text-white tracking-wider gap-2 flex flex-row items-center rounded-xl transition-all duration-300 group">
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
}
