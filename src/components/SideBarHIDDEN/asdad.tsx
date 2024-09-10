import Image from "next/image";
import chevron from "@/assets/chevron-left.svg";
import flag from "@/assets/flag.svg";
import saves from "@/assets/saves.svg";
import savemark from "@/assets/savemark.svg";
import statistics from "@/assets/statistics.svg";
import wallet from "@/assets/wallet.svg";
import notifications from "@/assets/notifications.svg";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ISideBarItem {
  icon: string | StaticImport;
  title: string;
  path: string;
}

export default function SideBarHIDDEN() {
  const [isMostSideBar, setIsMostSideBar] = useState<boolean>(false);

  return (
    <>
      <motion.aside
        initial={{ width: "5rem" }}
        animate={{ width: isMostSideBar ? "16rem" : "5rem" }}
        transition={{ duration: 0.5 }}
        className="h-screen bg-black fixed left-0 top-0"
      >
        <section
          className="w-full h-20 flex items-center px-5 cursor-pointer group"
          onClick={() => setIsMostSideBar(!isMostSideBar)}
        >
          <button
            className="hover:scale-110 duration-200"
            onClick={() => setIsMostSideBar(!isMostSideBar)}
          >
            <Image
              src={chevron}
              alt="chevron-left"
              width={40}
              height={40}
              className={`${
                isMostSideBar ? "rotate-180" : ""
              } transition-transform duration-300`}
            />
          </button>
          {isMostSideBar && (
            <motion.div
              className="text-white group-hover:scale-[1.03] transition-transform duration-200"
              initial={{ opacity: 0, width: 0, marginLeft: 0 }}
              animate={{ opacity: 1, marginLeft: 16 }}
              transition={{ delay: 0 * 0.15 }}
            >
              <p className="w-max">Fechar</p>
            </motion.div>
          )}
        </section>
        <ul>
          {dataSideBar.map((item: ISideBarItem, idx: number) => (
            <motion.li
              className="h-[74px] flex items-center px-5 cursor-pointer group"
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <button className="w-10 h-10 bg-[#4CFF4C1F] rounded-sm flex justify-center items-center group-hover:scale-110 transition-transform duration-200">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={28}
                  height={28}
                />
              </button>
              <AnimatePresence>
                {isMostSideBar && (
                  <motion.div
                    className="text-white group-hover:scale-[1.03] transition-transform duration-200"
                    initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                    animate={{ opacity: 1, marginLeft: 16 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <p className="w-max">{item.title}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>
          ))}
        </ul>
      </motion.aside>
    </>
  );
}

const dataSideBar = [
  {
    icon: flag,
    title: "Painel de controle",
    path: "/painel-de-controle",
  },
  {
    icon: saves,
    title: "Lista de campanhas",
    path: "/lista-de-campanhas",
  },
  {
    icon: savemark,
    title: "Campanhas ativas",
    path: "/campanhas-ativas",
  },
  {
    icon: statistics,
    title: "Estatísticas",
    path: "/estatisticas",
  },
  {
    icon: wallet,
    title: "Faturamento",
    path: "/faturamento",
  },
  {
    icon: notifications,
    title: "Notificações",
    path: "/notificacoes",
  },
];
