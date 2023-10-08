"use client";

import { signOut } from "next-auth/react";
import React from "react";

export function SairButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/" })}
      className="bg-[#292929] hover:bg-white border-2 border-[#29292920] hover:text-[#292929] text-white w-full sm:w-[120px] p-4 rounded-full group"
    >
      <span className="text-xl font-semibold group-hover:animate-pulse">
        Sair
      </span>
    </button>
  );
}
