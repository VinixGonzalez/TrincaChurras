"use client";

import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import pt from "date-fns/locale/pt-BR";
import { Controller } from "react-hook-form";
import { AiOutlineDelete } from "react-icons/ai";
import { useFormNovoChurras } from "./useFormNovoChurras";
import { real } from "@/utils";

registerLocale("pt-BR", pt);

export function FormNovoChurras({
  onAddSuccess,
}: {
  onAddSuccess: () => void;
}) {
  const {
    handleAddNovaPessoa,
    handleRemoverPessoa,
    handleSubmit,
    handleSubmitNewChurras,
    setIncluirBebidasCheck,
    register,
    errors,
    control,
    pessoa,
    valorEspecifico,
    setPessoa,
    setValorEspecifico,
    listaPessoas,
    totalChurras,
    incluirBebidasCheck,
  } = useFormNovoChurras({ onAddSuccess });

  const handleChangeValorEspecifico = (valor: string) => {
    const isValid = /^(\d+)([,.]\d{0,2})?$/.test(valor);

    if (!isValid) {
      return;
    }

    const numericValue = parseFloat(valor.replace(",", "."));

    if (numericValue >= 1000) {
      setValorEspecifico("1000");
    }

    setValorEspecifico(valor);
  };

  return (
    <form
      className="flex flex-col sm:flex-row gap-6"
      onSubmit={handleSubmit(handleSubmitNewChurras)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && e.target === document.activeElement) {
          e.preventDefault();
          handleAddNovaPessoa(pessoa);
        }
      }}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label title="Obrigatório" htmlFor="nome">
            Nome do evento*
          </label>
          <input
            type="text"
            id="nome"
            {...register("nome")}
            className="bg-[#c9c9c9] rounded-xl p-4"
          />
          {errors.nome && (
            <span className="text-red-600">{errors.nome.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="data" title="Obrigatório">
            Data*
          </label>
          <Controller
            control={control}
            name="data"
            render={({ field, fieldState, formState }) => (
              <DatePicker
                id="data"
                className="bg-[#c9c9c9] rounded-xl p-4 max-w-[170px]"
                adjustDateOnChange={false}
                selected={field.value}
                showTimeSelect
                onChange={(date) => field.onChange(date)}
                locale={"pt-BR"}
                dateFormat={"dd/MM/yyyy"}
                timeCaption="Horário"
              />
            )}
          />
          {errors.data && (
            <span className="text-red-600">{errors.data.message}</span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="endereco">Endereço*</label>
        <input
          type="text"
          id="endereco"
          placeholder="Endereço"
          className="bg-[#c9c9c9] rounded-xl p-4"
          {...register("endereco")}
        />
        {errors.endereco && (
          <span className="text-red-600">{errors.endereco.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="observacao">Observações</label>
        <textarea
          maxLength={4000}
          id="observacoes"
          placeholder="Observações"
          className="bg-[#c9c9c9] rounded-xl p-4 max-h-[300px] min-h-[100px]"
          {...register("observacoes")}
        />
      </div>

      <div
        className="flex gap-2 w-fit"
        title="Será incluso o valor de R$ 12,00 por pessoa."
      >
        <input
          type="checkbox"
          name="bebidas"
          id="bebidas"
          onChange={(e) => setIncluirBebidasCheck(e.target.checked)}
        />
        <label htmlFor="bebidas">Incluir bebidas*</label>
      </div>

      <div className="flex flex-col gap-1">
        <p>Pessoas</p>

        <div className="flex flex-col gap-2">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Nome"
              className="bg-[#c9c9c9] rounded-xl p-4"
              onChange={(e) => setPessoa(e.target.value)}
              value={pessoa}
            />
            <div className="flex items-center rounded-xl bg-[#c9c9c9]">
              <label htmlFor="valorEspecifico" className="pl-4">
                R$
              </label>
              <input
                id="valorEspecifico"
                type="text"
                placeholder="Valor"
                className="bg-[#c9c9c9] rounded-xl p-4 w-full outline-none"
                value={valorEspecifico}
                onChange={(e) => handleChangeValorEspecifico(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => handleAddNovaPessoa(pessoa)}
            className="bg-[#292929] text-white text-xl font-semibold py-2 px-4 rounded-xl mt-2"
          >
            Adicionar
          </button>
        </div>

        <ul className="flex flex-col mt-4 gap-2">
          {listaPessoas.map((pessoa) => (
            <li key={pessoa.id} className="flex justify-between">
              <div className="flex gap-4">
                <div className="max-w-[250px] truncate">
                  <label className={`text-black`}>{pessoa.nome}</label>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <span className={`text-black`}>
                  {real.format(+pessoa.valor)}
                </span>
                <button
                  title="Remover"
                  type="button"
                  onClick={() => handleRemoverPessoa(pessoa.id)}
                >
                  <AiOutlineDelete />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <small className="text-[#292929] font-semibold text-right">
        {listaPessoas.length} pessoa(s).
      </small>

      <hr />

      <section id="resumo" className="w-full">
        <small>Resumo</small>

        <div className="flex items-center justify-between">
          <p>TOTAL</p>
          <p className="text-2xl">{real.format(totalChurras)}</p>
        </div>
        <div className="flex items-center justify-between">
          <p>PESSOAS</p>
          <p className="text-2xl">{listaPessoas.length}</p>
        </div>
        {incluirBebidasCheck && listaPessoas.length > 0 && (
          <small className="text-right text-xs">
            * Bebidas incluídas, foi adicionado R$ 12,00 por pessoa.
          </small>
        )}
      </section>

      <div>
        <button
          type="submit"
          className="bg-[#292929] flex items-center gap-2 py-4 px-8 rounded-full group w-fit"
        >
          <p className="text-white font-semibold">Salvar</p>
        </button>
      </div>
    </form>
  );
}
