import Image from "next/image";
import { BsFire, BsLightningChargeFill, BsThreeDots } from "react-icons/bs";
import { FaStar, FaUser } from "react-icons/fa";
import { IoIosAddCircle, IoIosPricetag } from "react-icons/io";
import { PiEyeFill } from "react-icons/pi";

import ftd from "@/assets/ftd.svg";
import { IoCashSharp, IoGameController, IoWallet } from "react-icons/io5";
import { MdOutlineAttachMoney } from "react-icons/md";
import { LiaCashRegisterSolid } from "react-icons/lia";

export default function CardsStatisticsAfiliate({ dados }: { dados: any }) {
  return (
    <>
      <ul className="grid grid-cols-4 gap-5">
        <li className="w-full h-32 bg-[#212121] rounded-lg flex flex-col justify-between p-5">
          <section className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PiEyeFill size={16} color="#85FF4C" />
              <p className="text-sm font-medium">Interações com links</p>
            </div>
            <button>
              <BsThreeDots />
            </button>
          </section>
          <span>
            <p className="text-3xl font-semibold">
              {dados?.cliques === undefined ? 0 : dados?.cliques}
            </p>
          </span>
        </li>
        <li className="w-full h-32 bg-[#212121] rounded-lg flex flex-col justify-between p-5">
          <section className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaUser size={14} color="#85FF4C" />
              <p className="text-sm font-medium">Registros</p>
            </div>
            <button>
              <BsThreeDots />
            </button>
          </section>
          <span>
            <p className="text-3xl font-semibold">
              {dados?.registros === undefined ? 0 : dados?.registros}
            </p>
          </span>
        </li>
        <li className="w-full h-32 bg-[#212121] rounded-lg flex flex-col justify-between p-5">
          <section className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image src={ftd} alt="ftd" />
              <p className="text-sm font-medium">Contagem FTD</p>
            </div>
            <button>
              <BsThreeDots />
            </button>
          </section>
          <span>
            <p className="text-3xl font-semibold">
              {dados?.contagem_ftd === undefined ? 0 : dados?.contagem_ftd}
            </p>
          </span>
        </li>
        <li className="w-full h-32 bg-[#212121] rounded-lg flex flex-col justify-between p-5">
          <section className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <IoIosAddCircle size={18} color="#85FF4C" />
              <p className="text-sm font-medium">Contagem CPA</p>
            </div>
            <button>
              <BsThreeDots />
            </button>
          </section>
          <span>
            <p className="text-3xl font-semibold">
              {dados?.contagem_cpa === undefined ? 0 : dados?.contagem_cpa}
            </p>
          </span>
        </li>

        {/* <li className="w-full h-32 bg-[#212121] rounded-lg flex flex-col justify-between p-5">
          <section className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaStar size={18} color="#85FF4C" />
              <p className="text-sm font-medium">Depositantes</p>
            </div>
            <button>
              <BsThreeDots />
            </button>
          </section>
          <span>
            <p className="text-3xl font-semibold">
              {dados?.contas_depositantes === undefined
                ? 0
                : dados?.contas_depositantes}
            </p>
          </span>
        </li> */}
        <li className="w-full h-32 bg-[#212121] rounded-lg flex flex-col justify-between p-5">
          <section className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BsFire size={18} color="#85FF4C" />
              <p className="text-sm font-medium">Contagem Depósitos</p>
            </div>
            <button>
              <BsThreeDots />
            </button>
          </section>
          <span>
            <p className="text-3xl font-semibold">
              {dados?.depositos === undefined ? 0 : dados?.depositos}
            </p>
          </span>
        </li>
        <li className="w-full h-32 bg-[#212121] rounded-lg flex flex-col justify-between p-5">
          <section className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LiaCashRegisterSolid size={18} color="#85FF4C" />
              <p className="text-sm font-medium">Valor de Depósitos</p>
            </div>
            <button>
              <BsThreeDots />
            </button>
          </section>
          <span>
            <p className="text-3xl font-semibold">
              {dados?.valor_de_depositos === undefined
                ? 0
                : `$ ${dados.valor_de_depositos.toFixed(2).replace(".", ",")}`}
            </p>
          </span>
        </li>
        <li className="w-full h-32 bg-[#212121] rounded-lg flex flex-col justify-between p-5">
          <section className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BsLightningChargeFill size={18} color="#85FF4C" />
              <p className="text-sm font-medium">Contas ativas</p>
            </div>
            <button>
              <BsThreeDots />
            </button>
          </section>
          <span>
            <p className="text-3xl font-semibold">
              {dados?.contas_ativas === undefined ? 0 : dados?.contas_ativas}
            </p>
          </span>
        </li>
        <li className="w-full h-32 bg-[#212121] rounded-lg flex flex-col justify-between p-5">
          <section className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <IoGameController size={18} color="#85FF4C" />
              <p className="text-sm font-medium">Stakes</p>
            </div>
            <button>
              <BsThreeDots />
            </button>
          </section>
          <span>
            <p className="text-3xl font-semibold">
              {dados?.stakes === undefined
                ? 0
                : `$ ${dados.stakes.toFixed(2).replace(".", ",")}`}
            </p>
          </span>
        </li>
        <li className="w-full h-32 bg-[#212121] rounded-lg flex flex-col justify-between p-5">
          <section className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MdOutlineAttachMoney size={18} color="#85FF4C" />
              <p className="text-sm font-medium">Receita líquida</p>
            </div>
            <button>
              <BsThreeDots />
            </button>
          </section>
          <span>
            <p className="text-3xl font-semibold">
              {dados?.receita_liquida === undefined
                ? 0
                : `$ ${dados?.receita_liquida.toFixed(2).replace(".", ",")}`}
            </p>
          </span>
        </li>
        <li className="w-full h-32 bg-[#212121] rounded-lg flex flex-col justify-between p-5">
          <section className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <IoIosPricetag size={18} color="#85FF4C" />
              <p className="text-sm font-medium">Comissão RevShare</p>
            </div>
            <button>
              <BsThreeDots />
            </button>
          </section>
          <span>
            <p className="text-3xl font-semibold">
              {dados?.comissao_revshare === undefined
                ? 0
                : `$ ${dados?.comissao_revshare.toFixed(2).replace(".", ",")}`}
            </p>
          </span>
        </li>
        <li className="w-full h-32 bg-[#212121] rounded-lg flex flex-col justify-between p-5">
          <section className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <IoWallet size={18} color="#85FF4C" />
              <p className="text-sm font-medium">Comissão CPA</p>
            </div>
            <button>
              <BsThreeDots />
            </button>
          </section>
          <span>
            <p className="text-3xl font-semibold">
              {dados?.comissao_cpa === undefined
                ? 0
                : `$ ${dados?.comissao_cpa.toFixed(2).replace(".", ",")}`}
            </p>
          </span>
        </li>

        <li className="w-full h-32 bg-[#212121] rounded-lg flex flex-col justify-between p-5">
          <section className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <IoCashSharp size={18} color="#85FF4C" />
              <p className="text-sm font-medium">Comissão Total</p>
            </div>
            <button>
              <BsThreeDots />
            </button>
          </section>
          <span>
            <p className="text-3xl font-semibold">
              {dados?.comissao_revshare === undefined ||
              dados?.comissao_cpa === undefined
                ? 0
                : `$ ${(dados.comissao_revshare + dados.comissao_cpa)
                    .toFixed(2)
                    .replace(".", ",")}`}
            </p>
          </span>
        </li>
      </ul>
    </>
  );
}
