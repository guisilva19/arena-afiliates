import useData from "@/hook/useData";
import { schemaDados } from "@/utils/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { DateRangePicker } from "@nextui-org/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function AddAfiliate({
  handleCloseModal,
  users,
  setLoading,
}: {
  handleCloseModal: () => void;
  users: any;
  setLoading: any;
}) {
  const { addData } = useData();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schemaDados),
  });

  const [isOpenAfiliate, setIsOpenAfiliate] = useState(false);
  const [isOpenCampaign, setIsOpenCampaign] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [selectedCampaign, setSelectedCampaign] = useState<any | null>(null);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const handleSelectAfiliate = (user: any) => {
    setSelectedUser(user);
    setIsOpenAfiliate(false);
  };

  const handleSelectCampaign = (campaign: any) => {
    setSelectedCampaign(campaign);
    setIsOpenCampaign(false);
  };

  const handleRegisterDados = async (data: any) => {
    if (selectedUser && selectedCampaign && startDate.length > 0 && endDate.length > 0) {
      const newBody = {
        start_date: startDate,
        end_date: endDate,
        chargebacks: data.chargebacks === "" ? 0 : Number(data.chargebacks),
        cliques: data.cliques === "" ? 0 : Number(data.cliques),
        comissao_cpa: data.comissao_cpa === "" ? 0 : Number(data.comissao_cpa),
        comissao_revshare:
          data.comissao_revshare === "" ? 0 : Number(data.comissao_revshare),
        // comissao_total:
        //   data.comissao_total === "" ? 0 : Number(data.comissao_total),
        contagem_cpa: data.contagem_cpa === "" ? 0 : Number(data.contagem_cpa),
        contagem_ftd: data.contagem_ftd === "" ? 0 : Number(data.contagem_ftd),
        contas_ativas:
          data.contas_ativas === "" ? 0 : Number(data.contas_ativas),
        contas_de_aposta:
          data.contas_de_aposta === "" ? 0 : Number(data.contas_de_aposta),
        contas_depositantes:
          data.contas_depositantes === ""
            ? 0
            : Number(data.contas_depositantes),
        depositos: data.depositos === "" ? 0 : Number(data.depositos),
        net_player: data.net_player === "" ? 0 : Number(data.net_player),
        novos_depositantes:
          data.novos_depositantes === "" ? 0 : Number(data.novos_depositantes),
        receita_liquida:
          data.receita_liquida === "" ? 0 : Number(data.receita_liquida),
        registros: data.registros === "" ? 0 : Number(data.registros),
        stakes: data.stakes === "" ? 0 : Number(data.stakes),
      };
      await addData(newBody, selectedUser.id, selectedCampaign.id);
      setLoading(true);
      handleCloseModal();
      reset();
    } else {
      toast.error("Selecione afiliado, campanha e a data");
    }
  };

  return (
    <>
      <div className="fixed w-screen h-screen inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-scroll register z-50">
        <form
          onSubmit={handleSubmit(handleRegisterDados)}
          className="bg-white p-8 rounded-lg max-w-5xl w-full text-gray-800 h-max"
        >
          <h3 className="text-xl font-semibold text-center mb-4">
            Adicionar Dados de Afiliado
          </h3>
          <p className="text-gray-500 text-center mb-6">
            Preencha os dados abaixo.
          </p>

          <div className="grid grid-cols-3 gap-y-3 gap-x-5">
            <div className="">
              <label className="block text-sm font-medium text-gray-700">
                Nome do Afiliado
              </label>
              <div className="relative">
                <div
                  className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm text-sm cursor-pointer"
                  onClick={() => setIsOpenAfiliate(!isOpenAfiliate)}
                >
                  {selectedUser ? (
                    <span className="text-black text-[11px]">
                      {selectedUser.nome} - {selectedUser.email}
                    </span>
                  ) : (
                    <span className="text-gray-500">Selecione um afiliado</span>
                  )}
                </div>

                {isOpenAfiliate && (
                  <div className="absolute bg-white w-full left-0 border border-slate-200 rounded-lg max-h-80 overflow-y-auto mt-1 z-10">
                    <ul>
                      {users.map((user: any) => (
                        <li
                          key={user.id}
                          className="text-black p-2 hover:bg-gray-200 text-[11px] cursor-pointer"
                          onClick={() => handleSelectAfiliate(user)}
                        >
                          {user.nome} - {user.email}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="">
              <label className="block text-sm font-medium text-gray-700">
                Campanha
              </label>
              <div className="relative">
                <div
                  className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm text-sm cursor-pointer"
                  onClick={() => setIsOpenCampaign(!isOpenCampaign)}
                >
                  {selectedCampaign ? (
                    <span className="text-black text-[11px]">
                      {selectedCampaign.nome}
                    </span>
                  ) : (
                    <span className="text-gray-500">
                      Selecione uma campanha
                    </span>
                  )}
                </div>

                {isOpenCampaign && (
                  <div className="absolute bg-white w-full left-0 border border-slate-200 rounded-lg max-h-80 overflow-y-auto mt-1 z-10">
                    <ul>
                      {selectedUser?.campanhas_ativas?.map((campaign: any) => (
                        <li
                          key={campaign.id}
                          className="text-black p-2 hover:bg-gray-200 text-[11px] cursor-pointer"
                          onClick={() => handleSelectCampaign(campaign)}
                        >
                          {campaign.nome}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="">
              <label className="block text-sm font-medium text-gray-700">
                Data
              </label>
              <DateRangePicker
                variant="bordered"
                className="max-w-xs "
                onChange={(e) => {
                  if (e?.start && e?.end) {
                    const startDate = new Date(
                      `${e.start.year}-${String(e.start.month).padStart(
                        2,
                        "0"
                      )}-${String(e.start.day).padStart(2, "0")}`
                    ).toISOString();

                    const endDate = new Date(
                      `${e.end.year}-${String(e.end.month).padStart(
                        2,
                        "0"
                      )}-${String(e.end.day).padStart(2, "0")}`
                    ).toISOString();
                    setStartDate(startDate);
                    setEndDate(endDate);
                  } else {
                    console.error("Invalid date range", e);
                  }
                }}
              />
            </div>

            <div className="">
              <label className="block text-sm font-medium text-gray-700">
                Cliques
              </label>
              <input
                {...register("cliques")}
                type="number"
                className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm text-sm"
              />
            </div>

            <div className="">
              <label className="block text-sm font-medium text-gray-700">
                Registros
              </label>
              <input
                {...register("registros")}
                type="number"
                className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm text-sm"
              />
            </div>

            <div className="">
              <label className="block text-sm font-medium text-gray-700">
                Contagem FTD
              </label>
              <input
                {...register("contagem_ftd")}
                type="number"
                className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm text-sm"
              />
            </div>

            <div className="">
              <label className="block text-sm font-medium text-gray-700">
                Contas Ativas
              </label>
              <input
                {...register("contas_ativas")}
                type="number"
                className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm text-sm"
              />
            </div>

            <div className="">
              <label className="block text-sm font-medium text-gray-700">
                Novos Depositantes
              </label>
              <input
                {...register("novos_depositantes")}
                type="number"
                className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm text-sm"
              />
            </div>

            <div className="">
              <label className="block text-sm font-medium text-gray-700">
                Contas Depositantes
              </label>
              <input
                {...register("contas_depositantes")}
                type="number"
                className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm text-sm"
              />
            </div>

            <div className="">
              <label className="block text-sm font-medium text-gray-700">
                Contas de Aposta
              </label>
              <input
                {...register("contas_de_aposta")}
                type="number"
                className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm text-sm"
              />
            </div>

            <div className="">
              <label className="block text-sm font-medium text-gray-700">
                Net/Player
              </label>
              <input
                {...register("net_player")}
                type="number"
                className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm text-sm"
              />
            </div>

            <div className="">
              <label className="block text-sm font-medium text-gray-700">
                Depósitos
              </label>
              <input
                {...register("depositos")}
                type="number"
                className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm text-sm"
              />
            </div>

            <div className="">
              <label className="block text-sm font-medium text-gray-700">
                Stakes
              </label>
              <input
                {...register("stakes")}
                type="number"
                className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm text-sm"
              />
            </div>

            <div className="">
              <label className="block text-sm font-medium text-gray-700">
                Chargebacks
              </label>
              <input
                {...register("chargebacks")}
                type="number"
                className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm text-sm"
              />
            </div>

            <div className="">
              <label className="block text-sm font-medium text-gray-700">
                Receita Líquida
              </label>
              <input
                {...register("receita_liquida")}
                type="number"
                className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm text-sm"
              />
            </div>

            <div className="">
              <label className="block text-sm font-medium text-gray-700">
                Comissão RevShare
              </label>
              <input
                {...register("comissao_revshare")}
                type="number"
                className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm text-sm"
              />
            </div>

            <div className="">
              <label className="block text-sm font-medium text-gray-700">
                Comissão CPA
              </label>
              <input
                {...register("comissao_cpa")}
                type="number"
                className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm text-sm"
              />
            </div>

            {/* <div className="">
              <label className="block text-sm font-medium text-gray-700">
                Comissão Total
              </label>
              <input
                {...register("comissao_total")}
                type="number"
                className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm text-sm"
              />
            </div> */}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Contagem CPA
              </label>
              <input
                {...register("contagem_cpa")}
                type="number"
                className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded-full w-full hover:bg-green-600 transition"
          >
            Adicionar Dados
          </button>

          <button
            onClick={handleCloseModal}
            className="mt-2 text-gray-500 text-center w-full"
          >
            Cancelar
          </button>
        </form>
      </div>
    </>
  );
}
