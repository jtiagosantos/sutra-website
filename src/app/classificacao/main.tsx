'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { MoveLeft } from 'lucide-react';
import { getLeaderboardAction } from '@/actions/get-leaderboard';
import { useAction } from 'next-safe-action/hooks';
import BubbleAnimation from '@/assets/bubble-spinner.svg';
import { useUser } from '@/hooks/use-user';

type User = {
  score: number;
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
};

export const Main = () => {
  const { result, isPending, status } = useAction(getLeaderboardAction, {
    executeOnMount: {},
  });
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
              Confira a classificação dos top 10 usuários com mais pontos na plataforma
            </p>
          </div>
        </>
      )}

      {(isPending || status !== 'hasSucceeded') ? (
        <div className="my-[100px] w-fit mx-auto">
          <BubbleAnimation />
        </div>
      ) : (
        <Table className="max-w-[700px] mx-auto mt-10">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] text-left">Posição</TableHead>
              <TableHead className="w-[100px] text-center">Avatar</TableHead>
              <TableHead className="w-[200px] text-center">Nome de Usuário</TableHead>
              <TableHead className="text-right">Pontuação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {result.data?.leaderboard.map((user: User, index: number) => (
              <TableRow key={user.id}>
                {index < 3 ? (
                  <TableCell className="font-medium text-left px-1 text-xl">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                  </TableCell>
                ) : (
                  <TableCell className="font-medium text-left px-[14px]">
                    {index + 1}
                  </TableCell>
                )}
                <TableCell className="flex justify-center">
                  <Avatar>
                    <AvatarImage
                      className="scale-[70%] rounded-full border-[3px] border-[#8381D9]"
                      src={user.avatar}
                      alt={user.firstName.concat(' ').concat(user.lastName)}
                    />
                    <AvatarFallback>
                      {user.firstName[0]
                        .toUpperCase()
                        .concat(user.lastName[0].toUpperCase())}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="text-center">
                  {user.firstName.concat(' ').concat(user.lastName)}
                </TableCell>
                <TableCell className="text-right text-[#8381D9] px-1">
                  {user.score}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Link
        href="/"
        className="w-full mt-10 text-[#8381D9] flex items-center justify-center gap-[6px] font-heading font-medium text-[18px] hover:underline hover:text-accent underline-offset-4"
        prefetch={false}>
        <MoveLeft className="w-5 h-5 pt-[3px]" />
        voltar
      </Link>
    </main>
  );
}
