"use client";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { FaHeart, FaUser } from "react-icons/fa";
import { HiDotsCircleHorizontal } from "react-icons/hi";
import { HiUsers } from "react-icons/hi2";
import { IoSettingsSharp } from "react-icons/io5";
import { FiUser, FiPhone, FiFileText, FiPercent, FiTool } from "react-icons/fi";
import CreateAfiliate from "@/components/CreateAfiliate/CreateAfiliate";
import useUser from "@/hook/useUser";
import Loading from "@/components/Loading/Loading";
import EditAfiliate from "@/components/EditAfiliate/EditAfiliate";
import { Avatar } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Afiliates() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAfiliado, setSelectedAfiliado] = useState<any>(null);
  const [users, setUsers] = useState<any>();

  const { getUsers } = useUser();

  const handleAddAfiliado = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseEditModal = () => {
    setSelectedAfiliado(null);
    setIsEditModalOpen(false);
  };

  const handleExcluirAfiliado = () => {
    const filtered = users.afiliados.filter(
      (user: any) => user.id !== selectedAfiliado.id
    );

    setUsers({ ...users, afiliados: filtered });

    setIsEditModalOpen(false);
  };

  useEffect(() => {
    get();
  }, [loading]);

  const get = async () => {
    try {
      setUsers(await getUsers());
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="w-[calc(100vw-300px)] min-h-screen h-max bg-[#171717] pb-20 ml-[300px] px-8 pt-8 text-white">
        <div className="bg-transparent w-full h-20 px-4 py-5 flex items-center mb-7 gap-10">
          <h3 className="text-white text-2xl font-medium">Afiliados</h3>
          <div className="flex gap-6 items-center justify-between w-full">
            <fieldset className="bg-[#2d2d2d] w-[350px] h-[44px] flex items-center text-white gap-2 pl-[12px] rounded-md">
              <BiSearch size={18} className="text-white" />
              <input
                type="text"
                className="bg-[#2d2d2d] text-white placeholder:text-white outline-none text-sm w-full"
                placeholder="Procurar por..."
              />
            </fieldset>
            <button
              type="button"
              className="min-w-[220px] text-sm h-[38px] bg-green-secondary text-green-primary flex items-center justify-center rounded-md"
              onClick={handleAddAfiliado}
            >
              Adicionar afiliado
            </button>
          </div>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <>
            <Cards
              afiliados={users.afiliados_quantidade}
              novos={users.novos_afiliados}
              removidos={users.afiliados_removidos}
              top={users.top_afiliados}
            />

            <div className="mt-8">
              <div className="grid grid-cols-10 gap-4 text-left text-gray-400 uppercase text-sm bg-[#2D2D2D] p-4 rounded-[5px]">
                <div className="col-span-2 flex items-center gap-2">
                  <FiUser size={16} /> Nome
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <FiPhone size={16} /> Telefone
                </div>
                <div className="col-span-3 flex items-center gap-2">
                  <FiFileText size={16} /> Onde vai promover as campanhas
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <FiPercent size={16} /> Url ou canal
                </div>
                <div className="col-span-1 flex items-center justify-center gap-2">
                  <FiTool size={16} /> Ações
                </div>
              </div>

              {users?.afiliados?.length === 0 ? (
                <div className="w-full flex justify-center h-20 items-center">
                  <p>Não existe nenhum afiliado!</p>
                </div>
              ) : (
                <ul>
                  {users?.afiliados?.map((item: any, idx: number) => (
                    <li
                      key={idx}
                      className="grid grid-cols-10 gap-4 items-center text-white text-sm bg-[#2D2D2D] p-4 rounded-[5px] mt-2 hover:bg-[#3A3A3A]"
                    >
                      <div className="col-span-2 flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-full bg-gray-500 flex-shrink-0 cursor-pointer"
                          onClick={() => router.push(`/afiliado/${item.id}`)}
                        >
                          {item?.foto === null ? (
                            <Avatar name={item?.nome} />
                          ) : (
                            <Image
                              src={item?.foto}
                              alt={item?.nome}
                              width={44}
                              height={44}
                              className="min-w-[44px] h-[44px] rounded-full"
                            />
                          )}
                        </div>
                        <div
                          onClick={() => router.push(`/afiliado/${item.id}`)}
                          className="cursor-pointer"
                        >
                          <p>{item.nome}</p>
                          <p>{item.email}</p>
                        </div>
                      </div>
                      <div className="col-span-2 pl-2">{item.telefone}</div>
                      <div className="col-span-3">{item.onde_vai_promover}</div>
                      <div className="col-span-2">
                        <a
                          className="hover:underline"
                          target="_blank"
                          href={
                            item.url_ou_canal?.startsWith("http")
                              ? item.url_ou_canal
                              : `https://${item.url_ou_canal}`
                          }
                        >
                          {item.url_ou_canal}
                        </a>
                      </div>
                      <div className="col-span-1 text-center">
                        <button
                          onClick={() => {
                            setSelectedAfiliado(item);
                            setIsEditModalOpen(true);
                          }}
                          className="text-white"
                        >
                          <IoSettingsSharp size={20} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      </main>
      {isModalOpen && (
        <CreateAfiliate
          handleCloseModal={handleCloseModal}
          setLoading={setLoading}
        />
      )}
      {isEditModalOpen && (
        <EditAfiliate
          handleExcluirAfiliado={handleExcluirAfiliado}
          handleCloseEditModal={handleCloseEditModal}
          afiliado={selectedAfiliado}
          setUsers={setUsers}
          users={users}
          setIsEditModalOpen={setIsEditModalOpen}
        />
      )}
    </>
  );
}

const Cards = ({
  afiliados,
  novos,
  removidos,
  top,
}: {
  afiliados: number;
  novos: number;
  removidos: number;
  top: number;
}) => {
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
              <p>{afiliados}</p>
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
              <p>{novos}</p>
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
              <p>{top}</p>
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
              <p>{removidos}</p>
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
