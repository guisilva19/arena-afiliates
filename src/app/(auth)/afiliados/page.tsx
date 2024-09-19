import { BiSearch } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { FaHeart, FaUser } from "react-icons/fa";
import { HiDotsCircleHorizontal } from "react-icons/hi";
import { HiUsers } from "react-icons/hi2";

export default function Afiliates() {
  return (
    <>
      <main className="w-[calc(100vw-300px)] ml-[300px] h-screen px-8 pt-8 text-white">
        <div className="bg-transparent w-full h-20 px-4 py-5 flex items-center mb-7 gap-10">
          <h3 className="text-white text-2xl font-medium">Afiliados</h3>
          <form className="flex gap-6 items-center justify-between w-full">
            <fieldset className="bg-[#2d2d2d] w-[350px] h-[44px] flex items-center text-white gap-2 pl-[12px] rounded-md">
              <BiSearch size={18} className="text-white" />
              <input
                type="text"
                className="bg-[#2d2d2d] text-white placeholder:text-white outline-none text-sm w-full"
                placeholder="Procurar por..."
              />
            </fieldset>
            <button className="min-w-[220px] text-sm h-[38px] bg-green-secondary text-green-primary flex items-center justify-center rounded-md">
              Adicionar afiliado
            </button>
          </form>
        </div>

        <Cards />
      </main>
    </>
  );
}

const Cards = () => {
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
              <p>250</p>
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
              <p>15</p>
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
              <p>200</p>
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
              <p>35</p>
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
