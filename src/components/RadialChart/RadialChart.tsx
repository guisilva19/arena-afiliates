"use client";

import { RadialBar, RadialBarChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { IData } from "../Graphic/Graphic";

export const description = "A radial chart with stacked sections";

const chartData = [{ month: "january", desktop: 1260, mobile: 570 }];

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

export function RadialChartGraphic({ data }: { data: IData }) {
  const totalVisitors = chartData[0].desktop + chartData[0].mobile;

  return (
    <Card
      className="flex flex-col"
      style={{
        backgroundColor: "#202020",
        color: "white",
        border: "none",
      }}
    >
      <CardHeader className="items-center pb-0 ">
        <CardTitle>Visão geral</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto  w-full h-[472px] flex items-center justify-center"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={190}
            outerRadius={270}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <RadialBar
              dataKey="desktop"
              stackId="a"
              cornerRadius={5}
              fill="#85FF4C"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="mobile"
              fill="#575DFF"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="mobile"
              fill="#00C2FF"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
