import SideBar from "@/components/SideBar/SideBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="flex">
        <SideBar />
        {children}
      </main>
    </>
  );
}
