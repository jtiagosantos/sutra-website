'use client';

import { useUser } from '@/hooks/use-user';
import BubbleAnimation from '@/assets/bubble-spinner.svg';
import { BackButton } from '@/components/back-button';

export const Main = () => {
  const { user, loading } = useUser();

  return (
    <main className="max-w-[1464px] w-full mx-auto mt-6 mb-10 px-3">
      {loading ? (
        <div className="mx-auto w-fit my-[30px]">
          <BubbleAnimation />
        </div>
      ) : (
        <>
          <div className="w-full mx-auto">
            <p className="font-body font-medium text-base text-dimGray">
              {user ? `Olá, ${user!.firstName} ${user!.lastName}` : 'Olá, visitante'} :)
            </p>
            <p className="max-w-[330px] font-body font-medium text-base text-moonstone leading-[22px] mt-1">
              Confira as intruções para tirar o máximo de proveito da plataforma e se divertir
            </p>
          </div>
        </>
      )}

      <div className="max-w-[1000px] w-full mx-auto mt-10 flex flex-col items-center gap-7 max-[480px]:items-start">
        <div>
          <p className="w-full font-body font-normal text-davysGray text-base text-left">
            1. Após se autenticar com a sua conta do Google, você terá acesso ao menu do usuário (no menu superior).
            Por meio dele você poderá ver seu avatar e, clicando nele, você terá acesso a algumas opções como Meus pontos, Minhas
            medalhas, Ativar/Desativar lembrete diário e Sair da conta.
          </p>
          <p className="w-full font-body font-normal text-davysGray text-base text-left">
            1.1. Em Meus pontos, você pode ver a quantidade de pontos que você possui na plataforma.
          </p>
          <p className="w-full font-body font-normal text-davysGray text-base text-left">
            1.2. Em Minhas medalhas, você pode ver as medalhas que você já conquistou ao longo da sua jornada na plataforma.
          </p>
          <p className="w-full font-body font-normal text-davysGray text-base text-left">
            1.3. Em Ativar/Desativar lembrete diário, você pode ativar ou desativar o lembrete diário que você recebe para jogar um quiz.
          </p>
          <p className="w-full font-body font-normal text-davysGray text-base text-left">
            1.4. Em Sair da conta, você pode sair da sua conta e deixar de estar autenticado na plataforma.
          </p>
        </div>
        <p className="font-body font-normal text-davysGray text-base text-left">
          2. Ao clicar no botão "Jogar Quiz" (no menu superior), ou na opção "Quiz Personalizado" (na início da página inicial),
          você será redirecionado para a página de criação de quiz. Basta informar o nome do livro, o nome do autor e a quantidade de perguntas
          para criarmos um quiz personalizado para você.
        </p>
        <p className="font-body font-normal text-davysGray text-base text-left">
          3. Ao acessar pelo desktop, temos um campo de "Pesquise no Sutra". Pelo mobile, esse mesmo campo fica dentro do menu lateral (acessado pelo ícone de três barras no menu superior).
          Por meio dele você pode buscar por quizzes por meio do nome do livro,
          nome do autor ou categoria.
          Basta digitar o que você deseja buscar e pressionar a tecla enter (no desktop) ou pressionar o botão de confirmar (no mobile).
        </p>
        <p className="font-body font-normal text-davysGray text-base text-left">
          4. Na pagina inicial, temos os quizzes já criados por outros usuários da plataforma. Eles estão organizados em recentes, os mais jogados e
          os filtrados por categorias. Ao clicar em um dos quizzes, você será redirecionado para a página de detalhes do quiz,
          onde você poderá ver os detalhes do livro do quiz, compartilhar e jogar o quiz.
        </p>
        <p className="font-body font-normal text-davysGray text-base text-left">
          5. Na página explorar, temos também os quizzes já criados por outros usuários da plataforma, mas sem uma organização prévia.
          Aqui você pode filtrar por categoria, pesquisar por nome de livro, por exemplo, e ordenar por recentes ou mais antigos.
          Para remover um filtro ou uma ordenação, basta clicar na opção em verde logo abaixo dos campos seletores.
          No final da página há um botão "Carregar mais" para carregar mais resultados.
          Ao clicar em um dos quizzes, você será redirecionado para a página de detalhes do quiz,
          onde você poderá ver os detalhes do livro do quiz, compartilhar e jogar o quiz.
        </p>
        <p className="w-full font-body font-normal text-davysGray text-base text-left">
          6. Na página de classificação, temos os 10 usuários com mais pontos dentro da plataforma.
        </p>
        <p className="w-full font-body font-normal text-davysGray text-base text-left">
          7. Na página "Seja Premium", temos os planos de assinatura para usuários premium dentro da plataforma.
        </p>
      </div>

      <BackButton />
    </main>
  );
}
