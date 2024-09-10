import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-screen h-screen bg-black text-white fixed top-0 left-0 flex flex-col justify-center items-center">
      <h2>Está página não existe</h2>
      <Link href="/" className="bg-cyan-900 px-5 py-3 rounded-xl mt-5">Voltar</Link>
    </div>
  );
}
