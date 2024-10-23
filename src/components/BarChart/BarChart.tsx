"use client";
import { Bar, BarChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { IData } from "../Graphic/Graphic";

export const description = "A multiple bar chart";

const chartData = [
  { month: "Abril", faturamento: 4000 },
  { month: "Maio", faturamento: 3000 },
  { month: "Junho", faturamento: 4500 },
  { month: "Julho", faturamento: 5000 },
  { month: "Agosto", faturamento: 4500 },
  { month: "Setembro", faturamento: 5000 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function BarChartGraphic({ data }: { data: IData }) {

  return (
    <Card
      style={{ backgroundColor: "#202020", color: "white", border: "none" }}
    >
      <CardHeader>
        <CardTitle>Proveito total</CardTitle>
        <CardDescription>
          <span className="flex gap-1 items-center">
            <div className="w-2 h-2 rounded-full bg-[#85FF4C]" />
             
            {data?.total_receita_liquida?.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data.data}>
            <XAxis
              dataKey="monthName"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="data.receita_liquida" fill="#85FF4C" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
