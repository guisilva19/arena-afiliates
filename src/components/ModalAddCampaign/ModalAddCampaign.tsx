import useCampaign from "@/hook/useCampaign";
import { schemaCampanha } from "@/utils/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const ModalAddCampaign = ({
  handleCloseModal,
  setCampanhas,
  campanhas,
}: {
  handleCloseModal: () => void;
  setCampanhas: Dispatch<SetStateAction<any>>;
  campanhas: any;
}) => {
  const [file, setFile] = useState<any>();
  const { create } = useCampaign();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaCampanha),
  });

  const handle = async (data: any) => {
    if (file) {
      handleCloseModal();
      const response = await create({ ...data, logo: file });
      setCampanhas([...campanhas, response]);
      reset();
    } else {
      toast.error("Insira a logo da marca");
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <form
          onSubmit={handleSubmit(handle)}
          className="bg-white p-8 rounded-lg max-w-md w-full"
        >
          <h3 className="text-xl font-semibold text-center mb-4">
            Adicionar Nova Campanha
          </h3>
          <p className="text-gray-500 text-center mb-6">
            Por favor, preencha os dados abaixo para adicionar uma nova
            campanha.
          </p>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Nome da Marca
            </label>
            <input
              {...register("nome")}
              type="text"
              className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
            />
            {errors.nome && (
              <p className="text-red-500 text-xs">{errors.nome.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Imagem da Campanha
            </label>
            <input
              onChange={(e: any) => {
                const file = e.target.files[0];
                setFile(file);
                return file;
              }}
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Condições
            </label>
            <input
              {...register("condicao")}
              type="text"
              className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
            />
            {errors.condicao && (
              <p className="text-red-500 text-xs">{errors.condicao.message}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Comissão
            </label>
            <input
              {...register("comissao")}
              type="text"
              className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
            />
            {errors.comissao && (
              <p className="text-red-500 text-xs">{errors.comissao.message}</p>
            )}
          </div>

          <div className="flex w-full justify-between max-h-12">
            <button
              onClick={handleCloseModal}
              className="text-gray-500 text-center px-6 hover:bg-red-500 hover:text-white rounded-full duration-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white py-3 px-8 rounded-full hover:shadow-lg transition-all hover:bg-green-600"
              style={{
                fontSize: "16px",
                fontWeight: "500",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                width: "fit-content",
              }}
            >
              Adicionar Campanha
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ModalAddCampaign;
