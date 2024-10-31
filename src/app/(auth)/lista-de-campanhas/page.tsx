"use client";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FiUser, FiFileText, FiPercent, FiTool } from "react-icons/fi";
import { FaCodePullRequest } from "react-icons/fa6";

import { MdOutlineFormatColorText } from "react-icons/md";
import useCampaign from "@/hook/useCampaign";
import CampaignItem from "@/components/CampaignItem/CampaignItem";
import Loading from "@/components/Loading/Loading";
import ModalEditCampaign from "@/components/ModalEditCampaign/ModalEditCampaign";
import ModalAddCampaign from "@/components/ModalAddCampaign/ModalAddCampaign";
import ModalConfirmDelete from "@/components/ModalDeleteCampagn/ModalDeleteCampagn";

export default function ListCampaings() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { list, listRequests } = useCampaign();

  const [campanhas, setCampanhas] = useState<any>([]);
  const [requests, setRequests] = useState<string[]>([]);
  const [campanhaSelected, setCampanhaSelected] = useState<any>();

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
    try {
      setIsLoading(true);
      setCampanhas(await list());
      const response = await listRequests();
      const ids = response.map((item: any) => item.idCampaign);
      setRequests(ids);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <main className="w-[calc(100vw-300px)] ml-[300px] px-8 pt-8 text-white h-screen">
        <div className="bg-[#2D2D2D] w-full h-32 px-4 py-5 flex flex-col justify-between rounded-[5px]">
          <h3 className="text-white text-xl font-medium">
            Localizador de campanhas
          </h3>
          <form className="flex gap-6 items-center">
           
            <fieldset className="w-4/12 flex relative">
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

        {!isLoading ? (
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
                setCampanha={setCampanhaSelected}
                campanha={campanha}
                key={idx}
                setIsModalOpen={setIsModalOpen}
                user={user}
                setRequests={setRequests}
                requests={requests}
              />
            ))}
          </div>
        ) : (
          <div className="w-full h-40 flex items-center justify-center">
            <Loading />
          </div>
        )}
      </main>

      {isModalOpen && (
        <ModalEditCampaign
          handleCloseModal={handleCloseModal}
          campanhaSelected={campanhaSelected}
          setCampanhaSelected={setCampanhaSelected}
          setIsModalDeleteOpen={setIsModalDeleteOpen}
          campanhas={campanhas}
          setCampanhas={setCampanhas}
        />
      )}

      {isAddModalOpen && (
        <ModalAddCampaign
          handleCloseModal={handleCloseModal}
          setCampanhas={setCampanhas}
          campanhas={campanhas}
        />
      )}

      {isModalDeleteOpen && (
        <ModalConfirmDelete
          campanha={campanhaSelected}
          setIsModalDeleteOpen={setIsModalDeleteOpen}
          setCampanhas={setCampanhas}
          campanhas={campanhas}
        />
      )}
    </>
  );
}
