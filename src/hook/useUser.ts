import { useRouter } from "next/navigation";
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

  return { getMyUser, registerUser };
}
