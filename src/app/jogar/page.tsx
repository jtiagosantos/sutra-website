
import { CreateQuizLoading } from "./creating-quiz-loading";
import { CreateQuizSuccess } from "./create-quiz-success";
import { CreateQuizForm } from "./create-quiz-form";
import { CreateQuizError } from "./create-quiz-error";
import { Quiz } from "./quiz";

export default function Page() {
  return (
    <main className="w-full flex flex-col items-center mt-10 mb-5 px-4">
      {/* <CreateQuizLoading /> */}

      {/* <CreateQuizSuccess /> */}

      {/* <CreateQuizError /> */}

      {/* <CreateQuizForm /> */}

      <Quiz />
    </main>
  );
}