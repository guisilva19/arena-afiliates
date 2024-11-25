"use client";
import Graphic, { IData, IDataUnique } from "@/components/Graphic/Graphic";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Loading from "@/components/Loading/Loading";
import useData from "@/hook/useData";
import CardsStatisticsAfiliate from "@/components/CardsStatisticsAfiliate/CardsStatisticsAfiliate";
import useCampaign from "@/hook/useCampaign";

export default function Afiliate() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const { dadosByUser, dataGraphicsByUser } = useData();

  const [loading, setLoading] = useState(true);
  const [dataUnique, setDataUnique] = useState<IDataUnique>({} as IDataUnique);
  const [data, setData] = useState<IData[]>({} as IData[]);
  const [user, setUser] = useState<any>({});

  const [period, setPeriod] = useState("all");
  const [idCampaign, setIdCampaign] = useState("");
  const [campanhas, setCampanhas] = useState<any>([]);
  const { listByAfiliate } = useCampaign();

  useEffect(() => {
    if (!id || typeof id === "undefined") {
      router.push("/dashboard");
    } else {
      getDados();
    }
  }, [id, period, idCampaign]);

  const getDados = async () => {
    try {
      setLoading(true);
      const result = await dadosByUser(String(id), period, idCampaign);
      const responseGrafic = await dataGraphicsByUser(String(id));
      setDataUnique(result.dados);
      setUser(result.usuario);
      setData(responseGrafic);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCampanhasActiver();
  }, []);

  const getCampanhasActiver = async () => {
    setCampanhas(await listByAfiliate(String(id)));
  };

  return (
    <>
      <main className="w-[calc(100vw-300px)] ml-[300px] h-max min-h-screen px-8 pt-8 text-white flex flex-col gap-4 bg-black">
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
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="flex gap-4">
              <section className="w-[380px] h-24 bg-[#202020] px-6 flex items-center justify-between rounded-xl ">
                <h4 className="text-xl font-medium">{user?.nome}</h4>
                <p className="text-xs text-white/60">
                  {new Date(user?.criado_em).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </p>
              </section>
              {/* <section className="w-[340px] h-24 bg-[#202020] px-6 flex items-center justify-between rounded-xl ">
                <span className="flex flex-col gap-3">
                  <p className="text-sm text-white/80">Saldo disponível</p>
                  <h4 className="text-2xl font-medium">685,156</h4>
                </span>
                <span className="">
                  <button className="border-b border-white w-20 text-xs flex items-center justify-center h-10">
                    Enviar
                  </button>
                  <button className="w-20 text-xs h-10 text-center flex gap-1 items-center ">
                    <IoTimeOutline size={16} />
                    Histórico
                  </button>
                </span>
              </section> */}
            </div>
            <CardsStatisticsAfiliate dados={dataUnique} />
            <Graphic data={data} afiliate={true} />
          </>
        )}
      </main>
    </>
  );
}
