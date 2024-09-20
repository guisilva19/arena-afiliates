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

  return { signin };
}
