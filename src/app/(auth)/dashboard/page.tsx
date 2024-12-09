"use client";
import { useEffect, useState } from "react";
import AddAfiliate from "@/components/AddAfiliate/AddAfiliate";
import CardsStatistics from "@/components/CardsStatistics/CardsStatistics";
import Graphic, { IData, IDataUnique } from "@/components/Graphic/Graphic";
import Loading from "@/components/Loading/Loading";
import useData from "@/hook/useData";
import useUser from "@/hook/useUser";
import Link from "next/link";
import CardsStatisticsAfiliate from "@/components/CardsStatisticsAfiliate/CardsStatisticsAfiliate";
import "react-datepicker/dist/react-datepicker.css";
import useCampaign from "@/hook/useCampaign";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("all");
  const [idCampaign, setIdCampaign] = useState("");
  const [campanhas, setCampanhas] = useState<any>([]);
  const [dados, setDados] = useState<any>([]);
  const [data, setData] = useState<IData[]>({} as IData[]);
  const [dataUnique, setDataUnique] = useState<IDataUnique>({} as IDataUnique);
  const { allData, dadosByMyUser, dataGraphicsByUser } = useData();
  const { list, listByUser } = useCampaign();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storage = sessionStorage.getItem("user");
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
    get();
  }, [period, idCampaign]);

  const get = async () => {
    if (typeof window !== "undefined") {
      try {
        setLoading(true);
        const storage = (await sessionStorage.getItem("user")) as string;
        if (JSON.parse(storage)?.tipo === 1) {
          setDados(await allData(period, idCampaign));
          setData(await allDataGraphics());
          setCampanhas(await list());
        } else {
          setCampanhas(await listByUser());
          const result = await dadosByMyUser(period, idCampaign);
          const responseGrafic = await dataGraphicsByUser(
            JSON.parse(storage)?.id
          );
          setData(responseGrafic);
          setDataUnique(result.dados);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const { allDataGraphics } = useData();

  useEffect(() => {
    getUsersAll();
  }, []);

  const getUsersAll = async () => {
    if (typeof window !== "undefined") {
      const storage = (await sessionStorage.getItem("user")) as string;

      if (JSON.parse(storage)?.tipo === 1) {
        const { afiliados } = await getUsers();
        setUsers(afiliados);
      }
    }
  };

  const { getUsers } = useUser();
  const [users, setUsers] = useState<any>([]);
  const [isOpenAfiliate, setIsOpenAfiliate] = useState(false);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <main
        className={`w-[calc(100vw-300px)] h-max ml-[300px] bg-black  px-8 py-8 text-white flex flex-col ${
          user?.tipo === 1 ? "gap-10" : "gap-4"
        }`}
      >
        <span className="flex flex-col font-medium">
          <h1 className="text-2xl">Bem vindo de volta, {user?.nome}</h1>
          <p className="text-[13px]">Acompanhe de perto as métricas.</p>
        </span>

        {user?.tipo === 1 && (
          <>
            <div className="flex items-center space-x-4 mt-4 justify-between">
              <section className="flex gap-5">
                <div className="flex items-center bg-[#1E1E1E] text-white rounded-xl w-[350px] h-[44px]">
                  <div className="relative w-full">
                    <div
                      className="mt-1 p-2 block w-full rounded-lg shadow-sm text-sm cursor-pointer"
                      onClick={() => setIsOpenAfiliate(!isOpenAfiliate)}
                    >
                      <span className="text-gray-500">Ver afiliado</span>
                    </div>

                    {isOpenAfiliate && (
                      <div className="absolute bg-white w-full left-0 border border-slate-200 rounded-xl max-h-80 overflow-y-auto mt-1 z-10">
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
                <fieldset className="w-[380px]">
                  <select
                    onChange={(e) => setPeriod(e.target.value)}
                    defaultValue="all"
                    id="select"
                    className="block w-full py-3 pl-6 pr-10 bg-[#202020] text-white rounded-xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm appearance-none"
                  >
                    <option value="all">Todo periodo</option>
                    <option value="1">Últimas 24 horas</option>
                    <option value="7">Últimos 7 dias</option>
                    <option value="15">Últimos 15 dias</option>
                    <option value="30">Últimos 30 dias</option>
                  </select>
                </fieldset>

                <fieldset className="w-[380px]">
                  <select
                    onChange={(e) => setIdCampaign(e.target.value)}
                    defaultValue={idCampaign}
                    id="select"
                    className="block w-full py-3 pl-6 pr-10 bg-[#202020] text-white rounded-xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm appearance-none"
                  >
                    <option value="">Todas campanhas</option>
                    {campanhas.map((item: any) => (
                      <option key={item.id} value={item.id}>
                        {item.nome}
                      </option>
                    ))}
                  </select>
                </fieldset>
              </section>

              <div className="flex justify-end">
                <button
                  onClick={handleAddData}
                  className="bg-[rgba(128,248,126,0.16)] text-[#85FF4C] px-4 py-2 rounded-md hover:bg-[rgba(128,248,126,0.3)] hover:scale-105 transition-transform duration-300 ease-in-out"
                >
                  Adicionar Dados
                </button>
              </div>
            </div>
          </>
        )}

        {loading ? (
          <Loading />
        ) : (
          <>
            {user?.tipo === 1 ? (
              <>
                <CardsStatistics dados={dados} />
                <Graphic data={data} afiliate={false} />
              </>
            ) : (
              <>
                <section className="flex gap-5">
                  <fieldset className="w-[380px]">
                    <select
                      onChange={(e) => setPeriod(e.target.value)}
                      defaultValue="all"
                      id="select"
                      className="block w-full py-3 pl-6 pr-10 bg-[#202020] text-white rounded-xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm appearance-none"
                    >
                      <option value="all">Todo periodo</option>
                      <option value="1">Últimas 24 horas</option>
                      <option value="7">Últimos 7 dias</option>
                      <option value="15">Últimos 15 dias</option>
                      <option value="30">Últimos 30 dias</option>
                    </select>
                  </fieldset>
                  <fieldset className="w-[380px]">
                    <select
                      onChange={(e) => {
                        setIdCampaign(e.target.value);
                      }}
                      defaultValue={idCampaign}
                      id="select"
                      className="block w-full py-3 pl-6 pr-10 bg-[#202020] text-white rounded-xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm appearance-none"
                    >
                      <option value="">Todas campanhas</option>
                      {campanhas.map((item: any) => (
                        <option key={item.idCampaign} value={item.idCampaign}>
                          {item.nome}
                        </option>
                      ))}
                    </select>
                  </fieldset>
                </section>
                <CardsStatisticsAfiliate dados={dataUnique} />
                <Graphic data={data} afiliate={true} />
              </>
            )}
          </>
        )}
      </main>

      {isModalOpen && (
        <AddAfiliate
          handleCloseModal={handleCloseModal}
          users={users}
          setLoading={setLoading}
        />
      )}
    </>
  );
}
