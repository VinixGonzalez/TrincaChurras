import { Header } from "@/components";
import { ListaChurras } from "@/components";
import { ChurrasDetalhe } from "@/components";
import React from "react";

function ChurrasDetalhePage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return (
    <main className="max-w-7xl mx-auto w-full flex flex-col gap-6">
      <Header />
      <ChurrasDetalhe id={params.id} />
    </main>
  );
}

export default ChurrasDetalhePage;
