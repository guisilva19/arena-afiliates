"use client";

import { useState } from "react";
import { IoSearch, IoCheckmarkSharp } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";

export default function ListCampaings() {
  const [pedidoSolicitado, setPedidoSolicitado] = useState(false);

  // Estado para o modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estados para os valores atuais da campanha
  const [condicoes, setCondicoes] = useState("Depositar R$ 80 / Apostar R$ 80");
  const [comissao, setComissao] = useState("R$ 40 + 20%");

  // Estados temporários para valores que o usuário pode alterar no modal
  const [newCondicoes, setNewCondicoes] = useState(condicoes);
  const [newComissao, setNewComissao] = useState(comissao);

  // Função para abrir o modal e atualizar os valores atuais no modal
  const handleOpenModal = () => {
    setNewCondicoes(condicoes); // Atualiza o estado temporário com o valor atual
    setNewComissao(comissao); // Atualiza o estado temporário com o valor atual
    setIsModalOpen(true); // Abre o modal
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Função para concluir as alterações e atualizar a tabela
  const handleConcluir = () => {
    // Se os valores forem alterados, eles são atualizados
    if (newCondicoes !== condicoes) {
      setCondicoes(newCondicoes);
    }
    if (newComissao !== comissao) {
      setComissao(newComissao);
    }
    handleCloseModal(); // Fecha o modal
  };

  return (
    <>
      <main className="w-[calc(100vw-300px)] ml-[300px] px-8 pt-8 text-white h-screen">
        <div className="bg-[#2D2D2D] w-full h-32 px-4 py-5 flex flex-col justify-between rounded-[5px]">
          <h3 className="text-white text-xl font-medium">
            Solicitações de campanhas
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

        {/* Tabela de campanhas */}
        <div className="mt-8">
          <div className="grid grid-cols-12 gap-4 text-left text-gray-400 uppercase text-sm bg-[#2D2D2D] p-4 rounded-[5px]">
            <div className="col-span-2">Marca</div>
            <div className="col-span-2">Solicitação</div>
            <div className="col-span-2">País</div>
            <div className="col-span-3">Condições</div>
            <div className="col-span-2">Comissão</div>
            <div className="col-span-1 text-center">Ações</div>
          </div>

          {/* Exemplo de uma linha da tabela */}
          <div className="grid grid-cols-12 gap-4 items-center text-white text-sm bg-[#2D2D2D] p-4 rounded-[5px] mt-2 hover:bg-[#3A3A3A]">
            <div className="col-span-2">[Espaço para imagem]</div>
            <div className="col-span-2">
              {pedidoSolicitado ? (
                <span className="text-green-500">Campanha já solicitada</span>
              ) : (
                <button
                  className="flex items-center gap-2 px-4 py-1 border border-green-500 text-green-500 rounded-full hover:bg-green-500 hover:text-white transition"
                  onClick={() => setPedidoSolicitado(true)}
                >
                  Pedido <IoCheckmarkSharp />
                </button>
              )}
            </div>
            <div className="col-span-2">Brasil</div>
            <div className="col-span-3">{condicoes}</div>
            <div className="col-span-2">{comissao}</div>
            <div className="col-span-1 text-center">
              <button
                className="text-white"
                onClick={handleOpenModal}
              >
                <IoSettingsSharp size={20} />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-semibold text-center mb-4">Insira os dados</h3>
            <p className="text-gray-500 text-center mb-6">Por favor insira os dados que serão atualizados na campanha específica.</p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Condições</label>
              <input
                type="text"
                value={newCondicoes}
                onChange={(e) => setNewCondicoes(e.target.value)}
                className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">Comissão</label>
              <input
                type="text"
                value={newComissao}
                onChange={(e) => setNewComissao(e.target.value)}
                className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
              />
            </div>

            <button
              onClick={handleConcluir}
              className="bg-green-500 text-white py-2 px-4 rounded-full w-full hover:bg-green-600 transition"
            >
              Concluir
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
