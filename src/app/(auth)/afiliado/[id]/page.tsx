"use client";
import { IDataUnique } from "@/components/Graphic/Graphic";
import Loading from "@/components/Loading/Loading";
import useData from "@/hook/useData";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsFillBagFill, BsThreeDots } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { GiShoppingBag } from "react-icons/gi";
import { HiDownload } from "react-icons/hi";
import { IoTimeOutline } from "react-icons/io5";
import { MdOutlineAttachMoney } from "react-icons/md";

export default function Afiliate() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const { dadosByUser } = useData();

  const [loading, setLoading] = useState(true);
  const [dataUnique, setDataUnique] = useState<IDataUnique>({} as IDataUnique);

  useEffect(() => {
    if (!id || typeof id === "undefined") {
      router.push("/dashboard");
    } else {
      getDados();
    }
  }, [id]);

  const getDados = async () => {
    try {
      setLoading(true);
      console.log("Fetching data for ID:", id); // Log para verificar se o ID está correto
      const result = await dadosByUser(String(id));
      console.log("Data fetched:", result); // Log para verificar o resultado
      setDataUnique(result);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="w-[calc(100vw-300px)] ml-[300px] h-screen px-8 pt-8 text-white flex flex-col gap-4">
        <fieldset className="w-[380px]">
          <select
            id="select"
            className="block w-full py-3 pl-6 pr-10 bg-[#202020] text-white rounded-xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm appearance-none"
          >
            <option value="option1">Últimas 24 horas</option>
            <option value="option2">Últimos 7 dias</option>
            <option value="option2">Últimos 15 dias</option>
            <option value="option2">Últimos 30 dias</option>
          </select>
        </fieldset>
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="flex gap-4">
              <section className="w-[380px] h-24 bg-[#202020] px-6 flex items-center justify-between rounded-xl ">
                <h4 className="text-xl font-medium">Carlos Henrique</h4>
                <p className="text-xs text-white/60">18/01/2025</p>
              </section>
              <section className="w-[340px] h-24 bg-[#202020] px-6 flex items-center justify-between rounded-xl ">
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
              </section>
            </div>
            <Cards data={dataUnique} />
          </>
        )}
      </main>
    </>
  );
}

export const Cards = ({ data }: { data: IDataUnique }) => {
  return (
    <>
      <ul className="flex gap-5 relative">
        <li className="w-full h-32 bg-[#212121] rounded-lg flex flex-col justify-between p-5">
          <section className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaHeart size={18} className="text-green-primary" />
              <p className="text-sm font-">Registros</p>
            </div>
            <button>
              <BsThreeDots />
            </button>
          </section>
          <span>
            <p className="text-3xl font-semibold">{data?.registros}</p>
          </span>
        </li>
        <li className="w-full h-32 bg-[#212121] rounded-lg flex flex-col justify-between p-5">
          <section className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GiShoppingBag size={18} className="text-green-primary" />
              <p className="text-sm font-">Depositantes</p>
            </div>
            <button>
              <BsThreeDots />
            </button>
          </section>
          <span>
            <p className="text-3xl font-semibold">
              {data?.contas_depositantes}
            </p>
          </span>
        </li>
        <li className="w-full h-32 bg-[#212121] rounded-lg flex flex-col justify-between p-5">
          <section className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BsFillBagFill size={18} className="text-green-primary" />
              <p className="text-sm font-">Interação com links</p>
            </div>
            <button>
              <BsThreeDots />
            </button>
          </section>
          <span>
            <p className="text-3xl font-semibold">{data?.cliques}</p>
          </span>
        </li>
        <li className="w-full h-32 bg-[#212121] rounded-lg flex flex-col justify-between p-5">
          <section className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MdOutlineAttachMoney size={20} className="text-green-primary" />
              <p className="text-sm font-">Receita gerada</p>
            </div>
            <button>
              <BsThreeDots />
            </button>
          </section>
          <span>
            <p className="text-3xl font-semibold">{data?.receita_liquida}</p>
          </span>
        </li>
        <button className="absolute top-[-50px] right-0 px-3 py-2 flex text-sm text-white bg-[#212121] rounded-md gap-2 items-center">
          <p>Exportar dados</p>
          <HiDownload size={20} />
        </button>
      </ul>
    </>
  );
};
