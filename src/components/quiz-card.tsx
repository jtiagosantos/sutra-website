import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

type QuizCardProps = {
  href: string;
  image: string;
  author: string;
  title: string;
}

export const QuizCard: FC<QuizCardProps> = ({ href, image, author, title }) => {
  return (
    <Link href={href}>
      <div className="min-w-[240px] max-w-[240px] min-h-[245px] bg-white rounded-lg shadow-sm shadow-gray-300 overflow-hidden max-[800px]:max-w-[176px] max-[800px]:min-w-[176px] max-[800px]:max-h-[205px] max-[800px]:min-h-[205px]">
        <div className="w-full h-[180px] relative max-[800px]:h-[140px]">
          <Image
            src={image}
            alt=""
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="w-full p-2">
          <p className="font-body font-normal text-sm text-dimGray overflow-hidden line-clamp-1">{author}</p>
          <p className="font-body font-medium text-sm text-jet overflow-hidden line-clamp-1 mt-[6px]">
            {title}
          </p>
        </div>
      </div>
    </Link>
  );
}