"use client";
import { AuthProvider } from "@/context/context";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <Toaster />
      <AuthProvider>
        <main className="flex">{children}</main>
      </AuthProvider>
    </NextUIProvider>
  );
}
