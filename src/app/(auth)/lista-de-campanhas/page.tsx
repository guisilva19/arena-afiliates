"use client";

import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IoSearch, IoCheckmarkSharp } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import { FiUser, FiFileText, FiPercent, FiTool } from "react-icons/fi";
import { FaCodePullRequest } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaCampanha } from "@/utils/schema";
import { toast } from "sonner";
import useCampaign from "@/hook/useCampaign";
import { MdOutlineFormatColorText } from "react-icons/md";
import CampaignItem from "@/components/CampaignItem/CampaignItem";

export default function ListCampaings() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { list } = useCampaign();

  const [campanhas, setCampanhas] = useState<any>([]);
  const [requests, setRequests] = useState<string[]>([]);

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

    get();
  }, []);

  const get = async () => {
    setCampanhas(await list());
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

        {user?.tipo === 1 && (
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
          <div
            className={`grid  ${
              user?.tipo === 1 ? "grid-cols-10" : "grid-cols-11"
            }  gap-4 text-left text-gray-400 uppercase text-sm bg-[#2D2D2D] p-4 rounded-[5px]`}
          >
            <div className="col-span-2 flex items-center gap-2">
              <FiUser size={16} /> Marca
            </div>
            {user?.tipo === 2 && (
              <div className="col-span-2 flex items-center gap-2">
                <FaCodePullRequest size={16} /> Solicitação
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
            {user?.tipo === 1 && (
              <div className="col-span-1 flex items-center justify-center gap-2">
                <FiTool size={16} /> Ações
              </div>
            )}
          </div>

          {campanhas.map((campanha: any, idx: number) => (
            <CampaignItem
              campanha={campanha}
              key={idx}
              setIsModalOpen={setIsModalOpen}
              user={user}
              setRequests={setRequests}
              requests={requests}
            />
          ))}
        </div>
      </main>

      {isModalOpen && <ModalEdit handleCloseModal={handleCloseModal} />}

      {isAddModalOpen && (
        <ModalAdd
          handleCloseModal={handleCloseModal}
          setCampanhas={setCampanhas}
          campanhas={campanhas}
        />
      )}
    </>
  );
}

const ModalAdd = ({
  handleCloseModal,
  setCampanhas,
  campanhas,
}: {
  handleCloseModal: () => void;
  setCampanhas: Dispatch<SetStateAction<any>>;
  campanhas: any;
}) => {
  const [file, setFile] = useState<any>();
  const { create } = useCampaign();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaCampanha),
  });

  const handle = async (data: any) => {
    if (file) {
      handleCloseModal();
      const response = await create({ ...data, logo: file });
      setCampanhas([...campanhas, response]);
      reset();
    } else {
      toast.error("Insira a logo da marca");
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <form
          onSubmit={handleSubmit(handle)}
          className="bg-white p-8 rounded-lg max-w-md w-full"
        >
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
              {...register("nome")}
              type="text"
              className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
            />
            {errors.nome && (
              <p className="text-red-500 text-xs">{errors.nome.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Imagem da Campanha
            </label>
            <input
              onChange={(e: any) => {
                const file = e.target.files[0];
                setFile(file);
                return file;
              }}
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Condições
            </label>
            <input
              {...register("condicao")}
              type="text"
              className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
            />
            {errors.condicao && (
              <p className="text-red-500 text-xs">{errors.condicao.message}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Comissão
            </label>
            <input
              {...register("comissao")}
              type="text"
              className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
            />
            {errors.comissao && (
              <p className="text-red-500 text-xs">{errors.comissao.message}</p>
            )}
          </div>

          <div className="flex w-full justify-between max-h-12">
            <button
              // onClick={}
              type="submit"
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
              className="text-gray-500 text-center px-6 hover:bg-red-500 hover:text-white rounded-full duration-400"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

const ModalEdit = ({ handleCloseModal }: { handleCloseModal: () => void }) => {
  const [editCondicoes, setEditCondicoes] = useState("");
  const [editComissao, setEditComissao] = useState("");
  const [editImagem, setEditImagem] = useState(null);

  return (
    <>
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
    </>
  );
};
