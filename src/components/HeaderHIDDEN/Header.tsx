"use client";
import Image from "next/image";
import logo from "@/assets/logo.svg";

export default function HeaderHIDDEN() {
  return (
    <>
      <header className="w-screen h-20 bg-black flex items-center justify-center">
        <Image src={logo} alt="LOGO" width={160} />
      </header>
    </>
  );
}
