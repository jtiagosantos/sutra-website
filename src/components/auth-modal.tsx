'use client';

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import LogoImage from '@/assets/logo.svg'
import { GoogleIcon } from "@/components/icons/google";
import { FC } from "react";

type AuthModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const AuthModal: FC<AuthModalProps> = ({ open, onOpenChange }) => {
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
            variant="outline"
            className="text-[#8381D9] text-base px-4 py-[10px] font-body bg-transparent border-[2px] border-[#8381D9] hover:border-white hover:bg-[#8381D9] hover:text-white tracking-wider gap-2 flex flex-row items-center rounded-xl transition-all duration-300 group">
            <GoogleIcon className="h-5 w-5 group-hover:hidden" />
            <GoogleIcon color="white" className="h-5 w-5 hidden group-hover:block" />
            Entrar com Google
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
