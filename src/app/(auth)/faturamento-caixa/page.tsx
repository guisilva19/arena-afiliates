"use client";

import { useEffect, useState } from "react";
import { DateRangePicker, DateValue, RangeValue } from "@nextui-org/react";
import {
  IoSearch,
  IoPersonAddOutline,
  IoAnalyticsOutline,
  IoCashOutline,
} from "react-icons/io5";
import { FiTag } from "react-icons/fi";
import { HiOutlineUsers } from "react-icons/hi2";

import useData from "@/hook/useData";
import Image from "next/image";
import Loading from "@/components/Loading/Loading";

export default function ListCampaings() {
  const { allInvoice, myInvoice } = useData();

  const [selectedRange, setSelectedRange] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [startDate, setStartDate] = useState<string>(new Date().toISOString());
  const [endDate, setEndDate] = useState<string>(new Date().toISOString());
  const [data, setData] = useState<any>([]);
  const [campaigns, setCampaigns] = useState<any>([]);

  const handleRangeChange = (range: RangeValue<DateValue>) => {
    setSelectedRange(range);
    const { start, end } = range;

    if (start) {
      const startDateObj = new Date(start.year, start.month - 1, start.day);
      setStartDate(startDateObj.toISOString());
    }

    if (end) {
      const endDateObj = new Date(end.year, end.month - 1, end.day);
      setEndDate(endDateObj.toISOString());
    }
  };

  useEffect(() => {
    get();
  }, []);

  const get = async () => {
    try {
      setIsLoading(true);
      if (JSON.parse(localStorage.getItem("user") as string).tipo === 1) {
        const response = await allInvoice(startDate, endDate);
        setData(response);
        setCampaigns(response.campanhas);
      } else {
        const response = await myInvoice(startDate, endDate);
        setData(response);
        setCampaigns(response.campanhas);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <main className="w-[calc(100vw-300px)] ml-[300px] px-8 pt-8 text-white h-screen">
        <div className="bg-[#2D2D2D] w-full h-32 px-4 py-5 flex flex-col justify-between rounded-[5px]">
          <h3 className="text-white text-xl font-medium">
            Localizador de Campanhas
          </h3>
          <form className="flex gap-6 items-center">
            <fieldset className="w-4/12">
              <DateRangePicker
                value={selectedRange}
                onChange={(e) => handleRangeChange(e)}
              />
            </fieldset>
            <button
              type="button"
              onClick={get}
              className="min-w-[220px] text-sm h-[38px] bg-[#171717] flex items-center justify-center rounded-md"
            >
              Ver estatísticas
            </button>
            {/* <fieldset className="w-full flex relative">
              <input
                type="text"
                placeholder="Palavras chave"
                className="w-full py-2 pl-3 pr-10 text-sm bg-white text-black rounded-md shadow-sm focus:outline-none"
                style={{ height: "40px" }} // Altura ajustada para 40px
              />
              <button className="min-w-[50px] h-[40px] bg-[#000] flex items-center justify-center rounded-md absolute right-0">
                <IoSearch size={20} />
              </button>
            </fieldset> */}
          </form>
        </div>

        <div className="mt-8">
          <div className="grid grid-cols-10 gap-4 text-left text-gray-400 uppercase text-sm bg-[#2D2D2D] p-4 rounded-[5px]">
            <div className="col-span-1 flex items-center gap-2">
              <FiTag size={16} /> Marca
            </div>
            <div className="col-span-1 flex items-center justify-center  gap-2">
              <IoAnalyticsOutline size={16} /> CPA
            </div>
            <div className="col-span-2 flex items-center justify-center  gap-2">
              <IoSearch size={16} /> Cliques
            </div>
            <div className="col-span-2 flex items-center justify-center  gap-2">
              <IoPersonAddOutline size={16} /> Registros
            </div>
            <div className="col-span-2 flex items-center justify-center  gap-2">
              <IoCashOutline size={16} /> Comissão
            </div>
            <div className="col-span-2 flex items-center justify-center gap-2">
              <HiOutlineUsers size={16} /> Depositantes
            </div>
          </div>

          {isLoading ? (
            <div className="w-full h-40 flex items-center justify-center">
              <Loading />
            </div>
          ) : (
            <>
              <ul className="flex flex-col gap-1">
                {campaigns.map((item: any, idx: number) => (
                  <li
                    key={idx}
                    className="grid grid-cols-10 gap-4 items-center text-white text-sm bg-[#2D2D2D] p-4 rounded-[5px] mt-2 hover:bg-[#3A3A3A]"
                  >
                    <Image
                      className="col-span-1 text-center w-[70px]"
                      src={item.logo}
                      alt={item.nome}
                      width={70}
                      height={35}
                    />
                    <div className="col-span-1 text-center">
                      <span className="text-white">
                        {item.dados.contagem_cpa}
                      </span>
                    </div>
                    <div className="col-span-2 text-center">
                      <span className="text-white">{item.dados.cliques}</span>
                    </div>
                    <div className="col-span-2 text-center">
                      <span className="text-white">{item.dados.registros}</span>
                    </div>
                    <div className="col-span-2 text-center">
                      <span className="text-white">
                        {item.dados.comissao_total.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </span>
                    </div>
                    <div className="col-span-2 text-center">
                      <span className="text-white">
                        {item.dados.contas_depositantes}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-4 w-full h-[90px] bg-[rgba(5,193,104,0.2)] border border-[rgba(5,193,104,0.7)] flex items-center justify-center rounded-md">
                <p className="text-[rgba(5,193,104,1)] text-lg">
                  Comissão total:{" "}
                  <span className="font-bold">
                    {data.comissao_total.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </p>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
