import AreaChartGraphic from "../AreaChart/AreaChart";
import { BarChartGraphic } from "../BarChart/BarChart";
import { BarChartGraphicAfiliate } from "../BarChartAfiliate/BarChartAfiliate";
import { LineChartGraphic } from "../LineChart/LineChart";

export interface IDataObj {
  month: string;
  monthName: string;
  data: {
    stakes: number;
    chargebacks: number;
    cliques: number;
    comissao_cpa: number;
    comissao_revshare: number;
    comissao_total: number;
    contagem_cpa: number;
    contagem_ftd: number;
    contas_ativas: number;
    contas_de_aposta: number;
    contas_depositantes: number;
    net_player: number;
    novos_depositantes: number;
    receita_liquida: number;
    registros: number;
    depositos: number;
  };
}

export interface IData {
  total_count_cpa: number;
  total_receita_liquida: number;
  total_comissao_total: number;
  data: IDataObj[];
}

export interface IDataUnique {
  stakes: number;
  chargebacks: number;
  cliques: number;
  comissao_cpa: number;
  comissao_revshare: number;
  comissao_total: number;
  contagem_cpa: number;
  contagem_ftd: number;
  contas_ativas: number;
  contas_de_aposta: number;
  contas_depositantes: number;
  net_player: number;
  novos_depositantes: number;
  receita_liquida: number;
  registros: number;
  depositos: number;
}

export default function Graphic({
  data,
  afiliate,
}: {
  data: any;
  afiliate: boolean;
}) {
  console.log("area", data);

  return (
    <>
      <main className="bg-[#212121]">
        <div className="w-full  p-5 flex">
          <section className="w-6/12">
            <AreaChartGraphic data={data} />
          </section>
          <section className="flex flex-col w-6/12">
            {afiliate ? (
              <BarChartGraphicAfiliate data={data} />
            ) : (
              <BarChartGraphic data={data} />
            )}
          </section>
        </div>
        {!afiliate && (
          <div className="w-full p-5 flex">
            <section className="w-6/12">
              <LineChartGraphic data={data} />
            </section>
            {/* <section className="flex flex-col w-6/12">
              <RadialChartGraphic data={data} />
            </section> */}
          </div>
        )}
      </main>
    </>
  );
}
