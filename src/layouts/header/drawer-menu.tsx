import { Input } from "@/components/ui/input";
import clsx from "clsx";
import { AlignJustify, House, LibraryBig, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import LogoImage from '@/assets/logo.svg';
import { FC, FormEvent, useRef } from "react";
import { useUser } from "@/hooks/use-user";

export const DrawerMenu = () => {
  const pathname = usePathname();
  const { user } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get('busca');
  const labelRef = useRef<HTMLLabelElement>(null);

  const handleSearch = (event: FormEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const searchValue = formData.get('busca');

    labelRef.current?.click();

    if (!!searchValue) {
      router.push(`/explorar/pesquisar?busca=${searchValue}`);
    }
  }

  return (
    <div className="drawer w-fit hidden max-[1000px]:block">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label htmlFor="my-drawer" className="drawer-button">
          <AlignJustify size={28} className="text-dimGray max-[600px]:hidden" />
          <AlignJustify size={24} className="text-dimGray hidden max-[600px]:block" />
        </label>
      </div>
      <div className="drawer-side z-50">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="bg-white min-h-full w-[50%] p-4 max-[700px]:w-[70%] max-[500px]:w-full">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <label htmlFor="my-drawer" ref={labelRef}>
            <X size={28} className="text-dimGray mt-2 max-[600px]:hidden" />
            <X size={24} className="text-dimGray mt-2 hidden max-[600px]:block" />
          </label>

          <div className="w-full mt-3">
            <div className="w-full flex justify-center mb-6">
              <Link href="/" className="w-fit block relative">
                <LogoImage />
                <h1 className="absolute text-transparent">Sutra</h1>
              </Link>
            </div>

            <form onSubmit={handleSearch} className="w-full mb-7">
              <Input
                type="text"
                name="busca"
                defaultValue={search ?? ''}
                placeholder='Pesquise no Sutra'
                className="w-full bg-antiFlashWhite border-antiFlashWhite h-[45.2px] rounded-xl text-slateGray placeholder:text-slateGray"
                autoComplete="off"
              />
            </form>

            <p className="font-body text-gray-600 text-base font-normal">
              {user ? `Olá, ${user!.firstName} ${user!.lastName}` : 'Olá, visitante'} :)
            </p>
            <p className="font-body text-moonstone text-base font-normal">Que tal navegar pela plataforma?</p>

            <div className="flex flex-col gap-3 mt-3">
              <Link href="/" className={clsx('font-body font-semibold text-base flex items-center gap-1', {
                'text-davysGray': pathname === '/',
                'text-dimGray opacity-70': pathname !== '/',
              })}>
                <House size={22} />
                Início
              </Link>

              <Link href="/explorar" className={clsx('font-body font-semibold text-base text-davysGray flex items-center gap-1', {
                'text-davysGray': pathname.startsWith('/explorar'),
                'text-dimGray opacity-70': !pathname.startsWith('/explorar'),
              })}>
                <LibraryBig size={22} />
                Explorar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}