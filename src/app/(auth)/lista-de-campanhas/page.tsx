"use client";

import { useState } from "react";
import { IoSearch, IoCheckmarkSharp } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";

export default function ListCampaings() {
  // Estado para os modais
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Estados para edição da campanha selecionada
  const [editCondicoes, setEditCondicoes] = useState("");
  const [editComissao, setEditComissao] = useState("");
  const [editId, setEditId] = useState(null); // Para saber qual campanha estamos editando
  const [editImagem, setEditImagem] = useState(null); // Imagem editada

  // Estado para as campanhas (tabela)
  const [campanhas, setCampanhas] = useState([
    {
      id: 1,
      imagem: "", // imagem inicial (vazia)
      pais: "Brasil",
      condicoes: "Depositar R$ 80 / Apostar R$ 80",
      comissao: "R$ 40 + 20%",
      pedidoSolicitado: false, // Estado específico para o pedido de cada campanha
    },
  ]);

  // Estado para os valores do modal "Adicionar Campanha"
  const [novaImagem, setNovaImagem] = useState(null);
  const [novoNome, setNovoNome] = useState(""); // Nome da campanha (registro interno)
  const [novoPais, setNovoPais] = useState("");
  const [novoCondicoes, setNovoCondicoes] = useState("");
  const [novoComissao, setNovoComissao] = useState("");

  // Função para abrir o modal de adicionar campanha
  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  // Função para abrir o modal de edição de condições e comissão
  const handleOpenEditModal = (id, condicoes, comissao, imagem) => {
    setEditCondicoes(condicoes);
    setEditComissao(comissao);
    setEditImagem(imagem); // Carrega a imagem existente para edição
    setEditId(id);
    setIsModalOpen(true);
  };

  // Função para fechar os modais
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsAddModalOpen(false);
  };

  // Função para adicionar uma nova campanha à tabela
  const handleAdicionarCampanha = () => {
    const novaCampanha = {
      id: campanhas.length + 1, // Gera um novo ID baseado no tamanho da lista
      imagem: novaImagem, // Armazena a imagem selecionada
      pais: novoPais,
      condicoes: novoCondicoes,
      comissao: novoComissao,
      pedidoSolicitado: false, // Inicia como false (nenhum pedido solicitado)
    };

    setCampanhas([...campanhas, novaCampanha]); // Adiciona a nova campanha à lista
    handleCloseModal(); // Fecha o modal após adicionar
  };

  // Função para capturar a imagem do input
  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    setNovaImagem(URL.createObjectURL(file)); // Cria uma URL temporária para exibir a imagem
  };

  // Função para capturar a nova imagem no modal de edição
  const handleEditImagemChange = (e) => {
    const file = e.target.files[0];
    setEditImagem(URL.createObjectURL(file)); // Atualiza a imagem temporária no modal de edição
  };

  // Função para atualizar as condições, comissão e imagem de uma campanha
  const handleUpdateCampanha = () => {
    setCampanhas((prevCampanhas) =>
      prevCampanhas.map((campanha) =>
        campanha.id === editId
          ? {
              ...campanha,
              condicoes: editCondicoes,
              comissao: editComissao,
              imagem: editImagem, // Atualiza a imagem selecionada
            }
          : campanha
      )
    );
    handleCloseModal(); // Fecha o modal após a edição
  };

  // Função para fazer o pedido para uma campanha específica
  const handleFazerPedido = (id) => {
    setCampanhas((prevCampanhas) =>
      prevCampanhas.map((campanha) =>
        campanha.id === id
          ? { ...campanha, pedidoSolicitado: true } // Atualiza apenas a campanha selecionada
          : campanha
      )
    );
  };

  // Função para excluir a campanha
  const handleExcluirCampanha = () => {
    setCampanhas((prevCampanhas) =>
      prevCampanhas.filter((campanha) => campanha.id !== editId)
    );
    handleCloseModal(); // Fecha o modal após a exclusão
  };

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

        {/* Botão "Adicionar Campanha" posicionado à direita */}
        <div className="flex justify-end mt-4">
          <button
            onClick={handleOpenAddModal}
            className="bg-[#80F87E] bg-opacity-16 text-[#85FF4C] px-4 py-2 text-sm rounded-md transition-transform duration-300 ease-in-out hover:scale-105 "
            style={{ backgroundColor: "rgba(128, 248, 126, 0.16)" }}
          >
            Adicionar Campanha
          </button>
        </div>

        {/* Tabela de campanhas */}
        <div className="mt-2">
          <div className="grid grid-cols-12 gap-4 text-left text-gray-400 uppercase text-sm bg-[#2D2D2D] p-4 rounded-[5px]">
            <div className="col-span-2">Marca</div>
            <div className="col-span-2">Solicitação</div>
            <div className="col-span-2">País</div>
            <div className="col-span-3">Condições</div>
            <div className="col-span-2">Comissão</div>
            <div className="col-span-1 text-center">Ações</div>
          </div>

          {/* Renderizar as campanhas dinâmicas */}
          {campanhas.map((campanha) => (
            <div
              key={campanha.id}
              className="grid grid-cols-12 gap-4 items-center text-white text-sm bg-[#2D2D2D] p-4 rounded-[5px] mt-2 hover:bg-[#3A3A3A]"
            >
              <div className="col-span-2">
                {campanha.imagem ? (
                  <img
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
                  <button
                    className="flex items-center gap-2 px-4 py-1 border border-green-500 text-green-500 rounded-full hover:bg-green-500 hover:text-white transition"
                    onClick={() => handleFazerPedido(campanha.id)} // Chama a função com o ID da campanha
                  >
                    Pedido <IoCheckmarkSharp />
                  </button>
                )}
              </div>
              <div className="col-span-2">{campanha.pais}</div>
              <div className="col-span-3">{campanha.condicoes}</div>
              <div className="col-span-2">{campanha.comissao}</div>
              <div className="col-span-1 text-center">
                <button
                  className="text-white"
                  onClick={() =>
                    handleOpenEditModal(
                      campanha.id,
                      campanha.condicoes,
                      campanha.comissao,
                      campanha.imagem
                    )
                  }
                >
                  <IoSettingsSharp size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal de Edição */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-semibold text-center mb-4">
              Editar Campanha
            </h3>
            <p className="text-gray-500 text-center mb-6">
              Atualize as condições, comissão e a imagem da campanha.
            </p>

            {/* Campo para alterar a imagem */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Imagem da Campanha
              </label>
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleEditImagemChange} // Função para trocar a imagem
                className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
              />
              {editImagem && (
                <img
                  src={editImagem}
                  alt="Preview"
                  className="w-[70px] h-[35px] object-cover mt-2 rounded-[3px]" // Preview da imagem
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
                onClick={handleUpdateCampanha}
                className="bg-green-500 text-white py-2 px-4 rounded-full w-full hover:bg-green-600 transition"
                style={{boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", borderRadius: "80px", width: "160px" }} // Mantém o corner radius e largura
              >
                Concluir
              </button>
            </div>

            <div className="text-center mt-2">
              <button
                onClick={handleExcluirCampanha}
                className="bg-red-500 text-white py-2 px-6 rounded-full hover:bg-red-600 transition"
                style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", borderRadius: "80px", width: "115px" }} // Mantém o corner radius e largura
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

      {/* Modal de Adicionar Campanha */}
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
                value={novoNome}
                onChange={(e) => setNovoNome(e.target.value)}
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
                onChange={handleImagemChange}
                className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                País
              </label>
              <input
                type="text"
                value={novoPais}
                onChange={(e) => setNovoPais(e.target.value)}
                className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Condições
              </label>
              <input
                type="text"
                value={novoCondicoes}
                onChange={(e) => setNovoCondicoes(e.target.value)}
                className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Comissão
              </label>
              <input
                type="text"
                value={novoComissao}
                onChange={(e) => setNovoComissao(e.target.value)}
                className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
              />
            </div>

            <button
              onClick={handleAdicionarCampanha}
              className="bg-green-500 text-white py-3 px-8 rounded-full hover:shadow-lg transition-all hover:bg-green-600 transition"
              style={{
    
                fontSize: "16px", // Tamanho de fonte similar ao print
                fontWeight: "500", // Peso da fonte para ficar mais destacado
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Sombra leve para destaque
                width: "fit-content", // Ajusta o tamanho ao conteúdo
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
