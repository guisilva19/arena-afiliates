"use client";
import CardsStatistics from "@/components/CardsStatistics/CardsStatistics";
import Graphic from "@/components/Graphic/Graphic";

export default function Dashboard() {
  const storage = localStorage.getItem("user");
  const user = JSON.parse(storage as string);

  return (
    <>
      <main className="w-[calc(100vw-300px)] ml-[300px] px-8 py-8 text-white flex flex-col gap-10">
        <span className="flex flex-col font-medium">
          <h1 className="text-2xl">Bem vindo de volta, {user.nome}</h1>
          <p className="text-[13px]">
            Acompanhe de perto sua rede de afiliações.
          </p>
        </span>

        <CardsStatistics />

        <Graphic />

        <CardsStatistics />
      </main>
    </>
  );
}
