"use client";

import { signOut } from "next-auth/react";
import React from "react";

export function SairButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/" })}
      className="bg-[#292929] hover:bg-white border-2 border-[#29292920] flex items-center justify-evenly w-[200px] rounded-full group p-2"
    >
      <span className="text-white group-hover:text-[#292929] font-semibold text-xl group-hover:animate-pulse">
        Sair
      </span>
    </button>
  );
}
