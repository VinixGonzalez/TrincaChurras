/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Churras } from "@/types";
import { useLocalStorage } from "@/storage/Storage";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export const useChurrasDetalhe = ({ id }: { id: string }) => {
  const { getChurras, setChurras } = useLocalStorage();

  const [loadingData, setLoadingData] = useState(true);
  const [churrasco, setChurrasco] = useState<Churras | null>(null);
  const [fullUrl, setFullUrl] = useState<string>("");
  const path = usePathname();

  const valorBebidaPorPessoa = churrasco?.bebidaInclusa ? 12 : 0;
  const calcularValorTotalArrecadado = () => {
    if (!churrasco) return 0;
    return churrasco.lista.reduce((total, pessoa) => {
      return pessoa.pago ? total + +pessoa.valor + valorBebidaPorPessoa : total;
    }, 0);
  };

  useEffect(() => {
    const churrasco = getChurras().find(
      (churras: Churras) => churras.id === id
    ) as Churras;

    setChurrasco(churrasco);
    setLoadingData(false);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFullUrl(`${window.location.protocol}//${window.location.host}${path}`);
    }
  }, [path]);

  const handleCheckPessoa = (pessoaId: string) => {
    if (!churrasco) return;

    const novaLista = churrasco.lista.map((pessoa) => {
      if (pessoa.id === pessoaId) {
        return { ...pessoa, pago: !pessoa.pago };
      }
      return pessoa;
    });

    setChurrasco({ ...churrasco, lista: novaLista });
  };

  const handleUpdateListaPagos = () => {
    if (!churrasco) return;
    setChurras(churrasco);
    alert("Churras atualizado!");
  };

  return {
    churrasco,
    fullUrl,
    loadingData,
    handleCheckPessoa,
    calcularValorTotalArrecadado,
    handleUpdateListaPagos,
  };
};
