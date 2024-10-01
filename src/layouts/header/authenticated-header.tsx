import { auth } from '@/auth';
import { AuthenticatedHeaderContent } from './authenticated-header-content';

export const AuthenticatedHeader = async () => {
  const session = (await auth())!;

  return <AuthenticatedHeaderContent session={session} />;
};
