"use client";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { FaHeart, FaUser } from "react-icons/fa";
import { HiDotsCircleHorizontal } from "react-icons/hi";
import { HiUsers } from "react-icons/hi2";
import { IoSettingsSharp } from "react-icons/io5";
import { FiUser, FiPhone, FiMapPin, FiFileText, FiPercent, FiTool } from "react-icons/fi"; // Ícones

export default function Afiliates() {
  const [isModalOpen, setIsModalOpen] = useState(false); // Controle do modal de adicionar afiliado
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Controle do modal de edição
  const [selectedAfiliado, setSelectedAfiliado] = useState(null); // Afiliado selecionado para edição

  // Estado dos campos do modal de adicionar e editar afiliado
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [estado, setEstado] = useState("");
  const [condicoes, setCondicoes] = useState("");
  const [comissao, setComissao] = useState("");
  const [link, setLink] = useState("");

  const handleAddAfiliado = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenEditModal = (afiliado) => {
    // Preenche os campos do modal de edição com os dados do afiliado
    setSelectedAfiliado(afiliado);
    setNome(afiliado.nome);
    setTelefone(afiliado.telefone);
    setEmail(afiliado.email);
    setEstado(afiliado.estado);
    setCondicoes(afiliado.condicoes);
    setComissao(afiliado.comissao);
    setLink(afiliado.link);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleExcluirAfiliado = () => {
    // Lógica para excluir o afiliado
    alert(`Afiliado ${selectedAfiliado.nome} excluído!`);
    setIsEditModalOpen(false);
  };

  return (
    <>
      <main className="w-[calc(100vw-300px)] ml-[300px] h-screen px-8 pt-8 text-white">
        <div className="bg-transparent w-full h-20 px-4 py-5 flex items-center mb-7 gap-10">
          <h3 className="text-white text-2xl font-medium">Afiliados</h3>
          <form className="flex gap-6 items-center justify-between w-full">
            <fieldset className="bg-[#2d2d2d] w-[350px] h-[44px] flex items-center text-white gap-2 pl-[12px] rounded-md">
              <BiSearch size={18} className="text-white" />
              <input
                type="text"
                className="bg-[#2d2d2d] text-white placeholder:text-white outline-none text-sm w-full"
                placeholder="Procurar por..."
              />
            </fieldset>
            <button
              className="min-w-[220px] text-sm h-[38px] bg-green-secondary text-green-primary flex items-center justify-center rounded-md"
              onClick={handleAddAfiliado}
            >
              Adicionar afiliado
            </button>
          </form>
        </div>

        <Cards handleOpenEditModal={handleOpenEditModal} />

        {/* Tabela de campanhas */}
        <div className="mt-8">
          <div className="grid grid-cols-12 gap-4 text-left text-gray-400 uppercase text-sm bg-[#2D2D2D] p-4 rounded-[5px]">
            <div className="col-span-2 flex items-center gap-2">
              <FiUser size={16} /> Nome
            </div>
            <div className="col-span-2 flex items-center gap-2">
              <FiPhone size={16} /> Telefone
            </div>
            <div className="col-span-2 flex items-center gap-2">
              <FiMapPin size={16} /> Estado
            </div>
            <div className="col-span-3 flex items-center gap-2">
              <FiFileText size={16} /> Condições
            </div>
            <div className="col-span-2 flex items-center gap-2">
              <FiPercent size={16} /> Comissão
            </div>
            <div className="col-span-1 flex items-center justify-center gap-2">
              <FiTool size={16} /> Ações
            </div>
          </div>

          {/* Exemplo de uma linha da tabela */}
          <div className="grid grid-cols-12 gap-4 items-center text-white text-sm bg-[#2D2D2D] p-4 rounded-[5px] mt-2 hover:bg-[#3A3A3A]">
            <div className="col-span-2 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-500 flex-shrink-0"></div>
              <div>
                <p>Carlos Henrique</p>
                <p>carlos@google.com</p>
              </div>
            </div>
            <div className="col-span-2">(21) 99193-4657</div>
            <div className="col-span-2">Rio de Janeiro</div>
            <div className="col-span-3">Depositar R$ 80 / Apostar R$ 80</div>
            <div className="col-span-2">R$ 40 + 20%</div>
            <div className="col-span-1 text-center">
              <button
                onClick={() =>
                  handleOpenEditModal({
                    nome: "Carlos Henrique",
                    telefone: "(21) 99193-4657",
                    email: "carlos@google.com",
                    estado: "Rio de Janeiro",
                    condicoes: "Depositar R$ 80 / Apostar R$ 80",
                    comissao: "R$ 40 + 20%",
                    link: "http://exemplo.com",
                  })
                }
                className="text-white"
              >
                <IoSettingsSharp size={20} />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Modal Adicionar Afiliado */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-semibold text-center mb-4">
              Adicionar Novo Afiliado
            </h3>
            <p className="text-gray-500 text-center mb-6">
              Por favor, preencha os dados abaixo para adicionar um novo afiliado.
            </p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Nome
              </label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Telefone
              </label>
              <input
                type="text"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Estado
              </label>
              <input
                type="text"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Condições
              </label>
              <input
                type="text"
                value={condicoes}
                onChange={(e) => setCondicoes(e.target.value)}
                className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Comissão
              </label>
              <input
                type="text"
                value={comissao}
                onChange={(e) => setComissao(e.target.value)}
                className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Link
              </label>
              <input
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
              />
            </div>

            <button
              onClick={handleCloseModal}
              className="bg-green-500 text-white py-2 px-4 rounded-full w-full hover:bg-green-600 transition"
            >
              Adicionar Afiliado
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

      {/* Modal Editar Afiliado */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-semibold text-center mb-4">
              Editar Afiliado
            </h3>
            <p className="text-gray-500 text-center mb-6">
              Atualize os dados do afiliado abaixo.
            </p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Nome
              </label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Telefone
              </label>
              <input
                type="text"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Estado
              </label>
              <input
                type="text"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Condições
              </label>
              <input
                type="text"
                value={condicoes}
                onChange={(e) => setCondicoes(e.target.value)}
                className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Comissão
              </label>
              <input
                type="text"
                value={comissao}
                onChange={(e) => setComissao(e.target.value)}
                className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Link
              </label>
              <input
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
              />
            </div>

            <button
              onClick={handleCloseEditModal}
              className="bg-green-500 text-white py-2 px-4 rounded-full w-full hover:bg-green-600 transition"
            >
              Atualizar Afiliado
            </button>

            <button
              onClick={handleExcluirAfiliado}
              className="bg-red-500 text-white py-2 px-4 rounded-full w-full mt-2 hover:bg-red-600 transition"
            >
              Excluir Afiliado
            </button>

            <button
              onClick={handleCloseEditModal}
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

const Cards = ({ handleOpenEditModal }) => {
  // Dados fictícios dos afiliados
  const afiliados = [
    {
      nome: "Carlos Henrique",
      telefone: "(21) 99193-4657",
      email: "carlos@google.com",
      estado: "Rio de Janeiro",
      condicoes: "Depositar R$ 80 / Apostar R$ 80",
      comissao: "R$ 40 + 20%",
      link: "http://exemplo.com",
    },
  ];

  return (
    <>
      <ul className="flex gap-5">
        <li className="w-full h-24 bg-[#212121] rounded-lg flex justify-between p-5">
          <div className="flex items-center gap-3">
            <div className="bg-green-secondary w-14 h-14 rounded-full flex items-center justify-center">
              <HiUsers size={24} className="text-green-primary" />
            </div>
            <section>
              <p className="text-sm font-medium">Afiliados</p>
              <p>250</p>
            </section>
          </div>
          <button>
            <BsThreeDots />
          </button>
        </li>
        <li className="w-full h-24 bg-[#212121] rounded-lg flex justify-between p-5">
          <div className="flex items-center gap-3">
            <div className="bg-[#fdb72a4b] w-14 h-14 rounded-full flex items-center justify-center">
              <FaUser size={20} className="text-[#FDB52A]" />
            </div>
            <section>
              <p className="text-sm font-medium">Novos usuários</p>
              <p>15</p>
            </section>
          </div>
          <button>
            <BsThreeDots />
          </button>
        </li>
        <li className="w-full h-24 bg-[#212121] rounded-lg flex justify-between p-5">
          <div className="flex items-center gap-3">
            <div className="bg-[#05c16933] w-14 h-14 rounded-full flex items-center justify-center">
              <FaHeart size={24} className="text-[#05C168]" />
            </div>
            <section>
              <p className="text-sm font-medium">Top afiliados</p>
              <p>200</p>
            </section>
          </div>
          <button>
            <BsThreeDots />
          </button>
        </li>
        <li className="w-full h-24 bg-[#212121] rounded-lg flex justify-between p-5">
          <div className="flex items-center gap-3">
            <div className="bg-[#086dd933] w-14 h-14 rounded-full flex items-center justify-center">
              <HiDotsCircleHorizontal size={24} className="text-[#086CD9]" />
            </div>
            <section>
              <p className="text-sm font-medium">Removidos</p>
              <p>35</p>
            </section>
          </div>
          <button>
            <BsThreeDots />
          </button>
        </li>
      </ul>
    </>
  );
};
