import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

type BackButtonProps = {
  title?: string;
}

export const BackButton: FC<BackButtonProps> = ({ title = 'voltar' }) => {
  return (
    <Link
      href="/"
      className="w-fit mx-auto mt-10 text-[#8381D9] flex items-center justify-center gap-[6px] font-heading font-medium text-[18px] hover:underline underline-offset-4"
      prefetch={false}>
      <MoveLeft className="w-5 h-5 pt-[3px]" />
      {title}
    </Link>
  );
}