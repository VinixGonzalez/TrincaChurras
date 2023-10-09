"use client";
import React from "react";
import { GiBarbecue } from "react-icons/gi";

interface NovoChurrasButton {
  onClick: () => void;
}

export function NovoChurrasButton({ onClick }: NovoChurrasButton) {
  return (
    <button
      onClick={onClick}
      className="bg-[#292929] hover:bg-white border-2 border-[#29292920] flex items-center justify-evenly w-[200px] rounded-full group p-2"
    >
      <p className="text-white group-hover:text-[#292929] font-semibold text-xl group-hover:animate-pulse">
        Novo Churras
      </p>
      <span className="group-hover:animate-ping">
        <GiBarbecue
          color="#292929"
          className="hidden group-hover:block"
          size={24}
        />
        <GiBarbecue
          color="#fff"
          className="block group-hover:hidden"
          size={24}
        />
      </span>
    </button>
  );
}
