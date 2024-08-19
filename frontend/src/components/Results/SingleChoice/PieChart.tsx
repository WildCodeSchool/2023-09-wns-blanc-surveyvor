import React from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { SingleChoiceQuestionResultsProps } from "./SingleChoiceQuestionResults";
import { countOptions } from "@/lib/tools/answer.tools";

type CustomizedLabel = {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  index: number;
};

function PieCh({ answers, question }: SingleChoiceQuestionResultsProps) {
  if (!answers) return null;

  const data = countOptions(answers, question).map((entry) => ({
    ...entry,
    value: entry.value === 0 ? 0.01 : entry.value,
  }));

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    index,
  }: CustomizedLabel) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central">
        {`${data[index].percentage}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" aspect={1} maxHeight={400}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          labelLine={false}
          label={renderCustomizedLabel}
          legendType="circle">
          {countOptions(answers, question).map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: number, name: string) => [
            `${value.toFixed(0)}`,
            `${name}`,
          ]}
          contentStyle={{
            backgroundColor: "#fafafa",
            color: "#fff",
          }}
        />
        <Legend
          layout="horizontal"
          align="center"
          verticalAlign="bottom"
          chartHeight={100}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default PieCh;

