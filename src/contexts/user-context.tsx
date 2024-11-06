import { createContext, FC, PropsWithChildren, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getUserAction } from "@/actions/get-user-action";

type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  score: number;
  level: number;
  activeDailyRemainder: boolean;
}

type UserContextProps = {
  user: User | null;
  setUser: (user: User | null) => void;
  progress?: number;
  setProgress: (progress: number) => void;
  loading: boolean;
};

export const UserContext = createContext<UserContextProps | null>(null);

export const UserProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [progress, setProgress] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
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
      });
    }
  }

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
      setUser,
      progress,
      setProgress,
      loading: loading,
    }}>
      {children}
    </UserContext.Provider>
  );
}