import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function useSignin() {
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

  return { getMyUser };
}
