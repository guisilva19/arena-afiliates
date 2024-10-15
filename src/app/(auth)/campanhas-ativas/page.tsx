"use client";
import useCampaign from "@/hook/useCampaign";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaCodePullRequest } from "react-icons/fa6";
import { FiFileText, FiPercent, FiTool, FiUser } from "react-icons/fi";
import { IoIosLink } from "react-icons/io";
import { IoSearch, IoSettingsSharp } from "react-icons/io5";
import { MdCopyAll, MdOutlineFormatColorText } from "react-icons/md";
import { toast } from "sonner";

export default function CampaingsActives() {
  const [user, setUser] = useState<any>(null);
  const [campanhas, setCampanhas] = useState<any>([]);

  const { listByUser } = useCampaign();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storage = localStorage.getItem("user");
      if (storage) {
        setUser(JSON.parse(storage));
      }
    }
    get();
  }, []);

  const get = async () => {
    setCampanhas(await listByUser());
  };

  return (
    <>
      <main className="w-[calc(100vw-300px)] ml-[300px] h-screen px-8 pt-8 text-white">
        <div className="bg-[#2D2D2D] w-full h-32 px-4 py-5 flex flex-col justify-between rounded-[5px]">
          <h3 className="text-white text-xl font-medium">
            Localizador de campanhas
          </h3>
          <form className="flex gap-6 items-center">
            <fieldset className="w-full">
              <select
                id="select"
                className="block w-full py-2 pl-3 pr-10 bg-[#474747] text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Selecione o país</option>
                <option value="option1">Opção 1</option>
                <option value="option2">Opção 2</option>
                <option value="option3">Opção 3</option>
              </select>
            </fieldset>
            <fieldset className="w-full">
              <select
                id="select"
                className="block w-full py-2 pl-3 pr-10 bg-[#474747] text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Tipo de campanha </option>
                <option value="option1">Opção 1</option>
                <option value="option2">Opção 2</option>
                <option value="option3">Opção 3</option>
              </select>
            </fieldset>
            <button className="min-w-[220px] text-sm h-[38px] bg-[#171717] flex items-center justify-center rounded-md">
              Consultar campanhas
            </button>
            <fieldset className="w-full flex relative">
              <input
                type="text"
                placeholder="Pesquisa de palavras"
                className="w-full py-2 pl-3 pr-10 text-sm bg-[#474747] text-white rounded-md shadow-sm focus:outline-none placeholder:text-white"
              />
              <button className="min-w-[50px] h-[38px] bg-[#000] flex items-center justify-center rounded-md absolute right-0">
                <IoSearch size={20} />
              </button>
            </fieldset>
          </form>
        </div>

        <div
          className={`grid grid-cols-11 gap-4 text-left text-gray-400 uppercase text-sm bg-[#2D2D2D] p-4 rounded-[5px]`}
        >
          <div className="col-span-2 flex items-center gap-2">
            <FiUser size={16} /> Marca
          </div>
          {user?.tipo === 2 && (
            <div className="col-span-2 flex items-center gap-2">
              <IoIosLink size={16} /> Link
            </div>
          )}
          <div className="col-span-2 flex items-center gap-2">
            <MdOutlineFormatColorText size={16} /> Nome
          </div>
          <div className="col-span-3 flex items-center gap-2">
            <FiFileText size={16} /> Condições
          </div>
          <div className="col-span-2 flex items-center gap-2">
            <FiPercent size={16} /> Comissão
          </div>
        </div>
        {campanhas.map((campanha: any, idx: number) => {
          return (
            <div
              key={idx}
              className={`grid grid-cols-11 gap-4 items-center text-white text-sm bg-[#2D2D2D] p-4 rounded-[5px] mt-2 hover:bg-[#3A3A3A]`}
            >
              <div className="col-span-2">
                {campanha?.logo ? (
                  <Image
                    src={campanha.logo}
                    alt="Logo"
                    className="w-max h-[35px] object-cover rounded-[3px]"
                    width={70}
                    height={35}
                  />
                ) : (
                  "Imagem"
                )}
              </div>
              <div className="col-span-2 flex gap-3 items-center">
                <p>{campanha?.link}</p>
                {campanha?.link && (
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(campanha.link);
                      toast("Link copiado!");
                    }}
                  >
                    <MdCopyAll size={24} />
                  </button>
                )}
              </div>
              <p className="col-span-2">{campanha?.nome}</p>
              <p className="col-span-3">{campanha?.condicao}</p>
              <p className="col-span-2">{campanha?.comissao}</p>
            </div>
          );
        })}
      </main>
    </>
  );
}
