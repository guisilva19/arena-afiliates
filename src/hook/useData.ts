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

  const allData = async (period: string) => {
    try {
      const response = await fetch(`api/users/dados/${period}`, {
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
      const response = await fetch(`api/users/dados/grafico/admin`, {
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

  const dataGraphicsByUser = async (id: string) => {
    try {
      const response = await fetch(`/api/users/${id}/dados/grafico`, {
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

  const allInvoice = async (startDate: string, endDate: string) => {
    try {
      const response = await fetch(
        `api/users/invoicing/all?start_date=${startDate}&end_date=${endDate}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user") as string).token
            }`,
          },
        }
      );

      if (response.ok) {
        return await response.json();
      }
    } catch (err) {
      toast.error("Falha ao buscar dados!");
    }
  };

  const myInvoice = async (startDate: string, endDate: string) => {
    try {
      const response = await fetch(
        `api/users/invoicing?start_date=${startDate}&end_date=${endDate}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user") as string).token
            }`,
          },
        }
      );

      if (response.ok) {
        return await response.json();
      }
    } catch (err) {
      toast.error("Falha ao buscar dados!");
    }
  };

  const dadosByMyUser = async () => {
    try {
      const response = await fetch(
        `api/users/${
          JSON.parse(localStorage.getItem("user") as string).id
        }/dados`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user") as string).token
            }`,
          },
        }
      );

      if (response.ok) {
        return await response.json();
      }
    } catch (err) {
      toast.error("Falha ao buscar dados!");
    }
  };

  const dadosByUser = async (id: string) => {
    try {
      const response = await fetch(`/api/users/${id}/dados`, {
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

  return {
    addData,
    allData,
    allDataGraphics,
    dataGraphicsByUser,
    allInvoice,
    myInvoice,
    dadosByMyUser,
    dadosByUser,
  };
}
