"use client";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function Home() {
  const [viewPass, setViewPass] = useState(false);

  return (
    <>
      <main className="w-screen h-screen bg-black flex justify-center items-center">
        <div className="w-[380px] flex flex-col items-center gap-6">
          <Image src={logo} alt="Arena" className="w-72" />
          <div className="w-11/12 flex flex-col">
            <h3 className="text-white font-semibold text-2xl">Login</h3>
            <form className="flex flex-col gap-6 mt-10">
              <fieldset className="flex flex-col">
                <label
                  htmlFor="E-mail"
                  className="text-white text-sm font-light"
                >
                  E-mail
                </label>
                <input
                  type="text"
                  id="E-mail"
                  className="w-full px-4 py-3 outline-none rounded-xl"
                />
              </fieldset>

              <fieldset className="flex flex-col">
                <label
                  htmlFor="Senha"
                  className="text-white text-sm font-light"
                >
                  Senha
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
              <div className="w-full flex justify-end">
                <button type="button" className="w-max">
                  <p className="text-sm font-light text-white">
                    Esqueceu a senha?
                  </p>
                </button>
              </div>

              <button
                type="submit"
                className=" w-full bg-[#4CFF4C] py-4 rounded-xl mt-6"
              >
                <p className="font-semibold">Log in</p>
              </button>
            </form>

            <span className="flex text-white text-sm font-light gap-2 mx-auto mt-5">
              Nao tem uma conta?{" "}
              <button type="button">
                <p className="font-medium underline">Cadastrar</p>
              </button>
            </span>
          </div>
        </div>
      </main>
    </>
  );
}
