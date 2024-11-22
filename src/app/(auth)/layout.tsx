"use client";
import SideBar from "@/components/SideBar/SideBar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = sessionStorage.getItem("user");
      localStorage.removeItem('user')

      if (!user) {
        router.push("/");
      } else {
        setIsAuthenticated(true);
      }
    }
  }, [router]);

  if (isAuthenticated === null) {
    return <main className="w-screen h-screen bg-black"></main>;
  }

  if (!isAuthenticated) {
    return <main className="w-screen h-screen bg-black"></main>;
  }

  return (
    <main className="flex">
      <SideBar />
      {children}
    </main>
  );
}
