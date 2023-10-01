"use client";
import React from "react";

function NovoChurrasButton() {
  return (
    <button className="bg-[#292929] flex items-center gap-2 p-4 rounded-full group w-fit">
      <p className="text-white font-semibold">Marcar Novo Churras</p>
      <span className="group-hover:animate-spin">🥩</span>
    </button>
  );
}

export default NovoChurrasButton;
