import React from "react";
import Image from "next/image";
import { NovoChurrasModal } from "@/components";
import { SairButton } from "@/components";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export async function Header() {
  // const { data: session } = useSession();
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div className="h-[92px]">Carregando...</div>;
  }

  return (
    <div className="bg-white rounded-xl p-9 shadow-xl">
      <div className="flex items-center">
        <div className="flex items-center flex-col gap-2">
          <Image
            src={session.user?.image as string}
            width={80}
            height={80}
            alt="Imagem do usuario"
            className="rounded-full"
          />
          <small>{new Intl.DateTimeFormat("pt-BR", {
            dateStyle: 'short', timeStyle: 'short'
          }).format(new Date())}</small>
        </div>
        <div className="flex flex-col gap-2 text-center mx-auto">
          <p className="text-2xl font-semibold">Olá {session?.user?.name}!</p>
          <p>
            Hoje é um ótimo dia
            <br className="sm:hidden" /> para marcar um churras! 🍻
          </p>
        </div>
      </div>

      <hr className="my-4" />

      <div className="flex gap-4">
        <NovoChurrasModal />
        <SairButton />
      </div>
    </div>
  );
}
