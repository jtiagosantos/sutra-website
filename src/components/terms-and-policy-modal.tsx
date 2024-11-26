'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "./ui/button";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { ThreeDots } from "react-loader-spinner";
import { useEffect, useState } from "react";
import { useUser } from "@/hooks/use-user";
import { updateUserPreferencesAction } from "@/actions/update-user-preferences-action";

export const TermsAndPolicyModal = () => {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAcceptTermsAndPolicy = async () => {
    setIsLoading(true);

    await updateUserPreferencesAction({
      id: user!.id,
      preferences: {
        accept_terms_and_policy: true,
      },
    });

    setIsLoading(false);

    window.location.reload();
  }

  useEffect(() => {
    if (!!user && user.acceptTermsAndPolicy === false) {
      setOpen(true);
    }
  }, [user]);

  return (
    <Dialog open={open} onOpenChange={() => window.location.reload()}>
      <DialogContent className="bg-white py-8" showClose={false}>
        <DialogHeader>
          <DialogTitle>Termos de Uso & Política de Privacidade</DialogTitle>
          <DialogDescription>
            Nossos termos de uso e política de privacidade foram definidos.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2">
          <p className="font-body text-gray-600 text-base text-start">
            Por favor, leia atentamente os nossos termos de uso e a política de privacidade antes de continuar usando nossos serviços.
          </p>

          <div className="mt-4 flex flex-col gap-2">
            <Link href="/termos-de-uso" target='_blank' rel="noopener noreferrer">
              <Button variant="outline" className="w-full border border-gray-400 p-2 font-body font-normal text-gray-600">
                Ler termos de uso
                <ExternalLink size={20} className="ml-2" />
              </Button>
            </Link>
            <Link href="/politica-de-privacidade" target='_blank' rel="noopener noreferrer">
              <Button variant="outline" className="w-full border border-gray-400 p-2 font-body font-normal text-gray-600">
                Ler política de privacidade
                <ExternalLink size={20} className="ml-2" />
              </Button>
            </Link>
          </div>

          <Button
            variant="outline"
            disabled={isLoading}
            onClick={handleAcceptTermsAndPolicy}
            className="min-w-[145px] mx-auto mt-6 text-white text-base bg-tropicalIndigo px-4 py-[9px] font-body border-[2px] border-tropicalIndigo tracking-wider flex flex-row items-center gap-2 rounded-xl max-[600px]:text-sm">
            {!isLoading ? 'Li e Concordo' : (
              <ThreeDots
                height="24"
                width="40"
                radius="9"
                color="#fff"
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