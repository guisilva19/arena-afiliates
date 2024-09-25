"use client";
import CardsStatistics from "@/components/CardsStatistics/CardsStatistics";
import Graphic from "@/components/Graphic/Graphic";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker"; // Biblioteca de calendário
import "react-datepicker/dist/react-datepicker.css";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Controle do modal
  const [afiliado, setAfiliado] = useState("");
  const [marca, setMarca] = useState(""); // Marca agora vem antes de Data
  const [data, setData] = useState<Date | null>(null); // Usar DatePicker para calendário
  const [cliques, setCliques] = useState("");
  const [registros, setRegistros] = useState("");
  const [ftd, setFtd] = useState("");
  const [contasAtivas, setContasAtivas] = useState("");
  const [novosDepositantes, setNovosDepositantes] = useState("");
  const [contasDepositantes, setContasDepositantes] = useState("");
  const [contasAposta, setContasAposta] = useState("");
  const [netPlayer, setNetPlayer] = useState("");
  const [depositos, setDepositos] = useState("");
  const [stakes, setStakes] = useState("");
  const [chargebacks, setChargebacks] = useState("");
  const [receitaLiquida, setReceitaLiquida] = useState("");
  const [revshare, setRevshare] = useState("");
  const [cpa, setCpa] = useState("");
  const [comissaoTotal, setComissaoTotal] = useState("");
  const [contagemCpa, setContagemCpa] = useState("");

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

        {/* Adicionar Campo de Pesquisa e Filtros */}
        <div className="flex items-center space-x-4 mt-4">
          <div className="flex items-center bg-[#1E1E1E] text-white rounded-md w-[350px] h-[44px] px-4">
            <input
              type="text"
              placeholder="Procurar por afiliado..."
              className="ml-2 w-full bg-transparent outline-none text-sm"
              value={afiliado}
              onChange={(e) => setAfiliado(e.target.value)}
            />
          </div>
          <div className="flex items-center bg-[#1E1E1E] text-white rounded-md w-[42px] h-[44px] justify-center">
          </div>
          <div className="flex items-center space-x-2">
            <select className="bg-[#1E1E1E] text-white rounded-md px-2 py-2.5">
              <option>Dados gerais</option>
              <option>Afiliado Específico</option>
            </select>
          </div>
        </div>

        {/* Botão Adicionar Dados */}
        <div className="flex justify-end">
          <button
            onClick={handleAddData}
            className="bg-[rgba(128,248,126,0.16)] text-[#85FF4C] px-4 py-2 rounded-md hover:bg-[rgba(128,248,126,0.3)] hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            Adicionar Dados
          </button>
        </div>

        <CardsStatistics />
        <Graphic />
        <CardsStatistics />
      </main>

      {/* Modal Adicionar Dados */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg max-w-5xl w-full text-gray-800">
            <h3 className="text-xl font-semibold text-center mb-4">
              Adicionar Dados de Afiliado
            </h3>
            <p className="text-gray-500 text-center mb-6">
              Preencha os dados abaixo.
            </p>

            <div className="grid grid-cols-3 gap-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Nome do Afiliado
                </label>
                <input
                  type="text"
                  value={afiliado}
                  onChange={(e) => setAfiliado(e.target.value)}
                  className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
                />
              </div>

              {/* Marca agora vem antes da Data */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Marca
                </label>
                <input
                  type="text"
                  value={marca}
                  onChange={(e) => setMarca(e.target.value)}
                  className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
                />
              </div>

              {/* Ajuste de Tamanho do Campo de Data para 304x42 */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Data
                </label>
                <DatePicker
                  selected={data}
                  onChange={(date) => setData(date)}
                  className="mt-1 p-2 block w-[304px] h-[42px] rounded-lg border border-gray-300 shadow-sm"
                  placeholderText="Selecione a data"
                  dateFormat="dd/MM/yyyy"
                  showYearDropdown
                  scrollableYearDropdown
                  showMonthDropdown
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Cliques
                </label>
                <input
                  type="number"
                  value={cliques}
                  onChange={(e) => setCliques(e.target.value)}
                  className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Registros
                </label>
                <input
                  type="number"
                  value={registros}
                  onChange={(e) => setRegistros(e.target.value)}
                  className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Contagem FTD
                </label>
                <input
                  type="number"
                  value={ftd}
                  onChange={(e) => setFtd(e.target.value)}
                  className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Contas Ativas
                </label>
                <input
                  type="number"
                  value={contasAtivas}
                  onChange={(e) => setContasAtivas(e.target.value)}
                  className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Novos Depositantes
                </label>
                <input
                  type="number"
                  value={novosDepositantes}
                  onChange={(e) => setNovosDepositantes(e.target.value)}
                  className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Contas Depositantes
                </label>
                <input
                  type="number"
                  value={contasDepositantes}
                  onChange={(e) => setContasDepositantes(e.target.value)}
                  className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Contas de Aposta
                </label>
                <input
                  type="number"
                  value={contasAposta}
                  onChange={(e) => setContasAposta(e.target.value)}
                  className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Net/Player
                </label>
                <input
                  type="number"
                  value={netPlayer}
                  onChange={(e) => setNetPlayer(e.target.value)}
                  className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Depósitos
                </label>
                <input
                  type="number"
                  value={depositos}
                  onChange={(e) => setDepositos(e.target.value)}
                  className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Stakes
                </label>
                <input
                  type="number"
                  value={stakes}
                  onChange={(e) => setStakes(e.target.value)}
                  className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Chargebacks
                </label>
                <input
                  type="number"
                  value={chargebacks}
                  onChange={(e) => setChargebacks(e.target.value)}
                  className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Receita Líquida
                </label>
                <input
                  type="number"
                  value={receitaLiquida}
                  onChange={(e) => setReceitaLiquida(e.target.value)}
                  className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Comissão RevShare
                </label>
                <input
                  type="number"
                  value={revshare}
                  onChange={(e) => setRevshare(e.target.value)}
                  className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Comissão CPA
                </label>
                <input
                  type="number"
                  value={cpa}
                  onChange={(e) => setCpa(e.target.value)}
                  className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Comissão Total
                </label>
                <input
                  type="number"
                  value={comissaoTotal}
                  onChange={(e) => setComissaoTotal(e.target.value)}
                  className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Contagem CPA
                </label>
                <input
                  type="number"
                  value={contagemCpa}
                  onChange={(e) => setContagemCpa(e.target.value)}
                  className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
                />
              </div>
            </div>

            {/* Botão dentro do modal com a cor original */}
            <button
              onClick={handleCloseModal}
              className="bg-green-500 text-white py-2 px-4 rounded-full w-full hover:bg-green-600 transition"
            >
              Adicionar Dados
            </button>

            <button
              onClick={handleCloseModal}
              className="mt-2 text-gray-500 text-center w-full"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
