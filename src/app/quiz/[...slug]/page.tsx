import { Header } from "@/layouts/header/header";
import { Main } from "./main";

type PageProps = {
  params: {
    slug: string[];
  }
}

export default function Page({ params }: PageProps) {
  const [pathname] = params.slug;
  const [_, quizId] = pathname.split('--');

  return (
    <>
      <Header />
      <Main quizId={quizId} />
    </>
  );
}
