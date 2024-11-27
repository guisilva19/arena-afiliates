"use client";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { schemaForgot, schemaUpdatePass } from "@/utils/schema";
import useSignin from "@/hook/useSignin";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function ForgotPassword() {
  const [viewPass, setViewPass] = useState(false);
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const router = useRouter();

  const { forgot, updatePass } = useSignin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaForgot),
  });

  const {
    register: registerTwo,
    handleSubmit: handleSubmitTwo,
    formState: { errors: errorsTwo },
  } = useForm({
    resolver: yupResolver(schemaUpdatePass),
  });

  useEffect(() => {
    get();
  }, []);

  const get = async () => {
    const user = sessionStorage.getItem("user");

    if (user) {
      router.push("/dashboard");
    }
  };

  const handleOne = async (data: any) => {
    const result = await forgot(data);

    if (result) {
      setStep(2);
      setEmail(data.email);
    }
  };

  const handleTwo = async (data: any) => {
      await updatePass({ ...data, email });
  
  };

  return (
    <>
      <main className="w-screen h-screen bg-black flex justify-center items-center">
        <div className="w-[380px] flex flex-col items-center gap-6">
          <Image src={logo} alt="Arena" className="w-72" />
          <div className="w-11/12 flex flex-col">
            <h3 className="text-white font-semibold text-2xl">
              Recuperar senha
            </h3>
            {step === 1 && (
              <form
                onSubmit={handleSubmit(handleOne)}
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

                <button
                  type="submit"
                  className=" w-full bg-[#4CFF4C] py-4 rounded-xl mt-8"
                >
                  <p className="font-semibold">Enviar</p>
                </button>
              </form>
            )}

            {step === 2 && (
              <form
                onSubmit={handleSubmitTwo(handleTwo)}
                className="flex flex-col gap-4 mt-10"
              >
                <fieldset className="flex flex-col gap-2">
                  <label
                    htmlFor="E-mail"
                    className="text-white text-sm font-light"
                  >
                    Código
                  </label>
                  <input
                    type="text"
                    id="E-mail"
                    className="w-full px-4 py-3 outline-none rounded-xl"
                    {...registerTwo("codigo")}
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
                      {...registerTwo("senha")}
                    />
                    <button
                      type="button"
                      onClick={() => setViewPass(!viewPass)}
                    >
                      {viewPass ? <FaRegEyeSlash /> : <FaRegEye />}
                    </button>
                  </div>
                  {errorsTwo.senha && (
                    <p className="text-[#ff1616] text-xs">
                      {errorsTwo.senha.message}
                    </p>
                  )}
                </fieldset>

                <button
                  type="submit"
                  className=" w-full bg-[#4CFF4C] py-4 rounded-xl mt-8"
                >
                  <p className="font-semibold">Enviar</p>
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
