import Header from "@/components/Header/Header";
import NovoChurrasButton from "@/components/NovoChurrasButton/NovoChurrasButton";
import React from "react";

function AgendarPage() {
  return (
    <main className="max-w-7xl mx-auto w-full flex flex-col gap-6">
      <Header />

      <section id="page-content" className="bg-white rounded-xl p-9">
        <NovoChurrasButton />
      </section>
    </main>
  );
}

export default AgendarPage;
