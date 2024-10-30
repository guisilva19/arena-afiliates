import { useRouter } from "next/navigation";
import { Stringifier } from "postcss";
import { toast } from "sonner";

export default function useUser() {
  const router = useRouter();

  const getMyUser = async () => {
    try {
      const response = await fetch("api/users/one", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const user = await response.json();
        return user;
      } else {
        router.push("/");
      }
    } catch (err) {
      router.push("/");
    }
  };

  const registerUser = async (body: any) => {
    try {
      const response = await fetch("api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        router.push("/");
        toast.success("Cadastro feito com sucesso!");
      } else {
        toast.error("Falha ao cadastrar-se!");
      }
    } catch (err) {
      toast.error("Falha ao cadastrar-se!");
    }
  };

  const registerAfiliate = async (body: any) => {
    try {
      const response = await fetch("api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        toast.success("Afiliado cadastrado com sucesso!");
        return await response.json();
      } else {
        toast.error("Falha ao cadastrar afiliado!");
      }
    } catch (err) {
      toast.error("Falha ao cadastrar afiliado!");
    }
  };

  const getUsers = async () => {
    try {
      const response = await fetch("api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user") as string).token
          }`,
        },
      });

      if (response.ok) {
        const user = await response.json();
        return user;
      }
    } catch (err) {
      toast.error("Falha ao carregar afiliados!");
    }
  };

  const updateUser = async (id: string, body: any) => {
    try {
      const response = await fetch(`api/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user") as string).token
          }`,
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        toast.success("Afiliado atualizado com sucesso!");
      }
    } catch (err) {
      toast.error("Falha ao atualizar afiliado!");
    }
  };

  const updateUserPassAndPicture = async (body: any) => {
    try {
      const response = await fetch(`api/users/password-or-picture`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user") as string).token
          }`,
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        if (body.senha) {
          toast.success("Usuário atualizado, faça login novamente!");
          localStorage.removeItem("user");
          router.push("/");
        } else {
          toast.success("Informações atualizadas com sucesso!");
          return await response.json();
        }
      }
    } catch (err) {
      toast.error("Falha ao atualizar afiliado!");
    }
  };

  const deleteUser = async (id: string) => {
    try {
      const response = await fetch(`api/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user") as string).token
          }`,
        },
      });

      if (response.ok) {
        toast.success("Afiliado desativado com sucesso!");
        return true;
      } else {
        toast.error("Falha ao desativas afiliado");
        return false;
      }
    } catch (err) {
      toast.error("Falha ao desativas afiliado");
      return false;
    }
  };

  return {
    getMyUser,
    registerUser,
    registerAfiliate,
    getUsers,
    updateUser,
    updateUserPassAndPicture,
    deleteUser,
  };
}
