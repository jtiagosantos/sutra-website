import { createContext, FC, PropsWithChildren, useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getUserAction } from "@/actions/get-user-action";
import { SubscriptionStatus } from "@prisma/client";

type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  score: number;
  level: number;
  activeDailyRemainder: boolean;
  subscription: {
    status: SubscriptionStatus;
  }
}

type UserContextProps = {
  user: User | null;
  progress?: number;
  loading: boolean;
  forceRefetchProgress: boolean;
  setUser: (user: User | null) => void;
  setProgress: (progress: number) => void;
  refetchUser: () => void;
  setForceRefetchProgress: (forceRefetchProgress: boolean) => void;
};

export const UserContext = createContext<UserContextProps | null>(null);

export const UserProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [progress, setProgress] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [forceRefetchProgress, setForceRefetchProgress] = useState(false);

  const fetchUser = useCallback(async () => {
    const response = await getUserAction({
      email: session!.user!.email!,
    });

    if (response?.data?.user) {
      setUser({
        id: response.data.user.id,
        email: response.data.user.email,
        firstName: response.data.user.firstName,
        lastName: response.data.user.lastName,
        avatar: response.data.user.avatar,
        score: response.data.user.score,
        level: response.data.user.level,
        activeDailyRemainder: response.data.user.preferences.active_daily_reminder,
        subscription: {
          status: response.data.user.subscription.status,
        },
      });
    }
  }, [session]);

  const refetchUser = useCallback(async () => {
    setLoading(true);
    await fetchUser();
    setForceRefetchProgress(true);
    setLoading(false);
  }, [session]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchUser().then(() => setLoading(false));
    } else if (status === 'loading') {
      setLoading(true);
    } else if (status === 'unauthenticated') {
      setUser(null);
      setLoading(false);
    }
  }, [session]);

  return (
    <UserContext.Provider value={{
      user,
      progress,
      loading: loading,
      forceRefetchProgress,
      setUser,
      setProgress,
      refetchUser,
      setForceRefetchProgress,
    }}>
      {children}
    </UserContext.Provider>
  );
}