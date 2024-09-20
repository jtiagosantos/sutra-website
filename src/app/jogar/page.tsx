import { auth } from "@/auth";
import { PageComponent } from "./page-component";

export default async function Page() {
  const session = (await auth())!;

  return <PageComponent user={{ email: session.user?.email! }} />
}