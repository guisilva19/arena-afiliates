"use client";
import { Calendar } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { IoCalendarOutline, IoSearch } from "react-icons/io5";
import { parseDate } from "@internationalized/date";

export default function Estatisticas() {
  let [dateInitial, setDateInitial] = useState(parseDate("2024-03-07"));
  let [dateInitial2, setDateInitial2] = useState(parseDate("2024-03-07"));
  const [viewCalendarInitial, setViewCalendarInitial] = useState(false);
  const [viewCalendarInitial2, setViewCalendarInitial2] = useState(false);
  const calendarRef = useRef<any>(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setViewCalendarInitial(false);
        setViewCalendarInitial2(false);
      }
    }

    if (viewCalendarInitial || viewCalendarInitial2) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [viewCalendarInitial, viewCalendarInitial2]);

  return (
    <>
      <main className="w-[calc(100vw-300px)] ml-[300px] px-8 pt-8 text-white h-screen">
        <div className="bg-[#2D2D2D] w-full h-32 px-4 py-5 flex flex-col justify-between rounded-[5px]">
          <h3 className="text-white text-xl font-medium">Estatísticas</h3>
          <form className="flex gap-6 items-center">
            <fieldset
              className="w-full relative flex"
              onClick={() => setViewCalendarInitial(!viewCalendarInitial)}
            >
              <input
                type="text"
                readOnly
                value={String(dateInitial)}
                placeholder="Pesquisa de palavras"
                className="w-full py-2 pl-3 pr-10 text-sm bg-[#474747] text-white rounded-md shadow-sm focus:outline-none placeholder:text-white"
              />
              <div className="min-w-[50px] h-[38px] bg-[#000] flex items-center justify-center rounded-md absolute right-0">
                <IoCalendarOutline size={20} />
              </div>
              {viewCalendarInitial && (
                <div ref={calendarRef} className="absolute z-10">
                  <Calendar
                    aria-label="Date (Controlled)"
                    value={dateInitial}
                    onChange={setDateInitial}
                  />
                </div>
              )}
            </fieldset>
            <fieldset
              className="w-full relative flex"
              onClick={() => setViewCalendarInitial2(!viewCalendarInitial2)}
            >
              <input
                type="text"
                readOnly
                value={String(dateInitial2)}
                placeholder="Pesquisa de palavras"
                className="w-full py-2 pl-3 pr-10 text-sm bg-[#474747] text-white rounded-md shadow-sm focus:outline-none placeholder:text-white"
              />
              <div className="min-w-[50px] h-[38px] bg-[#000] flex items-center justify-center rounded-md absolute right-0">
                <IoCalendarOutline size={20} />
              </div>
              {viewCalendarInitial2 && (
                <div ref={calendarRef} className="absolute z-10">
                  <Calendar
                    aria-label="Date (Controlled)"
                    value={dateInitial2}
                    onChange={setDateInitial2}
                  />
                </div>
              )}
            </fieldset>

            <fieldset className="w-full flex relative">
              <input
                type="text"
                placeholder="Pesquisa de palavras"
                className="w-full py-2 pl-3 pr-10 text-sm bg-[#474747] text-white rounded-md shadow-sm focus:outline-none placeholder:text-white"
              />
              <button className="min-w-[50px] h-[38px] bg-[#000] flex items-center justify-center rounded-md absolute right-0">
                <IoSearch size={20} />
              </button>
            </fieldset>
            <button className="min-w-[220px] text-sm h-[38px] bg-[#171717] flex items-center justify-center rounded-md">
              Ver estatísticas
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
