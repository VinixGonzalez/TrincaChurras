import { Header } from "@/components";
import { ListaChurras } from "@/components";
import React from "react";

async function DashboardPage() {
  return (
    <main className="max-w-7xl mx-auto w-full flex flex-col gap-6">
      <Header />

      <hr className="border-1 border-black" />

      <ListaChurras />
    </main>
  );
}

export default DashboardPage;
