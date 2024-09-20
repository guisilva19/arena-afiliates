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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    get();
  }, []);

  const get = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      router.push("/");
    } else {
      setIsAuthenticated(true);
    }
  };

  if (!isAuthenticated) {
    return <main className="w-screen h-screen"></main>;
  }

  return (
    <>
      <main className="flex">
        <SideBar />
        {children}
      </main>
    </>
  );
}
