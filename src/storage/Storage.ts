"use client";

import { Churras } from "@/types";

export const useLocalStorage = () => {
  const getChurras = (): Array<Churras> => {
    const listaChurras = JSON.parse(
      localStorage.getItem("listaChurras") || "[]"
    );
    if (!listaChurras) return [];
    return listaChurras;
  };

  const setChurras = (churras: Churras) => {
    const listaChurras = JSON.parse(
      localStorage.getItem("listaChurras") || "[]"
    );
    listaChurras.push(churras);
    localStorage.setItem("listaChurras", JSON.stringify(listaChurras));

    sessionStorage.setItem("lastUpdated", Date.now().toString());
  };

  return {
    getChurras,
    setChurras,
  };
};
