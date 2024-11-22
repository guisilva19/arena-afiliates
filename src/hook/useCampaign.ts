import { toast } from "sonner";

export default function useCampaign() {
  const create = async (body: {
    nome: string;
    condicao: string;
    comissao: string;
    logo: File;
  }) => {
    try {
      const user = sessionStorage.getItem("user");

      if (!user) {
        throw new Error("Usuário não autenticado");
      }
      const formData = new FormData();

      formData.append("nome", body.nome);
      formData.append("comissao", body.comissao);
      formData.append("condicao", body.condicao);
      formData.append("logo", body.logo);

      const response = await fetch("/api/campanha", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${
            JSON.parse(sessionStorage.getItem("user") as string).token
          }`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error("Erro ao enviar dados:", response.statusText);
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const list = async () => {
    try {
      const user = sessionStorage.getItem("user");

      if (!user) {
        throw new Error("Usuário não autenticado");
      }

      const token = JSON.parse(user).token;

      const response = await fetch("/api/campanha", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        return await response.json();
      } else {
        const error = await response.text();
        throw new Error(error);
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const listRequests = async () => {
    try {
      const user = sessionStorage.getItem("user");

      if (!user) {
        throw new Error("Usuário não autenticado");
      }

      const token = JSON.parse(user).token;

      const response = await fetch("/api/users/solicitacoes", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        return await response.json();
      } else {
        const error = await response.text();
        throw new Error(error);
      }
    } catch (err) {
      throw err;
    }
  };

  const linkAfiliate = async (
    id: string,
    body: {
      condicao: string;
      comissao: string;
      link: string;
      status: boolean;
    }
  ) => {
    try {
      const user = sessionStorage.getItem("user");

      if (!user) {
        throw new Error("Usuário não autenticado");
      }

      const token = JSON.parse(user).token;

      const response = await fetch(`/api/campanha-ativa/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        toast.success("Afiliado associado a campanha com sucesso!");
        return true;
      } else {
        const error = await response.text();
        throw new Error(error);
      }
    } catch (err) {
      toast.error("Falha ao associar afiliado a campanha!");
      throw err;
    }
  };

  const requestAfiliate = async (id: string) => {
    try {
      const user = sessionStorage.getItem("user");

      if (!user) {
        throw new Error("Usuário não autenticado");
      }

      const token = JSON.parse(user).token;

      const response = await fetch(`/api/campanha-ativa/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Solicitação feita com sucesso!");
        return await response.json();
      } else {
        const error = await response.text();
        throw new Error(error);
      }
    } catch (err) {
      toast.error("Falha ao solicitar afiliação a está campanha");
      throw err;
    }
  };

  const deleteCampaign = async (id: string) => {
    try {
      const user = sessionStorage.getItem("user");

      if (!user) {
        throw new Error("Usuário não autenticado");
      }

      const token = JSON.parse(user).token;

      const response = await fetch(`/api/campanha/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Campanha excluida!");
      } else {
        const error = await response.text();
        throw new Error(error);
      }
    } catch (err) {
      toast.error("Falha ao excluir está campanha");
      throw err;
    }
  };

  const deleteCampaignActive = async (id: string) => {
    try {
      const user = sessionStorage.getItem("user");

      if (!user) {
        throw new Error("Usuário não autenticado");
      }

      const token = JSON.parse(user).token;

      const response = await fetch(`/api/campanha-ativa/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Solicitação de campanha excluida!");
        return true;
      } else {
        const error = await response.text();
        throw new Error(error);
        return false ;
      }
    } catch (err) {
      toast.error("Falha ao excluir está solicitação de campanha");
      throw err;
    }
  };

  const updateCampaign = async (id: string, body: any) => {
    try {
      const user = sessionStorage.getItem("user");

      if (!user) {
        throw new Error("Usuário não autenticado");
      }

      const token = JSON.parse(user).token;

      const response = await fetch(`/api/campanha/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        toast.success("Campanha atualizada!");
      } else {
        const error = await response.text();
        throw new Error(error);
      }
    } catch (err) {
      toast.error("Falha ao atualizar está campanha");
      throw err;
    }
  };

  const listByUser = async () => {
    try {
      const user = sessionStorage.getItem("user");

      if (!user) {
        throw new Error("Usuário não autenticado");
      }

      const id = JSON.parse(user).id;
      const token = JSON.parse(user).token;

      const response = await fetch(`/api/campanha-ativa/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        return await response.json();
      } else {
        return [];
      }
    } catch (err) {
      return [];
    }
  };

  return {
    create,
    list,
    listByUser,
    listRequests,
    requestAfiliate,
    linkAfiliate,
    deleteCampaign,
    deleteCampaignActive,
    updateCampaign,
  };
}
