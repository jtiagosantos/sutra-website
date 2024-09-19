import { RotateCw, ZapOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CreateQuizError = () => {
  return (
    <>
      <h1 className="font-heading text-3xl text-center mt-8 text-[#8381D9] font-semibold">
        Ops! Algo deu errado
      </h1>
      <p className="font-body text-base text-gray-500 mt-4">
        Ocorreu um erro ao criar o seu quiz, tente novamente.
      </p>

      <ZapOff color="#50B2C0" size={80} strokeWidth={1.7} className="mt-14 mb-[80px]" />

      <Button className="text-white max-w-[300px] w-full py-3 rounded-xl flex items-center justify-center gap-2 font-body text-[18px] bg-[#50B2C0] hover:scale-110 transition-all duration-300">
        <RotateCw size={24} />
        Tentar novamente
      </Button>
    </>
  );
}