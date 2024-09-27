import useUser from "@/hook/useUser";
import { schemaRegister } from "@/utils/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaCheck, FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function CreateAfiliate({
  handleCloseModal,
  setLoading,
}: {
  handleCloseModal: () => void;
  setLoading: any;
}) {
  const [viewPass, setViewPass] = useState(false);
  const [viewSelect, setViewSelect] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schemaRegister),
  });

  const { registerAfiliate } = useUser();

  const handle = async (data: any) => {
    const response = await registerAfiliate({
      ...data,
      onde_vai_promover: selectedOptions.join(", "),
    });
    setLoading()
    reset();
    handleCloseModal();
  };

  return (
    <>
      <div className="fixed inset-0 flex justify-center bg-black bg-opacity-50 overflow-auto register">
        <div className="bg-white p-8 rounded-lg max-w-md w-full h-max my-10">
          <h3 className="text-xl font-semibold text-center mb-4">
            Adicionar Novo Afiliado
          </h3>
          <p className="text-gray-500 text-center mb-6">
            Por favor, preencha os dados abaixo para adicionar um novo afiliado.
          </p>
          <form
            onSubmit={handleSubmit(handle)}
            className="flex flex-col gap-2 mt-5"
          >
            <fieldset className="flex flex-col gap-1">
              <label htmlFor="Nome" className="text-black text-sm font-light">
                Nome completo
              </label>
              <input
                type="text"
                id="Nome"
                placeholder="Seu nome completo"
                className="w-full px-4 py-3 outline-none rounded-xl border-2 border-black/40"
                {...register("nome")}
              />
              {errors.nome && (
                <p className="text-[#ff1616] text-xs">{errors.nome.message}</p>
              )}
            </fieldset>

            <fieldset className="flex flex-col gap-1">
              <label htmlFor="E-mail" className="text-black text-sm font-light">
                E-mail
              </label>
              <input
                type="text"
                id="E-mail"
                placeholder="Seu e-mail"
                className="w-full px-4 py-3 outline-none rounded-xl border-2 border-black/40"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-[#ff1616] text-xs">{errors.email.message}</p>
              )}
            </fieldset>

            <fieldset className="flex flex-col gap-1">
              <label
                htmlFor="Telefone"
                className="text-black text-sm font-light"
              >
                Telefone
              </label>
              <input
                type="text"
                id="Telefone"
                placeholder="DDD + Seu número de telefone"
                className="w-full px-4 py-3 outline-none rounded-xl border-2 border-black/40"
                {...register("telefone")}
              />
              {errors.telefone && (
                <p className="text-[#ff1616] text-xs">
                  {errors.telefone.message}
                </p>
              )}
            </fieldset>

            <fieldset className="flex flex-col gap-1 relative">
              <label
                htmlFor="Telefone"
                className="text-black text-sm font-light"
              >
                Onde você vai promover as campanhas?
              </label>
              <input
                type="text"
                placeholder=""
                onClick={() => setViewSelect(!viewSelect)}
                className="w-full px-4 py-3 outline-none rounded-xl border-2 border-black/40"
                value={selectedOptions.join(", ")}
              />
              {viewSelect && (
                <ul className="absolute top-20 bg-white w-full">
                  {data.map((item, index) => (
                    <li
                      onClick={() => {
                        if (selectedOptions.includes(item)) {
                          setSelectedOptions(
                            selectedOptions.filter((option) => option !== item)
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

            <fieldset className="flex flex-col gap-1">
              <label htmlFor="url" className="text-black text-sm font-light">
                Url ou canal
              </label>
              <input
                type="text"
                id="url"
                placeholder="Url ou Nome do canal"
                className="w-full px-4 py-3 outline-none rounded-xl border-2 border-black/40"
                {...register("url_ou_canal")}
              />
              {errors.url_ou_canal && (
                <p className="text-[#ff1616] text-xs">
                  {errors.url_ou_canal.message}
                </p>
              )}
            </fieldset>

            <fieldset className="flex flex-col gap-1">
              <label htmlFor="Senha" className="text-black text-sm font-light">
                Senha
              </label>
              <div className="w-full bg-white flex gap-2 px-4 rounded-xl border-2 border-black/40">
                <input
                  type={viewPass ? "text" : "password"}
                  id="Senha"
                  placeholder="Sua senha"
                  className="w-full outline-none py-3"
                  {...register("senha")}
                />
                <button type="button" onClick={() => setViewPass(!viewPass)}>
                  {viewPass ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              </div>
              {errors.senha && (
                <p className="text-[#ff1616] text-xs">{errors.senha.message}</p>
              )}
            </fieldset>

            <button
              type="submit"
              className={`w-full py-4 rounded-full bg-[#4CFF4C] mt-4`}
            >
              <p className="font-semibold">Adicionar afiliado</p>
            </button>
          </form>

          <button
            onClick={handleCloseModal}
            className="mt-2 py-4 hover:bg-red-500 hover:text-white duration-400 rounded-full text-gray-500 text-center w-full"
          >
            Cancelar
          </button>
        </div>
      </div>
    </>
  );
}

const data = ["Instagram", "Facebook", "Website", "Youtube", "Outro"];
