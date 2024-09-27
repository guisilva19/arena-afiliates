"use client";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
export const description = "A stacked area chart";

export default function AreaChartGraphic() {
  return (
    <>
      <Card
        style={{ backgroundColor: "#202020", color: "white", border: "none" }}
      >
        <CardHeader>
          <CardTitle>Performance Geral</CardTitle>
          <CardDescription>
            <div className="flex gap-3 items-center">
              <span className="flex gap-1 items-center">
                <div className="w-2 h-2 rounded-full bg-[#3a7fff]" />
                Registros
              </span>

              <span className="flex gap-1 items-center">
                <div className="w-2 h-2 rounded-full bg-[#85FF4C]" />
                Depositantes
              </span>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={chartConfig}
            style={{ backgroundColor: "#202020" }}
          >
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
                textDecoration={"#fff"}
                color="#fff"
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Area
                dataKey="depositantes"
                type="natural"
                fill="#85ff4c7a"
                fillOpacity={0.4}
                stroke="#85FF4C"
                stackId="a"
              />
              <Area
                dataKey="registros"
                type="natural"
                fill="#3a7fff8b"
                fillOpacity={0.4}
                stroke="#3a7fff"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </>
  );
}

const chartData = [
  { month: "Abril", registros: 43, depositantes: 20 },
  { month: "Maio", registros: 9, depositantes: 30 },
  { month: "Junho", registros: 14, depositantes: 40 },
  { month: "Julho", registros: 14, depositantes: 40 },
  { month: "Agosto", registros: 14, depositantes: 40 },
  { month: "Setembro", registros: 14, depositantes: 40 },
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
