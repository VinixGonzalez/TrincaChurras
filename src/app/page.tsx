import { FormLogin } from "@/components/Forms/FormLogin/FormLogin";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/agendar");
  }

  return (
    <main className="flex flex-col gap-8 items-center justify-center max-w-7xl m-auto">
      <h1 className="font-extrabold text-[3rem] text-center text-[#292929]">
        Agenda de Churras
      </h1>

      <FormLogin />
    </main>
  );
}
