"use client";

import { Churras } from "@/types";

export const useLocalStorage = () => {
  const getChurras = (): Array<Churras> => {
    const listaChurras = JSON.parse(
      localStorage.getItem("trinca-churras::listaChurras") || "[]"
    );
    if (!listaChurras) return [];
    return listaChurras;
  };

  const setChurras = (churras: Churras) => {
    const listaChurras = JSON.parse(
      localStorage.getItem("trinca-churras::listaChurras") || "[]"
    );

    const index = listaChurras.findIndex(
      (item: Churras) => item.id === churras.id
    );

    if (index !== -1) {
      listaChurras[index] = churras;
    } else {
      listaChurras.push(churras);
    }

    localStorage.setItem(
      "trinca-churras::listaChurras",
      JSON.stringify(listaChurras)
    );
    sessionStorage.setItem(
      "trinca-churras::lastUpdated",
      Date.now().toString()
    );
  };

  return {
    getChurras,
    setChurras,
  };
};
