import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function useSignin() {
  const router = useRouter();

  const signin = async (body: { email: string; senha: string }) => {
    try {
      const response = await fetch("api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const result = await response.json();
        localStorage.setItem("user", JSON.stringify(result));
        toast.success("Login feito com sucesso!");
        router.push("/dashboard");
      } else {
        toast.error("Credenciais inválidas!");
      }
    } catch (err) {
      toast.error("Credenciais inválidas!");
    }
  };

  const forgot = async (body: { email: string }) => {
    try {
      const response = await fetch("api/users/forgot/code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        toast.success("Codigo enviado para e-mail!");
        return true;
      } else {
        toast.error("Algo deu errado, tente novamente!");
        return false;
      }
    } catch (err) {
      toast.error("Algo deu errado, tente novamente!");
    }
  };

  const updatePass = async (body: any) => {
    try {
      const response = await fetch("api/users/forgot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        toast.success("Senha atualizada com sucesso!");
        router.push("/");
        return true;
      } else {
        toast.error("Algo deu errado, tente novamente!");
        return false;
      }
    } catch (err) {
      toast.error("Algo deu errado, tente novamente!");
    }
  };

  return { signin, forgot, updatePass };
}
