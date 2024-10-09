"use client";

import { useState } from "react";
import { DateRangePicker } from '@nextui-org/react';
import { IoSearch, IoCopyOutline, IoPersonAddOutline, IoAnalyticsOutline, IoCashOutline, IoPeopleOutline } from "react-icons/io5"; // Ícone para depositantes
import { FiTag } from "react-icons/fi"; // Ícone para Marca

export default function ListCampaings() {
  const [selectedRange, setSelectedRange] = useState(null);

  const handleRangeChange = (range: any) => {
    setSelectedRange(range);
  };

  return (
    <>
      <main className="w-[calc(100vw-300px)] ml-[300px] px-8 pt-8 text-white h-screen">
        <div className="bg-[#2D2D2D] w-full h-32 px-4 py-5 flex flex-col justify-between rounded-[5px]">
          <h3 className="text-white text-xl font-medium">Localizador de Campanhas</h3>
          <form className="flex gap-6 items-center">
            {/* Campo para selecionar o intervalo de datas */}
            <fieldset className="w-full">
              <DateRangePicker
                value={selectedRange}
                onChange={handleRangeChange}
                // css={{
                //   '& .nextui-dp-range-cell--selected': {
                //     backgroundColor: 'rgba(133, 255, 76, 0.3)', // Cor personalizada
                //   },
                // }}
              />
            </fieldset>
            {/* Botão modificado */}
            <button className="min-w-[220px] text-sm h-[38px] bg-[#171717] flex items-center justify-center rounded-md">
              Ver estatísticas
            </button>
            <fieldset className="w-full flex relative">
              <input
                type="text"
                placeholder="Palavras chave"
                className="w-full py-2 pl-3 pr-10 text-sm bg-white text-black rounded-md shadow-sm focus:outline-none"
                style={{ height: "40px" }} // Altura ajustada para 40px
              />
              <button className="min-w-[50px] h-[40px] bg-[#000] flex items-center justify-center rounded-md absolute right-0">
                <IoSearch size={20} />
              </button>
            </fieldset>
          </form>
        </div>

        {/* Tabela de campanhas */}
        <div className="mt-8">
          <div className="grid grid-cols-12 gap-4 text-left text-gray-400 uppercase text-sm bg-[#2D2D2D] p-4 rounded-[5px]">
            <div className="col-span-2 flex items-center gap-2">
              <FiTag size={16} /> Marca
            </div>
            <div className="col-span-2 flex items-center gap-2">
              <IoAnalyticsOutline size={16} /> CPA {/* Ícone e coluna modificados */}
            </div>
            <div className="col-span-2 flex items-center gap-2">
              <IoSearch size={16} /> Cliques {/* Ícone e coluna modificados */}
            </div>
            <div className="col-span-3 flex items-center gap-2">
              <IoPersonAddOutline size={16} /> Registros {/* Ícone e coluna modificados */}
            </div>
            <div className="col-span-2 flex items-center gap-2">
              <IoCashOutline size={16} /> Comissão {/* Ícone mantido */}
            </div>
            <div className="col-span-1 flex items-center justify-center gap-2">
              <IoPeopleOutline style={{ fontSize: "16px", minWidth: "16px", minHeight: "16px" }} /> Depositantes {/* Ícone no estilo outline e tamanho ajustado */}
            </div>
          </div>

          {/* Exemplo de uma linha da tabela */}
          <div className="grid grid-cols-12 gap-4 items-center text-white text-sm bg-[#2D2D2D] p-4 rounded-[5px] mt-2 hover:bg-[#3A3A3A]">
            <div className="col-span-2">[Espaço para imagem]</div>
            <div className="col-span-2">
              {/* Número fixo de CPA */}
              <span className="text-white">0</span>
            </div>
            <div className="col-span-2">
              {/* Número fixo de Cliques */}
              <span className="text-white">1245</span>
            </div>
            <div className="col-span-3">
              {/* Número fixo de Registros */}
              <span className="text-white">208</span>
            </div>
            <div className="col-span-2">
              {/* Valor fixo de Comissão */}
              <span className="text-white">R$ 2.560,90</span>
            </div>
            <div className="col-span-1 text-center">
              {/* Número fixo de Depositantes */}
              <span className="text-white">88</span>
            </div>
          </div>

          {/* Banner com comissão total */}
          <div className="mt-4 w-full h-[90px] bg-[rgba(5,193,104,0.2)] border border-[rgba(5,193,104,0.7)] flex items-center justify-center rounded-md">
            <p className="text-[rgba(5,193,104,1)] text-lg">
              Comissão total: <span className="font-bold">R$ 2.560,90</span>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
