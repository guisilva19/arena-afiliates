import { BsThreeDots } from "react-icons/bs";
import { FaStar, FaUser } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { PiEyeFill } from "react-icons/pi";

export default function CardsStatistics({ dados }: { dados: any }) {
  return (
    <>
      <ul className="flex gap-5">
        <li className="w-full h-32 bg-[#212121] rounded-lg flex flex-col justify-between p-5">
          <section className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PiEyeFill size={18} />
              <p className="text-sm font-medium">Interações com links</p>
            </div>
            <button>
              <BsThreeDots />
            </button>
          </section>
          <span>
            <p className="text-3xl font-semibold">{dados.cliques}</p>
          </span>
        </li>
        <li className="w-full h-32 bg-[#212121] rounded-lg flex flex-col justify-between p-5">
          <section className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaUser size={18} />
              <p className="text-sm font-medium">Registros</p>
            </div>
            <button>
              <BsThreeDots />
            </button>
          </section>
          <span>
            <p className="text-3xl font-semibold">{dados.registros}</p>
          </span>
        </li>
        <li className="w-full h-32 bg-[#212121] rounded-lg flex flex-col justify-between p-5">
          <section className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <IoIosAddCircle size={18} />
              <p className="text-sm font-medium">Novos afiliados</p>
            </div>
            <button>
              <BsThreeDots />
            </button>
          </section>
          <span>
            <p className="text-3xl font-semibold">{dados.afiliados}</p>
          </span>
        </li>
        <li className="w-full h-32 bg-[#212121] rounded-lg flex flex-col justify-between p-5">
          <section className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaStar size={18} />
              <p className="text-sm font-medium">Usuários pagantes</p>
            </div>
            <button>
              <BsThreeDots />
            </button>
          </section>
          <span>
            <p className="text-3xl font-semibold">
              {dados.contas_depositantes}
            </p>
          </span>
        </li>
      </ul>
    </>
  );
}
