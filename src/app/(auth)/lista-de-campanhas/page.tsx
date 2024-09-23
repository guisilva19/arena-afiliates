"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { IoSearch, IoCheckmarkSharp } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";

export default function ListCampaings() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [editCondicoes, setEditCondicoes] = useState("");
  const [editComissao, setEditComissao] = useState("");
  const [editImagem, setEditImagem] = useState(null);

  const [campanhas, setCampanhas] = useState([
    {
      imagem: "",
      pais: "Brasil",
      condicoes: "Depositar R$ 80 / Apostar R$ 80",
      comissao: "R$ 40 + 20%",
      pedidoSolicitado: false,
    },
  ]);

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsAddModalOpen(false);
  };

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storage = localStorage.getItem("user");
      if (storage) {
        setUser(JSON.parse(storage));
      }
    }
  }, []);

  return (
    <>
      <main className="w-[calc(100vw-300px)] ml-[300px] px-8 pt-8 text-white h-screen">
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
                <option value="">Tipo de campanha</option>
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

        {user.tipo === 1 && (
          <div className="flex justify-end mt-4">
            <button
              onClick={handleOpenAddModal}
              className="bg-[#80F87E] bg-opacity-16 text-[#85FF4C] px-4 py-2 text-sm rounded-md transition-transform duration-300 ease-in-out hover:scale-105 "
              style={{ backgroundColor: "rgba(128, 248, 126, 0.16)" }}
            >
              Adicionar Campanha
            </button>
          </div>
        )}

        <div className="mt-2">
          <div className="grid grid-cols-12 gap-4 text-left text-gray-400 uppercase text-sm bg-[#2D2D2D] p-4 rounded-[5px]">
            <div className="col-span-2">Marca</div>
            <div className="col-span-2">Solicitação</div>
            <div className="col-span-2">País</div>
            <div className="col-span-3">Condições</div>
            <div className="col-span-2">Comissão</div>
            <div className="col-span-1 text-center">Ações</div>
          </div>

          {campanhas.map((campanha, idx) => (
            <div
              key={idx}
              className="grid grid-cols-12 gap-4 items-center text-white text-sm bg-[#2D2D2D] p-4 rounded-[5px] mt-2 hover:bg-[#3A3A3A]"
            >
              <div className="col-span-2">
                {campanha.imagem ? (
                  <Image
                    src={campanha.imagem}
                    alt="Logo"
                    className="w-[70px] h-[35px] object-cover rounded-[3px]" // Borda arredondada
                  />
                ) : (
                  "[Espaço para imagem]"
                )}
              </div>
              <div className="col-span-2">
                {campanha.pedidoSolicitado ? (
                  <span className="text-green-500">Campanha solicitada</span>
                ) : (
                  <button className="flex items-center gap-2 px-4 py-1 border border-green-500 text-green-500 rounded-full hover:bg-green-500 hover:text-white transition">
                    Pedido <IoCheckmarkSharp />
                  </button>
                )}
              </div>
              <div className="col-span-2">{campanha.pais}</div>
              <div className="col-span-3">{campanha.condicoes}</div>
              <div className="col-span-2">{campanha.comissao}</div>
              <div className="col-span-1 text-center">
                <button className="text-white">
                  <IoSettingsSharp size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-semibold text-center mb-4">
              Editar Campanha
            </h3>
            <p className="text-gray-500 text-center mb-6">
              Atualize as condições, comissão e a imagem da campanha.
            </p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Imagem da Campanha
              </label>
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
              />
              {editImagem && (
                <Image
                  src={editImagem}
                  alt="Preview"
                  className="w-[70px] h-[35px] object-cover mt-2 rounded-[3px]"
                />
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Condições
              </label>
              <input
                type="text"
                value={editCondicoes}
                onChange={(e) => setEditCondicoes(e.target.value)}
                className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Comissão
              </label>
              <input
                type="text"
                value={editComissao}
                onChange={(e) => setEditComissao(e.target.value)}
                className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
              />
            </div>

            <div className="text-center mt-2">
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-full w-full hover:bg-green-600 transition"
                style={{
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  borderRadius: "80px",
                  width: "160px",
                }}
              >
                Concluir
              </button>
            </div>

            <div className="text-center mt-2">
              <button
                className="bg-red-500 text-white py-2 px-6 rounded-full hover:bg-red-600 transition"
                style={{
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  borderRadius: "80px",
                  width: "115px",
                }}
              >
                Excluir
              </button>
            </div>

            <button
              onClick={handleCloseModal}
              className="mt-2 text-gray-500 text-center w-full"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-semibold text-center mb-4">
              Adicionar Nova Campanha
            </h3>
            <p className="text-gray-500 text-center mb-6">
              Por favor, preencha os dados abaixo para adicionar uma nova
              campanha.
            </p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Nome da Marca
              </label>
              <input
                type="text"
                className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Imagem da Campanha
              </label>
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                País
              </label>
              <input
                type="text"
                className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Condições
              </label>
              <input
                type="text"
                className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Comissão
              </label>
              <input
                type="text"
                className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
              />
            </div>

            <button
              className="bg-green-500 text-white py-3 px-8 rounded-full hover:shadow-lg transition-all hover:bg-green-600"
              style={{
                fontSize: "16px",
                fontWeight: "500",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                width: "fit-content",
              }}
            >
              Adicionar Campanha
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
