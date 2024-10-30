"use client";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import search from "@/assets/search.svg";
import Link from "next/link";

import { FaStar, FaUser } from "react-icons/fa";
import { HiPuzzlePiece } from "react-icons/hi2";
import { MdOutlineAttachMoney } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";
import { GoChevronRight } from "react-icons/go";
import { truncateText } from "@/utils/truncate";
import { useEffect } from "react";
import { FiLogOut } from "react-icons/fi";
import { Avatar } from "@nextui-org/react";
import { useGlobalContext } from "@/context/context";

export default function SideBar() {
  const router = useRouter();

  const { user, setUser } = useGlobalContext();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storage = localStorage.getItem("user");
      if (storage) {
        setUser(JSON.parse(storage));
      }
    }
  }, []);

  const path = usePathname();

  return (
    <aside className="w-[300px] h-screen bg-black flex flex-col pt-8 border-r border-[#000000] fixed justify-between">
      <div>
        <figure className="w-full flex justify-center">
          <Image src={logo} alt="LOGO" width={200} />
        </figure>

        <section className="w-full flex justify-center mt-8">
          <fieldset className="bg-[#35363A] border border-[#343B4F] h-10 w-11/12 flex items-center text-white gap-2 pl-[12px] rounded-md">
            <Image src={search} alt="" width={18} />
            <input
              type="text"
              className="bg-[#35363A] text-white placeholder:text-white outline-none text-sm w-full"
              placeholder="Procurar por..."
            />
          </fieldset>
        </section>

        <NavigateOptions user={user} />
      </div>
      <button
        onClick={() => {
          localStorage.removeItem("user");
          router.push("/");
        }}
        className="flex h-12 w-10/12 items-center px-3 gap-2 text-white rounded-xl mx-auto mb-2 hover:bg-[#ffffff17] duration-400"
      >
        <FiLogOut size={24} />
        <p>Logout</p>
      </button>
    </aside>
  );
}

const NavigateOptions = ({ user }: { user: any }) => {
  const path = usePathname();

  return (
    <nav className="w-full flex flex-col items-center mt-8">
      <ul className="flex flex-col items-center w-full gap-3 border-b border-white/30 pb-8">
        <Link
          href={"/dashboard"}
          className={`flex h-10 w-11/12 items-center px-3 gap-2 text-white rounded-xl ${
            path === "/dashboard"
              ? "text-green-primary bg-green-secondary"
              : "text-white"
          }`}
        >
          <div className="w-full flex items-center gap-1">
            <figure className="w-8 flex justify-center">
              <FaUser />
            </figure>
            <p className="font-medium text-sm">Painel de controle</p>
          </div>
        </Link>

        <Link
          href={"/lista-de-campanhas"}
          className={`flex h-10 w-11/12 items-center px-3 gap-2 text-white rounded-xl ${
            path === "/lista-de-campanhas"
              ? "text-green-primary bg-green-secondary"
              : "text-white"
          }`}
        >
          <div className="w-full flex items-center gap-1">
            <figure className="w-8 flex justify-center">
              <FaStar size={22} />
            </figure>
            <p className="font-medium text-sm">Lista de campanhas</p>
          </div>
        </Link>

        <Link
          href={
            user?.tipo === 1
              ? "/solicitacoes-de-campanhas"
              : "/campanhas-ativas"
          }
          className={`flex h-10 w-11/12 items-center px-3 gap-2 text-white rounded-xl ${
            path ===
            `${
              user?.tipo === 1
                ? "/solicitacoes-de-campanhas"
                : "/campanhas-ativas"
            }`
              ? "text-green-primary bg-green-secondary"
              : "text-white"
          }`}
        >
          <div className="w-full flex items-center gap-1">
            <figure className="w-8 flex justify-center">
              <HiPuzzlePiece size={26} />
            </figure>
            <p className="font-medium text-sm">
              {user?.tipo === 1
                ? "Solicitações de campanhas"
                : "Campanhas ativas"}
            </p>
          </div>
        </Link>

        <Link
          href={"/faturamento-caixa"}
          className={`flex h-10 w-11/12 items-center px-3 gap-2 text-white rounded-xl ${
            path === "/faturamento-caixa"
              ? "text-green-primary bg-green-secondary"
              : "text-white"
          }`}
        >
          <div className="w-full flex items-center gap-1">
            <figure className="w-8 flex justify-center">
              <MdOutlineAttachMoney size={26} />
            </figure>
            <p className="font-medium text-sm">Faturamento e caixa</p>
          </div>
        </Link>

        {user?.tipo === 1 && (
          <Link
            href={"/afiliados"}
            className={`flex h-10 w-11/12 items-center px-3 gap-2 text-white rounded-xl ${
              path === "/afiliados"
                ? "text-green-primary bg-green-secondary"
                : "text-white"
            }`}
          >
            <div className="w-full flex items-center gap-1">
              <figure className="w-8 flex justify-center">
                <FaUser />
              </figure>
              <p className="font-medium text-sm">Afiliados</p>
            </div>
          </Link>
        )}
      </ul>

      <Link
        href="/configuracoes"
        className={`flex h-10 w-11/12 items-center px-3 gap-2 text-white mt-6 rounded-xl ${
          path === "configuracoes"
            ? "text-green-primary bg-green-secondary"
            : "text-white"
        }`}
      >
        <div className="w-full flex items-center gap-2">
          <figure className="min-w-[44px] flex justify-center rounded-full">
            {user?.foto === null ? (
              <Avatar name={user?.nome} />
            ) : (
              <Image
                src={user?.foto}
                alt={user?.nome}
                width={44}
                height={44}
                className="min-w-[44px] h-[44px] rounded-full"
              />
            )}
          </figure>
          <span className="flex flex-col w-full">
            <p className="font-medium">{truncateText(user?.nome, 20)}</p>
            <span className="text-[#FFFFFF] text-xs flex w-full justify-between">
              Configurações da conta
              <GoChevronRight size={14} color="#FFFFFF" />
            </span>
          </span>
        </div>
      </Link>
    </nav>
  );
};
