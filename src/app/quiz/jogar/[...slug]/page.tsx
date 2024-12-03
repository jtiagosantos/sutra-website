import { Main } from "./main";

type PageProps = {
  params: {
    slug: string[];
  }
}

export default function Page({ params }: PageProps) {
  const [pathname] = params.slug;
  const [bookName, quizId] = pathname.split('--');

  return <Main bookName={bookName} quizId={quizId} />;
}
