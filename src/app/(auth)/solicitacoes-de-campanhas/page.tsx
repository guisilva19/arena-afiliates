"use client";

import useCampaign from "@/hook/useCampaign";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaCodePullRequest } from "react-icons/fa6";
import { FiFileText, FiPercent, FiTool, FiUser } from "react-icons/fi";
import {
  IoSearch,
  IoCheckmarkSharp,
  IoSettingsSharp,
  IoCopyOutline,
} from "react-icons/io5";
import { MdOutlineFormatColorText } from "react-icons/md";
import { toast } from "sonner";

export default function ListCampaings() {
  const [pedidoSolicitado, setPedidoSolicitado] = useState(false);
  const [isModalLinkOpen, setIsModalLinkOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [campanhas, setCampanhas] = useState<any>([]);
  const [campanha, setCampanha] = useState<any>();
  const { listRequests } = useCampaign();

  const handleCloseModal = () => {
    setIsModalLinkOpen(false);
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
    try {
      setIsLoading(true);
      setCampanhas(await listRequests());
    } finally {
      setIsLoading(false);
    }
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
          {campanhas.map((campanha: any, idx: number) => {
            return (
              <div
                key={idx}
                className={`grid ${
                  user?.tipo === 1 ? "grid-cols-10" : "grid-cols-11"
                } gap-4 items-center text-white text-sm bg-[#2D2D2D] p-4 rounded-[5px] mt-2 hover:bg-[#3A3A3A]`}
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

                <p className="col-span-2">{campanha?.usuario.nome}</p>
                <p className="col-span-3">{campanha?.condicao}</p>
                <p className="col-span-2">{campanha?.comissao}</p>
                <div className="col-span-1 text-center">
                  <button
                    className="text-white"
                    onClick={() => {
                      setIsModalLinkOpen(true);
                      setCampanha(campanha);
                    }}
                  >
                    <IoSettingsSharp size={20} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {isModalLinkOpen && (
        <ModalEdit
          handleCloseModal={handleCloseModal}
          campanha={campanha}
          setCampanhas={setCampanhas}
          campanhas={campanhas}
        />
      )}
    </>
  );
}

const ModalEdit = ({
  handleCloseModal,
  campanha,
  setCampanhas,
  campanhas,
}: {
  handleCloseModal: () => void;
  campanha: any;
  setCampanhas: any;
  campanhas: any;
}) => {
  const [editCondicoes, setEditCondicoes] = useState(campanha.condicao);
  const [editComissao, setEditComissao] = useState(campanha.comissao);
  const [editLink, setEditLink] = useState(campanha.link);

  const { linkAfiliate } = useCampaign();

  const handle = async (e: any) => {
    e.preventDefault();
    if (editLink === null || editLink.length === 0 || !editLink) {
      toast.error("Insira o link de afiliado para prosseguir!");
      return;
    } else {
      const result = await linkAfiliate(campanha.id, {
        comissao: editComissao,
        link: editLink,
        condicao: editCondicoes,
        status: true,
      });
      if (result) {
        const fltered = campanhas.filter(
          (item: any) => item.id !== campanha.id
        );
        setCampanhas(fltered);
      }
      handleCloseModal();
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <form
          onSubmit={handle}
          className="bg-white p-8 rounded-lg max-w-md w-full"
        >
          <h3 className="text-xl font-semibold text-center mb-4">
            Solicitação
          </h3>
          <p className="text-gray-500 text-center mb-6">
            Atualize as condições, comissão e adicione o link do afiliado.
          </p>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Link
            </label>
            <input
              type="text"
              value={editLink}
              onChange={(e) => setEditLink(e.target.value)}
              className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
            />
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
              type="submit"
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

          <button
            onClick={handleCloseModal}
            className="mt-2 text-gray-500 text-center w-full"
          >
            Cancelar
          </button>
        </form>
      </div>
    </>
  );
};
