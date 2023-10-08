"use client";

import { Churras } from "@/types";
import React, { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa"
import { TbPigMoney } from "react-icons/tb"

export function ListaChurras() {
  const [lista, setLista] = useState<Array<Churras>>([]);
  const [loadingLista, setLoadingLista] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const updateLista = () => {
    const listaChurras = localStorage.getItem("listaChurras");
    setLista(JSON.parse(listaChurras || "[]"));
    setLoadingLista(false);
  };

  useEffect(() => {
    setLastUpdated(sessionStorage.getItem("lastUpdated"));

    updateLista();

    const interval = setInterval(() => {
      if (sessionStorage.getItem("lastUpdated") !== lastUpdated) {
        updateLista();
        setLastUpdated(sessionStorage.getItem("lastUpdated"));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastUpdated]);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-2xl text-[#292929]">Próximos Churras</p>
      {loadingLista ? (
        <div>
          <p>Carregando a lista...</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4">
          {lista.map((churras) => (
            <div key={churras.id} className="bg-white p-4 rounded-xl w-[300px] shadow-lg cursor-pointer">
              <p className="font-semibold text-2xl">
                {new Intl.DateTimeFormat("pt-BR", {
                  dateStyle: "short",
                  timeStyle: "short",
                }).format(new Date(churras.data))}
              </p>
              <p className="text-xl">{churras.nome}</p>

              <div className="flex items-center justify-between mt-8">
                <div className="flex gap-2 items-center">
                <FaUsers color="#292929" size={22} />
                <p>{churras.lista.length}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <TbPigMoney color="#292929" size={22} />
                  <p>R$ {churras.total}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {lista.length <= 0 && (
        <div>
          <p>Não existem churrascos marcados!</p>
        </div>
      )}
    </div>
  );
}

