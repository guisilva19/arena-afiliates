import { toast } from "sonner";

export default function useData() {
  const addData = async (body: any, idUser: string, idCampaign: string) => {
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

  const allData = async () => {
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

  const allDataGraphics = async () => {
    try {
      const response = await fetch(`api/users/dados/grafico`, {
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

  return { addData, allData, allDataGraphics };
}
