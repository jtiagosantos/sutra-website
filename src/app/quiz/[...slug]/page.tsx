import { Header } from "@/layouts/header/header";
import { Main } from "./main";

type PageProps = {
  params: {
    slug: string[];
  }
}

export default function Page({ params }: PageProps) {
  const [pathname] = params.slug;
  const [quizId] = pathname.split('--').reverse();

  return (
    <>
      <Header />
      <Main quizId={quizId} />
    </>
  );
}
