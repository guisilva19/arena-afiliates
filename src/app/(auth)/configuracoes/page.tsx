"use client";

import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function Settings() {
  const [viewPass, setViewPass] = useState(false);

  return (
    <>
      <main className="w-[calc(100vw-300px)] ml-[300px] h-max min-h-screen px-8 pt-8 text-black flex flex-col gap-4 bg-black">
        <div className="flex flex-col gap-4 mt-10 w-[400px] mx-auto">
          <h3 className="text-white font-semibold text-2xl w-full text-center mb-6">
            Atualize seus dados
          </h3>
          <fieldset className="flex flex-col gap-2">
            <label htmlFor="E-mail" className="text-white text-sm font-light">
              Foto do perfil
            </label>
            <input
              type="file"
              id="Foto"
              className="w-full px-4 py-3 outline-none rounded-xl bg-white text-black"
            />
          </fieldset>

          <fieldset className="flex flex-col gap-2">
            <label htmlFor="Senha" className="text-white text-sm font-light">
              Senha nova
            </label>
            <div className="w-full bg-white flex gap-2 px-4 rounded-xl">
              <input
                type={viewPass ? "text" : "password"}
                id="Senha"
                className="w-full outline-none py-3"
              />
              <button type="button" onClick={() => setViewPass(!viewPass)}>
                {viewPass ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
          </fieldset>

          <fieldset className="flex flex-col gap-2">
            <label htmlFor="Senha" className="text-white text-sm font-light">
              Repita senha nova
            </label>
            <div className="w-full bg-white flex gap-2 px-4 rounded-xl">
              <input
                type={viewPass ? "text" : "password"}
                id="Senha"
                className="w-full outline-none py-3"
              />
              <button type="button" onClick={() => setViewPass(!viewPass)}>
                {viewPass ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
          </fieldset>

          <button
            type="submit"
            className=" w-full bg-[#4CFF4C] py-4 rounded-xl mt-8"
          >
            <p className="font-semibold text-black">Salvar</p>
          </button>
        </div>
      </main>
    </>
  );
}
