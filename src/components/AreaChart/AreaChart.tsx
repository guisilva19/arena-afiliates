"use client";
import { Area, AreaChart, XAxis } from "recharts";
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

export default function AreaChartGraphic({ data }: { data: IData }) {
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
              data={data.data}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <XAxis
                dataKey="monthName"
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
                dataKey="data.registros"
                type="natural"
                fill="#3a7fff8b"
                fillOpacity={0.4}
                stroke="#3a7fff"
                stackId="1"
              />
              <Area
                dataKey="data.contas_depositantes"
                type="natural"
                fill="#85ff4c7a"
                fillOpacity={0.4}
                stroke="#85FF4C"
                stackId="1"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </>
  );
}

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
