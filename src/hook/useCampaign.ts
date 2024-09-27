export default function useCampaign() {
  const create = async (body: {
    nome: string;
    condicao: string;
    comissao: string;
    logo: File;
  }) => {
    try {
      const user = localStorage.getItem("user");

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
            JSON.parse(localStorage.getItem("user") as string).token
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
      const user = localStorage.getItem("user");

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

  return {
    create,
    list,
  };
}
