"use client";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import search from "@/assets/search.svg";
import { RiHomeFill } from "react-icons/ri";
import { FaStar, FaUser } from "react-icons/fa";
import { HiPuzzlePiece } from "react-icons/hi2";
import { MdOutlineAttachMoney } from "react-icons/md";
import { usePathname } from "next/navigation";
import { GoChevronRight } from "react-icons/go";
import { IoStatsChartOutline } from "react-icons/io5";
import Link from "next/link";
import avatar from "@/assets/avatar.svg";

export default function SideBar() {
  return (
    <>
      <aside className="w-[300px] h-screen bg-black flex flex-col pt-8 border-r border-[#000000] fixed">
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

        <NavigateOptions />
      </aside>
    </>
  );
}

const NavigateOptions = () => {
  const path = usePathname();

  return (
    <>
      <nav className="w-full flex flex-col items-center mt-8">
        <ul className="flex flex-col items-center w-full gap-3 border-b border-white/30 pb-8">
          {options.map((item, idx: number) => (
            <Link
              key={idx}
              href={item.path}
              className={`flex h-10 w-11/12 items-center px-3 gap-2 text-white rounded-xl ${
                path === item.path
                  ? "text-green-primary bg-green-secondary"
                  : "text-white"
              }`}
            >
              <div className="w-full flex items-center gap-1">
                <figure className="w-8 flex justify-center">{item.icon}</figure>
                <p className="font-medium text-sm">{item.title}</p>
              </div>
              {item.chevron && <GoChevronRight size={14} color="#ffffff5e" />}
            </Link>
          ))}
        </ul>

        <Link
          href="/estatisticas"
          className={`flex h-10 w-11/12 items-center px-3 gap-2 text-white mt-6 rounded-xl ${
            path === "configuracoes"
              ? "text-green-primary bg-green-secondary"
              : "text-white"
          }`}
        >
          <div className="w-full flex items-center gap-1">
            <figure className="w-8 flex justify-center">
              <IoStatsChartOutline size={22} />
            </figure>
            <p className="font-medium text-sm">Estatísticas</p>
          </div>
        </Link>

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
              <Image src={avatar} alt="Avatar" className="min-w-[44px] h-[44px]" />
            </figure>
            <span className="flex flex-col w-full">
              <p className="font-medium">Cláudio</p>
              <span className="text-[#AEB9E1] text-xs flex w-full justify-between">
                Configurações da conta
                <GoChevronRight size={14} color="#AEB9E1" />
              </span>
            </span>
          </div>
        </Link>
      </nav>
    </>
  );
};

const options = [
  {
    icon: <RiHomeFill size={22} />,
    title: "Painel de controle",
    path: "/",
    chevron: false,
  },
  {
    icon: <FaStar size={22} />,
    title: "Lista de campanhas",
    path: "/lista-de-campanhas",
    chevron: false,
  },
  {
    icon: <HiPuzzlePiece size={22} />,
    title: "Campanhas ativas",
    path: "/campanhas-ativas",
    chevron: false,
  },
  {
    icon: <MdOutlineAttachMoney size={26} />,
    title: "Faturamento e caixa",
    path: "/faturamento-caixa",
    chevron: false,
  },
  {
    icon: <FaUser size={18} />,
    title: "Afiliados",
    path: "/afiliados",
    chevron: false,
  },
];
