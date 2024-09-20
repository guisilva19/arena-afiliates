"use client";
import SideBar from "@/components/SideBar/SideBar";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <Toaster />
      <main className="flex">{children}</main>
    </NextUIProvider>
  );
}
