import AreaChartGraphic from "../AreaChart/AreaChart";
import { BarChartGraphic } from "../BarChart/BarChart";
import { LineChartGraphic } from "../LineChart/LineChart";
import { RadialChartGraphic } from "../RadialChart/RadialChart";

export default function Graphic() {
  return (
    <>
      <main>
        <div className="w-full bg-[#212121] p-5 flex">
          <section className="w-6/12">
            <AreaChartGraphic />
          </section>
          <section className="flex flex-col w-6/12">
            <BarChartGraphic />
          </section>
        </div>
        <div className="w-full bg-[#212121] p-5 flex">
          <section className="w-6/12">
            <LineChartGraphic />
          </section>
          <section className="flex flex-col w-6/12">
            <RadialChartGraphic />
            <div className="">

            </div>
          </section>
        </div>
      </main>
    </>
  );
}
