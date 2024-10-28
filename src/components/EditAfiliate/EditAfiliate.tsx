import useUser from "@/hook/useUser";
import { useState } from "react";

export default function EditAfiliate({
  afiliado,
  handleCloseEditModal,
  handleExcluirAfiliado,
  setUsers,
  users,
  setIsEditModalOpen,
}: {
  afiliado: any;
  handleCloseEditModal: () => void;
  handleExcluirAfiliado: () => void;
  setUsers: any;
  users: any;
  setIsEditModalOpen: any;
}) {
  const { updateUser, deleteUser } = useUser();

  const [nome, setNome] = useState(afiliado.nome);
  const [telefone, setTelefone] = useState(afiliado.telefone);
  const [email, setEmail] = useState(afiliado.email);
  const [promover, setPromover] = useState(afiliado.onde_vai_promover);
  const [link, setLink] = useState(afiliado.url_ou_canal);

  const update = async () => {
    try {
      const body = {
        nome,
        telefone,
        onde_vai_promover: promover,
        url_ou_canal: link,
      };

      await updateUser(afiliado.id, body);
      const filtered = users.afiliados.filter(
        (user: any) => user.id !== afiliado.id
      );

      setUsers({ ...users, afiliados: [...filtered, body] });

      setIsEditModalOpen(false);
    } catch (err) {}
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded-lg max-w-md w-full">
          <h3 className="text-xl font-semibold text-center mb-4">
            Editar Afiliado
          </h3>
          <p className="text-gray-500 text-center mb-6">
            Atualize os dados do afiliado abaixo.
          </p>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Nome
            </label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Telefone
            </label>
            <input
              type="text"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              disabled
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Onde vai promover
            </label>
            <input
              type="text"
              value={promover}
              onChange={(e) => setPromover(e.target.value)}
              className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Link
            </label>
            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm"
            />
          </div>

          <button
            onClick={update}
            className="bg-green-500 text-white py-2 px-4 rounded-full w-full hover:bg-green-600 transition"
          >
            Atualizar Afiliado
          </button>

          <button
            onClick={async () => {
              const result = await deleteUser(afiliado.id);
              if (result) {
                handleExcluirAfiliado();
              }
            }}
            className="bg-red-500 text-white py-2 px-4 rounded-full w-full mt-2 hover:bg-red-600 transition"
          >
            Excluir Afiliado
          </button>

          <button
            onClick={handleCloseEditModal}
            className="mt-2 text-gray-500 text-center w-full"
          >
            Cancelar
          </button>
        </div>
      </div>
    </>
  );
}
