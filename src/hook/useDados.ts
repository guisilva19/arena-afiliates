import { toast } from "sonner";

export default function useDados() {
  const addDados = async (body: any, idUser: string, idCampaign: string) => {
    try {
      const response = await fetch(`api/users/${idUser}/dados/${idCampaign}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user") as string).token
          }`,
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        toast.success("Dados adicionado ao afiliado com sucesso!");
        return true;
      } else {
        toast.error("Não foi possivel inserir os dados!");
        return false;
      }
    } catch (err) {
      toast.error("Não foi possivel inserir os dados!");
      return false;
    }
  };

  const allDados = async () => {
    try {
      const response = await fetch(`api/users/dados`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user") as string).token
          }`,
        },
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (err) {
      toast.error("Falha ao buscar dados!");
    }
  };

  return { addDados, allDados };
}
