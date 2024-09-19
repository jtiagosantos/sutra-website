import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Crown } from "lucide-react";

export const CreateQuizForm = () => {
  return (
    <>
      <h1 className="font-heading text-3xl text-center mt-8 text-[#8381D9] font-semibold">
        Vamos Jogar?
      </h1>
      <p className="font-body text-base text-gray-500 mt-4">
        Forneça as informações abaixo para criarmos o seu quiz
      </p>

      <form className="max-w-[340px] w-full mt-10">
        <div className="w-full flex flex-col gap-5">
          <div className="w-full space-y-0.5">
            <Label htmlFor="bookName" className="font-body text-base text-gray-600">Nome do livro</Label>
            <Input
              type="text"
              id="bookName"
              placeholder="Digite o nome do livro"
              className="w-full"
            />
          </div>
          <div className="w-full space-y-0.5">
            <Label htmlFor="authorName" className="font-body text-base text-gray-600">Nome do autor</Label>
            <Input
              type="text"
              id="authorName"
              placeholder="Digite o nome do autor"
              className="w-full"
            />
          </div>
          <div className="w-full space-y-0.5">
            <Label htmlFor="quantifyOfQuestions" className="font-body text-base text-gray-600">Quantidade de perguntas</Label>
            <Select>
              <SelectTrigger className="h-11" id="quantifyOfQuestions">
                <SelectValue placeholder="Selecione a quantidade de perguntas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 perguntas</SelectItem>
                <SelectItem value="10" disabled={true}>
                  <span>10 perguntas </span>
                  <span className="inline-flex items-center text-yellow-500">(
                    <Crown size={20} className="mr-1" />
                    Premium
                    )</span>
                </SelectItem>
                <SelectItem value="15" disabled={true}>
                  <span>15 perguntas </span>
                  <span className="inline-flex items-center text-yellow-500">(
                    <Crown size={20} className="mr-1" />
                    Premium
                    )</span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          variant="outline"
          disabled={true}
          className="mt-10 w-full text-[#8381D9] text-base px-4 py-[10px] font-body bg-transparent border-[2px] border-[#8381D9] tracking-wider hover:border-white hover:bg-[#8381D9] hover:text-white flex flex-row items-center gap-2 rounded-xl transition-all duration-300">
          Começar
        </Button>
      </form>
    </>
  );
}