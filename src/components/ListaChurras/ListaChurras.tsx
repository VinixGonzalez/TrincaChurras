/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useLocalStorage } from "@/storage/Storage";
import { Churras } from "@/types";
import { real } from "@/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { TbPigMoney } from "react-icons/tb";

export function ListaChurras() {
  const [lista, setLista] = useState<Array<Churras>>([]);
  const [loadingLista, setLoadingLista] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const { getChurras } = useLocalStorage();

  const updateLista = () => {
    const listaChurras = getChurras();
    setLista(listaChurras);
    setLoadingLista(false);
  };

  useEffect(() => {
    setLastUpdated(sessionStorage.getItem("trinca-churras::lastUpdated"));

    updateLista();

    const interval = setInterval(() => {
      if (
        sessionStorage.getItem("trinca-churras::lastUpdated") !== lastUpdated
      ) {
        updateLista();
        setLastUpdated(sessionStorage.getItem("trinca-churras::lastUpdated"));
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
        <div className="flex flex-wrap gap-5">
          {lista
            .sort((a, b) => (a.data < b.data ? -1 : 1))
            .map((churras) => (
              <Link key={churras.id} href={`/churras/${churras.id}`}>
                <div className="bg-white p-4 rounded-xl w-[300px] shadow-lg cursor-pointer">
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
                      <p>{real.format(churras.total)}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      )}
      {!loadingLista && lista.length <= 0 && (
        <div>
          <p>Não existem churrascos marcados!</p>
        </div>
      )}
    </div>
  );
}
