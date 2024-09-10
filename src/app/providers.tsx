"use client";
import SideBar from "@/components/SideBar/SideBar";
import { NextUIProvider } from "@nextui-org/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <main className="flex">
        <SideBar />
        {children}
      </main>
    </NextUIProvider>
  );
}
