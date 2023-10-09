"use client";

import { real } from "@/utils";
import React from "react";
import { FaUsers } from "react-icons/fa";
import { TbMoneybag, TbPigMoney } from "react-icons/tb";
import { FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";
import { useChurrasDetalhe } from "./useChurrasDetalhe";
import ShareButton from "../ShareButton/ShareButton";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

interface ChurrasDetalhe {
  id: string;
}

export function ChurrasDetalhe({ id }: ChurrasDetalhe) {
  const { data: session } = useSession();
  const {
    churrasco,
    fullUrl,
    loadingData,
    calcularValorTotalArrecadado,
    handleCheckPessoa,
    handleUpdateListaPagos,
  } = useChurrasDetalhe({
    id,
  });

  if (loadingData) {
    return "Carregando detalhe...";
  }

  if (!loadingData && !churrasco) {
    redirect("/dashboard");
  }

  return (
    <section
      id="churras-detalhe"
      className="bg-white p-9 rounded-xl w-[600px] max-w-7xl mx-auto flex flex-col gap-6"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-4xl font-semibold">{churrasco?.nome}</p>
          <div className="flex items-center gap-2">
            <ShareButton
              platform="whatsapp"
              title={`${churrasco?.nome}`}
              url={fullUrl}
            />
            <ShareButton
              platform="facebook"
              title={`${churrasco?.nome}`}
              url={fullUrl}
            />
          </div>
        </div>
        <p className="text-xl font-medium flex items-center">
          {churrasco &&
            new Intl.DateTimeFormat("pt-BR", {
              dateStyle: "short",
              timeStyle: "short",
            }).format(new Date(churrasco?.data))}
          <span className="ml-2 text-base">🕒</span>
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center" title="Total de pessoas">
          <FaUsers color="#292929" size={22} />
          <p>{churrasco?.lista.length}</p>
        </div>
        <div className="flex gap-2 items-center" title="Total a arrecadar">
          <TbPigMoney color="#292929" size={22} />
          <p>{churrasco && real.format(churrasco.total)}</p>
        </div>
        <div className="flex gap-2 items-center" title="Total arrecadado">
          <TbMoneybag color="#292929" size={22} />
          <p>{real.format(calcularValorTotalArrecadado())}</p>
        </div>
        {churrasco?.bebidaInclusa && (
          <div
            className="flex gap-2 items-center"
            title="Valor das bebidas incluso"
          >
            <span className="text-xl">🍻💲</span>
          </div>
        )}
      </div>

      <hr />

      <div>
        <small>Endereço</small>
        <div className="flex gap-6 items-center ">
          <p>{churrasco?.endereco}</p>
          <Link
            target="_blank"
            href={`https://google.com.br/maps/search/${churrasco?.endereco}`}
            className="flex items-center text-sm font-semibold gap-1 cursor-pointer"
          >
            <small className="underline text-blue-600">ver no mapa</small>
            <span>
              <FaMapMarkerAlt />
            </span>
          </Link>
        </div>
      </div>

      <div>
        <small>Observações</small>
        <div className="bg-[#c9c9c930] p-2 rounded-xl">
          <p>{churrasco?.observacoes}</p>
        </div>
      </div>

      <hr />

      <ul className="flex flex-col gap-2">
        <p>Convidados</p>
        {churrasco?.lista.map((pessoa) => (
          <li key={pessoa.id} className="flex justify-between">
            <div className="flex gap-4">
              <input
                className={`${session ? "block" : "hidden"}`}
                type="checkbox"
                name={`check-${pessoa.id}`}
                id={`check-${pessoa.id}`}
                onChange={() => handleCheckPessoa(pessoa.id)}
                checked={pessoa.pago}
              />
              <div className="max-w-[250px] truncate">
                <label
                  className={`${pessoa.pago ? "text-green-600" : "text-black"}`}
                  htmlFor={`${session ? `check-${pessoa.id}` : ""}`}
                >
                  {pessoa.nome}
                </label>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <span
                className={`${
                  pessoa.pago ? "line-through text-green-600" : "text-black"
                }`}
              >
                {real.format(+pessoa.valor)}
              </span>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <button
          onClick={handleUpdateListaPagos}
          type="button"
          className="bg-[#292929] flex items-center gap-2 py-4 px-8 rounded-full group w-fit"
        >
          <p className="text-white font-semibold">Salvar</p>
        </button>
      </div>
    </section>
  );
}
