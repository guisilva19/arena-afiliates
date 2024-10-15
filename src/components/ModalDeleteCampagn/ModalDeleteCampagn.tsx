import useCampaign from "@/hook/useCampaign";

const ModalConfirmDelete = ({
  campanha,
  setIsModalDeleteOpen,
  setCampanhas,
  campanhas,
}: {
  campanha: any;
  setIsModalDeleteOpen: any;
  setCampanhas: any;
  campanhas: any;
}) => {
  const filtered = campanhas.filter((item: any) => item.id !== campanha.id);
  const { deleteCampaign } = useCampaign();

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded-lg max-w-md w-full gap-6">
          <h3 className="text-center font-medium">
            Tem certeza que deseja excluir a campanha{" "}
            <strong>{campanha.nome}</strong>?
          </h3>
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={() => {
                setIsModalDeleteOpen(false);
              }}
              className="bg-red-500 text-white py-2 px-6 rounded-full hover:bg-red-600 transition"
              style={{
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                borderRadius: "80px",
                width: "115px",
              }}
            >
              Cancelar
            </button>
            <button
              className="text-gray-500 text-center hover:bg-green-500 px-6 py-2 rounded-full transition hover:text-white"
              onClick={async () => {
                await deleteCampaign(campanha.id);
                setCampanhas(filtered);
                setIsModalDeleteOpen(false);
              }}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalConfirmDelete;
