import useCampaign from "@/hook/useCampaign";
import Image from "next/image";
import { useState } from "react";
import {
  IoCheckmarkSharp,
  IoCloseSharp,
  IoSettingsSharp,
} from "react-icons/io5";

export default function CampaignItem({
  campanha,
  user,
  setIsModalOpen,
  requests,
  setRequests,
}: {
  campanha: any;
  user: any;
  setIsModalOpen: any;
  requests: any;
  setRequests: any;
}) {
  const [openRequest, setOpenRequest] = useState<boolean>(false);

  const alreadyRequested = Boolean(
    requests.find((item: string) => item === campanha.id)
  );

  return (
    <>
      <div
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
        {user?.tipo === 2 && (
          <div className="col-span-2">
            {alreadyRequested ? (
              <button className="flex items-center gap-2 px-4 py-1 border border-green-500 text-green-500 rounded-full hover:bg-green-500 hover:text-white transition">
                Solicitado <IoCheckmarkSharp />
              </button>
            ) : (
              <button
                onClick={() => setOpenRequest(true)}
                className="flex items-center gap-2 px-4 py-1 border border-green-500 text-green-500 rounded-full hover:bg-green-500 hover:text-white transition"
              >
                Pedido <IoCheckmarkSharp />
              </button>
            )}
          </div>
        )}
        <p className="col-span-2">{campanha?.nome}</p>
        <p className="col-span-3">{campanha?.condicao}</p>
        <p className="col-span-2">{campanha?.comissao}</p>
        {user?.tipo === 1 && (
          <div className="col-span-1 text-center">
            <button className="text-white" onClick={() => setIsModalOpen(true)}>
              <IoSettingsSharp size={20} />
            </button>
          </div>
        )}
      </div>
      {openRequest && (
        <ModalRequestAfiliate
          campanha={campanha}
          setOpenRequest={setOpenRequest}
          setRequests={setRequests}
        />
      )}
    </>
  );
}

const ModalRequestAfiliate = ({
  campanha,
  setOpenRequest,
  setRequests,
}: {
  campanha: any;
  setOpenRequest: any;
  setRequests: any;
}) => {
  const { requestAfiliate } = useCampaign();

  return (
    <>
      <div className="w-screen h-screen bg-black/50 fixed top-0 right-0 flex justify-center items-center">
        <div className="bg-white w-96 h-40 rounded-lg p-3 text-black flex flex-col justify-between">
          <section className="w-full flex justify-between">
            <h3 className="font-medium text-lg">Solicitar afiliação</h3>
            <button onClick={() => setOpenRequest(false)}>
              <IoCloseSharp size={24} />
            </button>
          </section>
          <section className="flex flex-col items-center mb-3 gap-2">
            <p>
              Você deseja se afiliar á <strong>{campanha.nome}?</strong>
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setOpenRequest(false)}
                className="px-4 py-2 border-red-500 border-2 text-red-500 font-medium hover:bg-red-500 hover:text-white duration-300 hover:scale-105 rounded-md"
              >
                Cancelar
              </button>
              <button
                onClick={async () => {
                  try {
                    await requestAfiliate(campanha.id);
                    setOpenRequest(false);
                    setRequests((prev: string[]) => [...prev, campanha.id]);
                  } finally {
                  }
                }}
                className="px-4 py-2 bg-[#22d440] text-white rounded-md hover:scale-105 duration-300"
              >
                Solicitar
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
