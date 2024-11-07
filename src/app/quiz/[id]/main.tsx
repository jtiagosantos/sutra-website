import { Button } from "@/components/ui/button";
import { Ellipsis, Gamepad2, Share2 } from "lucide-react";
import Image from "next/image";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Link from "next/link";

export const Main = () => {
  return (
    <main className="max-w-[1140px] w-full mx-auto mt-6 mb-10 px-3">
      <section className="w-full flex items-start gap-10 max-[880px]:flex-col max-[880px]:items-center">
        <div className="w-[430px] aspect-square rounded-md overflow-hidden relative max-[970px]:min-w-[352px] max-[456px]:min-w-full max-[456px]:max-w-fit">
          <Image
            src="https://bookquiz.s3.us-east-1.amazonaws.com/covers/ultra-aprendizado-1730739645248.png"
            alt=""
            fill
            style={{ objectFit: 'cover' }}
            quality={100}
          />
        </div>

        <div>
          <div className="w-full flex items-start justify-between gap-3">
            <h2 className="font-heading font-bold text-xl text-davysGray">
              Ultra Aprendizado: Aprenda Mais em Menos Tempo
            </h2>

            <Menubar>
              <MenubarMenu>
                <MenubarTrigger className="bg-[#EAEAEA] rounded-full w-[38px] h-[22px] flex items-center justify-center cursor-pointer">
                  <Ellipsis size={24} className="text-dimGray" />
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem className="flex items-center gap-2 focus:bg-[#8381d9] hover:bg-[#8381d9] focus:text-white hover:text-white transition-all duration-300">
                    <Share2 size={18} />
                    Compartilhar quiz
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>

          <p className="font-body font-medium text-base text-davysGray mt-2">Scott Young</p>

          <span className="bg-dimGray rounded-lg text-white font-body font-normal py-[11px] block w-fit px-5 mt-4">Aprendizado & Criatividade</span>

          <p className="max-w-[664px] w-full mt-5 mb-6 font-body font-normal text-davysGray leading-6">
            Em Ultra-aprendizado, Scott Young desvenda o método para adquirir habilidades complexas em tempo recorde, revolucionando a forma como aprendemos. Ele mostra como dominar competências valiosas por meio de um processo de aprendizado autodirigido, eficiente e intensivo, que vai além do estudo tradicional. Com exemplos reais e técnicas práticas, Young ensina a enfrentar os maiores desafios com estratégias para superar bloqueios e acelerar o progresso. Este guia é ideal para quem busca vencer a concorrência, aprimorar-se rapidamente e impulsionar a carreira, redefinindo o aprendizado como uma habilidade essencial para o sucesso.
          </p>

          <Button
            variant="outline"
            className="text-white text-base bg-tropicalIndigo px-4 py-[9px] font-body border-[2px] border-tropicalIndigo tracking-wider hover:border-tropicalIndigo hover:bg-white hover:text-tropicalIndigo flex flex-row items-center gap-2 rounded-xl transition-all duration-300">
            <Gamepad2 size={24} className="max-[600px]:hidden" />
            Jogar Quiz
          </Button>
        </div>
      </section>

      <section className="w-full max-w-[1464px] mx-auto mt-[80px]">
        <div className="mb-2 flex items-center gap-3">
          <h2 className="font-heading font-bold text-[22px] text-davysGray leading-[22px] max-[800px]:text-[18px]">
            🎯 Quizzes relacionados
          </h2>
        </div>
        <div className="w-full overflow-x-auto scrollbar-thin px-[1px]">
          <div className="flex items-center gap-3 w-max mb-2">
            {[...new Array(10)].map((_, index) => (
              <Link href="/quiz/jogar/id-do-quiz" key={index}>
                <div className="max-w-[240px] min-h-[270px] bg-white rounded-lg shadow-sm shadow-gray-300 overflow-hidden max-[800px]:max-w-[200px] max-[800px]:max-h-[230px] max-[800px]:min-h-[230px]">
                  <div className="w-full h-[180px] relative max-[800px]:h-[140px]">
                    <Image
                      src="https://bookquiz.s3.us-east-1.amazonaws.com/covers/ultra-aprendizado-1730739645248.png"
                      alt=""
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="w-full p-2">
                    <p className="font-body font-normal text-sm text-dimGray">Scott Young</p>
                    <p className="font-body font-medium text-sm text-jet overflow-hidden line-clamp-2 mt-[6px]">
                      Ultra Aprendizado: Aprenda Mais em Menos Tempo
                      do autor Scott Young
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}