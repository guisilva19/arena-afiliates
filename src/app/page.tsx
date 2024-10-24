"use client";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import { useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaLogin } from "@/utils/schema";
import useSignin from "@/hook/useSignin";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const [viewPass, setViewPass] = useState(false);
  const { signin } = useSignin();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaLogin),
  });

  useEffect(() => {
    get();
  }, []);

  const get = async () => {
    const user = localStorage.getItem("user");

    if (user) {
      router.push("/dashboard");
    }
  };

  return (
    <>
      <main className="w-screen h-screen bg-black flex justify-center items-center">
        <div className="w-[380px] flex flex-col items-center gap-6">
          <Image src={logo} alt="Arena" className="w-72" />
          <div className="w-11/12 flex flex-col">
            <h3 className="text-white font-semibold text-2xl">Login</h3>
            <form
              onSubmit={handleSubmit(signin)}
              className="flex flex-col gap-4 mt-10"
            >
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
              <div className="w-full flex justify-end">
                <button type="button" className="w-max">
                  <p className="text-sm font-light text-white">
                    Esqueceu a senha?
                  </p>
                </button>
              </div>

              <button
                type="submit"
                className=" w-full bg-[#4CFF4C] py-4 rounded-xl mt-8"
              >
                <p className="font-semibold">Log in</p>
              </button>
            </form>

            <span className="flex text-white text-sm font-light gap-2 mx-auto mt-5">
              Não tem uma conta?{" "}
              <Link href={"/cadastrar"} className="font-medium underline">
                Cadastrar
              </Link>
            </span>
          </div>
        </div>
      </main>
    </>
  );
}
