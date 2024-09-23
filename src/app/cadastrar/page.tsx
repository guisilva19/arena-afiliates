"use client";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaRegister } from "@/utils/schema";
import { useState } from "react";
import { FaCheck, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { li } from "framer-motion/client";

export default function Cadastrar() {
  const [viewPass, setViewPass] = useState(false);
  const [viewSelect, setViewSelect] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaRegister),
  });

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  return (
    <>
      <main className="w-screen h-[110vh] bg-black flex justify-center items-center overflow-scroll register">
        <div className="w-[380px] flex flex-col items-center gap-4">
          <Image src={logo} alt="Arena" className="w-72" />
          <div className="w-11/12 flex flex-col">
            <h3 className="text-white font-semibold text-2xl">
              Crie sua conta
            </h3>
            <form
              //   onSubmit={handleSubmit()}
              className="flex flex-col gap-2 mt-5"
            >
              <fieldset className="flex flex-col gap-2">
                <label htmlFor="Nome" className="text-white text-sm font-light">
                  Nome completo
                </label>
                <input
                  type="text"
                  id="Nome"
                  placeholder="Seu nome completo"
                  className="w-full px-4 py-3 outline-none rounded-xl"
                  {...register("nome")}
                />
                {errors.nome && (
                  <p className="text-[#ff1616] text-xs">
                    {errors.nome.message}
                  </p>
                )}
              </fieldset>

              <fieldset className="flex flex-col gap-2">
                <label
                  htmlFor="E-mail"
                  className="text-white text-sm font-light"
                >
                  E-mail
                </label>
                <input
                  type="text"
                  id="E-mail"
                  placeholder="Seu e-mail"
                  className="w-full px-4 py-3 outline-none rounded-xl"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-[#ff1616] text-xs">
                    {errors.email.message}
                  </p>
                )}
              </fieldset>

              <fieldset className="flex flex-col gap-2">
                <label
                  htmlFor="Telefone"
                  className="text-white text-sm font-light"
                >
                  Telefone
                </label>
                <input
                  type="text"
                  id="Telefone"
                  placeholder="DDD + Seu número de telefone"
                  className="w-full px-4 py-3 outline-none rounded-xl"
                  {...register("telefone")}
                />
                {errors.telefone && (
                  <p className="text-[#ff1616] text-xs">
                    {errors.telefone.message}
                  </p>
                )}
              </fieldset>

              <fieldset className="flex flex-col gap-2 relative">
                <label
                  htmlFor="Telefone"
                  className="text-white text-sm font-light"
                >
                  Onde você vai promover as campanhas?
                </label>
                <input
                  type="text"
                  onClick={() => setViewSelect(!viewSelect)}
                  className="w-full px-4 py-3 outline-none rounded-xl"
                  value={selectedOptions.join(", ")}
                />
                {viewSelect && (
                  <ul className="absolute top-20 bg-white w-full">
                    {data.map((item, index) => (
                      <li
                        onClick={() => {
                          if (selectedOptions.includes(item)) {
                            setSelectedOptions(
                              selectedOptions.filter(
                                (option) => option !== item
                              )
                            );
                          } else {
                            setSelectedOptions([...selectedOptions, item]);
                          }
                          setViewSelect(!viewSelect);
                        }}
                        key={index}
                        className={`hover:bg-green-500 hover:text-white py-3 px-3 flex items-center justify-between ${
                          selectedOptions.includes(item) &&
                          "bg-green-500 text-white"
                        }`}
                      >
                        <p>{item}</p>
                        {selectedOptions.includes(item) && (
                          <FaCheck color="#fff" />
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </fieldset>

              <fieldset className="flex flex-col gap-2">
                <label htmlFor="url" className="text-white text-sm font-light">
                  Url ou canal
                </label>
                <input
                  type="text"
                  id="url"
                  placeholder="Url ou Nome do canal"
                  className="w-full px-4 py-3 outline-none rounded-xl"
                  {...register("url_do_canal")}
                />
                {errors.url_do_canal && (
                  <p className="text-[#ff1616] text-xs">
                    {errors.url_do_canal.message}
                  </p>
                )}
              </fieldset>

              <fieldset className="flex flex-col gap-2">
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
                    {...register("senha")}
                  />
                  <button type="button" onClick={() => setViewPass(!viewPass)}>
                    {viewPass ? <FaRegEyeSlash /> : <FaRegEye />}
                  </button>
                </div>
                {errors.senha && (
                  <p className="text-[#ff1616] text-xs">
                    {errors.senha.message}
                  </p>
                )}
              </fieldset>

              <fieldset>
                <label htmlFor="checkbox">
                  Aceito as condições e a política de privacidade
                </label>
              </fieldset>

              <button
                type="submit"
                className=" w-full bg-[#4CFF4C] py-4 rounded-xl"
              >
                <p className="font-semibold">Cadastrar-se</p>
              </button>
            </form>

            <span className="flex text-white text-sm font-light gap-2 mx-auto">
              Já tem uma conta?{" "}
              <Link href={"/"} className="font-medium underline">
                Entrar
              </Link>
            </span>
          </div>
        </div>
      </main>
    </>
  );
}

const data = ["Instagram", "Facebook", "Website", "Youtube", "Outro"];
