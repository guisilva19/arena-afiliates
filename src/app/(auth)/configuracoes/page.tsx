"use client";

import { useGlobalContext, User } from "@/context/context";
import useUser from "@/hook/useUser";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "sonner";

export default function Settings() {
  const [viewPass, setViewPass] = useState(false);
  const [senha, setSenha] = useState<string>("");
  const [confirmSenha, setConfirmSenha] = useState<string>("");
  const [foto, setFoto] = useState<string | null>(null);

  const { updateUserPassAndPicture } = useUser();
  const { setUser, user } = useGlobalContext();

  const saveChanges = async () => {
    if (senha.length > 0) {
      if (senha === confirmSenha) {
        if (senha.length < 6) {
          toast.warning("Adicione uma senha maior");
        } else {
          await updateUserPassAndPicture({ foto, senha });
          toast.success("Senha e foto atualizadas com sucesso.");

          setUser((prevUser: any) => ({
            ...(prevUser ?? {}),
            foto: foto,
          }));
        }
      } else {
        toast.warning("As senhas digitadas não coincidem.");
      }
    } else {
      const response = await updateUserPassAndPicture({ foto });
      if (response) {
        setUser((prevUser: any) => ({
          ...(prevUser ?? {}),
          foto: foto,
        }));
        const token = JSON.parse(sessionStorage.getItem("user") as string).token;
        sessionStorage.setItem(
          "user",
          JSON.stringify({ token, ...response })
        );
      }
    }
  };

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
              accept="image/png, image/jpeg, image/jpg"
              className="w-full px-4 py-3 outline-none rounded-xl bg-white text-black"
              onChange={(e: any) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    const base64String = reader.result as string;
                    setFoto(base64String);
                  };
                  reader.readAsDataURL(file);
                }
              }}
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
                onChange={({ target: { value } }) => setSenha(value)}
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
                onChange={({ target: { value } }) => setConfirmSenha(value)}
              />
              <button type="button" onClick={() => setViewPass(!viewPass)}>
                {viewPass ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
          </fieldset>

          <button
            type="button"
            className=" w-full bg-[#4CFF4C] py-4 rounded-xl mt-8"
            onClick={saveChanges}
          >
            <p className="font-semibold text-black">Salvar</p>
          </button>
        </div>
      </main>
    </>
  );
}
