'use client';

import { Session } from "next-auth";
import { FC } from "react";
import { Score } from './score';
import { User } from './user';
import { useAction } from "next-safe-action/hooks";
import { getUserAction } from "@/actions/get-user-action";
import { Oval } from "react-loader-spinner";

type AuthenticatedHeaderContentProps = {
  session: Session;
};

export const AuthenticatedHeaderContent: FC<AuthenticatedHeaderContentProps> = ({ session }) => {
  const { result, isPending, status } = useAction(getUserAction, {
    executeOnMount: {
      input: {
        email: session?.user?.email!,
      },
    },
  });

  if (isPending || status !== 'hasSucceeded') {
    return (
      <>
        <Oval
          visible={true}
          height="47"
          width="47"
          color="#8381d9"
          ariaLabel="oval-loading"
          secondaryColor="#e5e7eb "
          strokeWidth={4.5}
        />
        <Oval
          visible={true}
          height="47"
          width="47"
          color="#8381d9"
          ariaLabel="oval-loading"
          secondaryColor="#e5e7eb "
          strokeWidth={4.5}
        />
      </>
    )
  }

  return (
    <>
      <Score score={result.data?.user?.score!} />
      <User
        email={result.data?.user?.email!}
        avatar={result.data?.user?.avatar!}
        firstName={result.data?.user?.firstName!}
        lastName={result.data?.user?.lastName!}
        score={result.data?.user?.score!}
        level={result.data?.user?.level!}
        activeDailyRemainder={result.data?.user?.preferences?.active_daily_reminder!}
      />
    </>
  );
}