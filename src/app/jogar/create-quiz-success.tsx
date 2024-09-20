import { PartyPopper, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FC } from "react";

type CreateQuizSuccessProps = {
  onPlay: () => void;
}

export const CreateQuizSuccess: FC<CreateQuizSuccessProps> = ({ onPlay }) => {
  return (
    <>
      <h1 className="font-heading text-3xl text-center mt-8 text-[#8381D9] font-semibold">
        Tudo Pronto!
      </h1>
      <p className="font-body text-base text-gray-500 mt-4">
        Seu quiz foi criado com sucesso! Divirta-se :)
      </p>

      <PartyPopper color="#50B2C0" size={80} strokeWidth={1.7} className="mt-14 mb-[70px]" />

      <Button
        onClick={onPlay}
        className="text-white max-w-[300px] w-full py-3 rounded-xl flex items-center justify-center gap-2 font-body text-[18px] bg-[#50B2C0] hover:scale-110 transition-all duration-300"
      >
        <Zap size={24} />
        Jogar
      </Button>
    </>
  );
}