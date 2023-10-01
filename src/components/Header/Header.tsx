"use client";

import React from "react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

function Header() {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-between ">
      <>
        <div className="flex flex-col items-center gap-2">
          <Image
            src={session?.user?.image as string}
            width={64}
            height={64}
            alt="Imagem do usuario"
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col text-center">
          <p className="text-xl font-semibold">Olá {session?.user?.name}!</p>
          <p>Hoje é um ótimo dia para marcar um churras! 🍻</p>
        </div>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/" })}
          className="bg-[#292929] hover:bg-white border-2 border-[#29292920] hover:text-[#292929] text-white w-[120px] h-[60px] p-4 rounded-full group"
        >
          <span className="text-xl font-semibold group-hover:animate-pulse">
            Sair
          </span>
        </button>
      </>
    </div>
  );
}

export default Header;
