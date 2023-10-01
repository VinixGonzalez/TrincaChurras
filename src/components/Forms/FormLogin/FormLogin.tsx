"use client";
import { FiGithub } from "react-icons/fi";

import React from "react";
import { signIn } from "next-auth/react";

export function FormLogin() {
  return (
    <form className="flex flex-col items-center" action="">
      <div className="flex flex-col gap-4">
        <button
          type="button"
          onClick={() =>
            signIn("github", { callbackUrl: "/agendar", redirect: false })
          }
          className="bg-[#292929] text-white w-[280px] p-4 rounded-full flex items-center justify-evenly group"
        >
          <span className="text-xl font-semibold group-hover:text-[#FFD836]">
            Entrar com GitHub
          </span>
          <FiGithub
            size={24}
            className="group-hover:animate-ping group-hover:text-[#FFD836]"
          />
        </button>
      </div>
    </form>
  );
}
