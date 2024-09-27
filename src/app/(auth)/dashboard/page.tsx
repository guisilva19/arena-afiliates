"use client";
import AddAfiliate from "@/components/AddAfiliate/AddAfiliate";
import CardsStatistics from "@/components/CardsStatistics/CardsStatistics";
import Graphic from "@/components/Graphic/Graphic";
import Loading from "@/components/Loading/Loading";
import useDados from "@/hook/useDados";
import useUser from "@/hook/useUser";
import Link from "next/link";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [afiliado, setAfiliado] = useState("");
  const [dados, setDados] = useState<any>([]);
  const { allDados } = useDados();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storage = localStorage.getItem("user");
      if (storage) {
        setUser(JSON.parse(storage));
      }
    }
  }, []);

  const handleAddData = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (loading) {
      get();
    }
  }, [loading]);

  const get = async () => {
    try {
      setDados(await allDados());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsersAll();
  }, []);

  const getUsersAll = async () => {
    setUsers(await getUsers());
  };

  const { getUsers } = useUser();
  const [users, setUsers] = useState<any>([]);
  const [isOpenAfiliate, setIsOpenAfiliate] = useState(false);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <main className="w-[calc(100vw-300px)] ml-[300px] px-8 py-8 text-white flex flex-col gap-10">
        <span className="flex flex-col font-medium">
          <h1 className="text-2xl">Bem vindo de volta, {user?.nome}</h1>
          <p className="text-[13px]">Acompanhe de perto as métricas.</p>
        </span>

        <div className="flex items-center space-x-4 mt-4 justify-between">
          <div className="flex items-center bg-[#1E1E1E] text-white rounded-md w-[350px] h-[44px]">
            <div className="relative w-full">
              <div
                className="mt-1 p-2 block w-full rounded-lg shadow-sm text-sm cursor-pointer"
                onClick={() => setIsOpenAfiliate(!isOpenAfiliate)}
              >
                <span className="text-gray-500">Ver afiliado</span>
              </div>

              {isOpenAfiliate && (
                <div className="absolute bg-white w-full left-0 border border-slate-200 rounded-lg max-h-80 overflow-y-auto mt-1 z-10">
                  <ul className="flex flex-col">
                    {users.map((user: any) => (
                      <Link
                        href={`/afiliado/${user.id}`}
                        key={user.id}
                        className="text-black p-2 hover:bg-gray-200 text-[11px] cursor-pointer"
                      >
                        {user.nome} - {user.email}
                      </Link>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleAddData}
              className="bg-[rgba(128,248,126,0.16)] text-[#85FF4C] px-4 py-2 rounded-md hover:bg-[rgba(128,248,126,0.3)] hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              Adicionar Dados
            </button>
          </div>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <>
            <CardsStatistics dados={dados} />
            <Graphic />
          </>
        )}
      </main>

      {isModalOpen && (
        <AddAfiliate handleCloseModal={handleCloseModal} users={users} />
      )}
    </>
  );
}
