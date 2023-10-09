import React from "react";
import Image from "next/image";
import { NovoChurrasModal } from "@/components";
import { SairButton } from "@/components";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Link from "next/link";
import { SiHomebrew } from "react-icons/si";

export async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <div className="bg-white rounded-xl p-9 shadow-xl">
      <div className="flex flex-col gap-2 sm:gap-0 sm:flex-row items-center">
        <div className="flex flex-col items-center gap-2">
          <Image
            src={session?.user?.image as string}
            width={80}
            height={80}
            alt="Imagem do usuario"
            className="rounded-full"
          />
          <small>
            {new Intl.DateTimeFormat("pt-BR", {
              dateStyle: "short",
              timeStyle: "short",
            }).format(new Date())}
          </small>
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

      <nav className="flex flex-col items-center sm:flex-row gap-4">
        <Link
          className="bg-[#292929] hover:bg-white border-2 border-[#29292920] flex items-center justify-evenly w-[200px] rounded-full group p-2"
          href={"/dashboard"}
        >
          <p className="text-white group-hover:text-[#292929] font-semibold text-xl group-hover:animate-pulse">
            Dashboard
          </p>
          <span className="group-hover:animate-ping">
            <SiHomebrew
              color="#292929"
              className="hidden group-hover:block"
              size={24}
            />
            <SiHomebrew
              color="#fff"
              className="block group-hover:hidden"
              size={24}
            />
          </span>
        </Link>

        <NovoChurrasModal />
        <SairButton />
      </nav>
    </div>
  );
}
