import { Churras } from "@/types";


export const Storage = {
  getChurras: () => {
    const listaChurras = JSON.parse(
      localStorage.getItem("listaChurras") || "[]"
    );
    if (!listaChurras) return [];
    // const listaStorage = localStorage.getItem("listaChurras")!;
    // if (!listaStorage) return [];

    // const listaObj = JSON.parse(listaStorage);
    // return listaObj as Array<Churras>;
  },
  setChurras: (churras: Churras) => {
    const listaChurras = JSON.parse(localStorage.getItem("listaChurras") || "[]");
    listaChurras.push(churras);
    localStorage.setItem("listaChurras", JSON.stringify(listaChurras));

    // Atualize o timestamp no sessionStorage
    sessionStorage.setItem("lastUpdated", Date.now().toString());
  },
};
