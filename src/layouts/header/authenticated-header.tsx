import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { auth } from '@/auth'
import { SignoutButton } from "./signout-button";
import { Score } from "./score";

export const AuthenticatedHeader = async () => {
  const session = (await auth())!;

  const getFallback = () => {
    return session.user?.name?.split(' ').map((part) => part[0]).join('').toUpperCase();
  }

  return (
    <>
      <div className="w-fit text-[#8381D9] text-base px-3 py-[2px] font-body bg-transparent border-[2px] border-[#8381D9] tracking-wider flex flex-row items-center gap-2 rounded-xl">
        <SignoutButton />
        <Avatar>
          <AvatarImage className='scale-75 rounded-full border-[3px] border-[#8381D9]' src={session.user?.image ?? ''} alt="" />
          <AvatarFallback>{getFallback()}</AvatarFallback>
        </Avatar>
        {session.user?.name}
      </div>

      <Score user={{ email: session.user?.email! }} />
    </>
  );
}