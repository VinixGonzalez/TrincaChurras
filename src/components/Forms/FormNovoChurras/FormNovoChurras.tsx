"use client";

import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import pt from "date-fns/locale/pt-BR";
import { Controller } from "react-hook-form";
import { AiOutlineDelete } from "react-icons/ai";
import { useFormNovoChurras } from "./useFormNovoChurras";

registerLocale("pt-BR", pt);

export function FormNovoChurras({
  onAddSuccess,
}: {
  onAddSuccess: () => void;
}) {
  const {
    handleAddNovaPessoa,
    handleCheckPessoa,
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
  } = useFormNovoChurras();

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={handleSubmit(handleSubmitNewChurras)}
    >
      <div className="flex gap-4">
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
                className="bg-[#c9c9c9] rounded-xl p-4 max-w-[180px]"
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
          id="observacoes"
          placeholder="Observações"
          className="bg-[#c9c9c9] rounded-xl p-4 max-h-[300px] min-h-[100px]"
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
                type="number"
                placeholder="Valor"
                className="bg-[#c9c9c9] rounded-xl p-4 w-full outline-none"
                value={valorEspecifico}
                onChange={(e) => setValorEspecifico(+e.target.value)}
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

        <ul className="flex flex-col">
          {listaPessoas.map((pessoa) => (
            <li key={pessoa.id} className="flex justify-between">
              <div className="flex gap-4">
                <input
                  className="hidden"
                  type="checkbox"
                  name={`check-${pessoa.id}`}
                  id={`check-${pessoa.id}`}
                  onChange={() => handleCheckPessoa(pessoa.id)}
                  checked={pessoa.pago}
                />
                <label
                  className={`${pessoa.pago ? "text-green-600" : "text-black"}`}
                  //   htmlFor={`check-${pessoa.id}`}
                >
                  {pessoa.nome}
                </label>
              </div>

              <div className="flex items-center gap-1">
                <span
                  className={`${
                    pessoa.pago ? "line-through text-green-600" : "text-black"
                  }`}
                >
                  R$ {pessoa.valor}
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

      <hr />

      <div>
        <small>Resumo</small>

        <div className="flex items-center justify-between">
          <p>TOTAL</p>
          <p className="text-2xl">R$ {totalChurras}</p>
        </div>
      </div>

      <div className="mt-60">
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
