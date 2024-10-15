import useCampaign from "@/hook/useCampaign";
import { fileToBase64 } from "@/utils/utils";
import Image from "next/image";
import { useState } from "react";

const ModalEditCampaign = ({
  handleCloseModal,
  campanhaSelected,
  setIsModalDeleteOpen,
  campanhas,
  setCampanhas,
}: {
  handleCloseModal: () => void;
  setCampanhaSelected: any;
  campanhaSelected: any;
  setIsModalDeleteOpen: any;
  campanhas: any;
  setCampanhas: any;
}) => {
  const [editCondicoes, setEditCondicoes] = useState(campanhaSelected.condicao);
  const [editComissao, setEditComissao] = useState(campanhaSelected.comissao);
  const [editImagem, setEditImagem] = useState(campanhaSelected.logo);
  const [newImagePreview, setNewImagePreview] = useState<string | null>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewImagePreview(imageUrl);

      await fileToBase64(file).then((base64String) => {
        setEditImagem(base64String);
      });
    }
  };

  const filtered = campanhas.filter(
    (item: any) => item.id !== campanhaSelected.id
  );

  const { updateCampaign } = useCampaign();

  const handleUpdate = async () => {
    const body = {
      ...campanhaSelected,
      logo: editImagem,
      condicao: editCondicoes,
      comissao: editComissao,
    };

    await updateCampaign(campanhaSelected.id, {
      logo: editImagem,
      condicao: editCondicoes,
      comissao: editComissao,
    });

    setCampanhas([...filtered, body]);

    handleCloseModal();
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded-lg max-w-md w-full">
          <h3 className="text-xl font-semibold text-center mb-4">
            Editar Campanha
          </h3>
          <p className="text-gray-500 text-center mb-3">
            Atualize as condições, comissão e a imagem da campanha{" "}
            {campanhaSelected.nome}.
          </p>

          {(newImagePreview || editImagem) && (
            <div className="w-full flex justify-center mb-3">
              <Image
                src={newImagePreview || editImagem}
                alt="Preview"
                width={100}
                height={65}
                className="w-[140px] h-[65px] object-cover rounded-[3px]"
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Imagem da Campanha
            </label>
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleImageChange}
              className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Condições
            </label>
            <input
              type="text"
              value={editCondicoes}
              onChange={(e) => setEditCondicoes(e.target.value)}
              className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Comissão
            </label>
            <input
              type="text"
              value={editComissao}
              onChange={(e) => setEditComissao(e.target.value)}
              className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
            />
          </div>

          <div className="text-center mt-2">
            <button
              onClick={() => handleUpdate()}
              className="bg-green-500 text-white py-2 px-4 rounded-full w-full hover:bg-green-600 transition"
              style={{
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                borderRadius: "80px",
                width: "160px",
              }}
            >
              Concluir
            </button>
          </div>

          <div className="text-center mt-2">
            <button
              onClick={() => {
                handleCloseModal();
                setIsModalDeleteOpen(true);
              }}
              className="bg-red-500 text-white py-2 px-6 rounded-full hover:bg-red-600 transition"
              style={{
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                borderRadius: "80px",
                width: "115px",
              }}
            >
              Excluir
            </button>
          </div>

          <button
            onClick={handleCloseModal}
            className="mt-2 text-gray-500 text-center w-full"
          >
            Cancelar
          </button>
        </div>
      </div>
    </>
  );
};

export default ModalEditCampaign;
