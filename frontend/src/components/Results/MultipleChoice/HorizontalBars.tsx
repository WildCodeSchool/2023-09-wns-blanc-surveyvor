import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
  ResponsiveContainer,
} from "recharts";
import { MultipleChoiceQuestionResultsProps } from "./MultipleChoiceQuestionResults";
import { countOptions } from "@/lib/tools/answer.tools";

function HorizontalBars({
  answers,
  question,
}: MultipleChoiceQuestionResultsProps) {
  if (!answers) return null;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={countOptions(answers, question)}
        layout="vertical"
        margin={{
          top: 20,
          right: 1,
          left: 1,
          bottom: 5,
        }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" tick={false} width={0} />
        <Tooltip />
        <Bar dataKey="value">
          <LabelList
            dataKey="name"
            position="insideLeft"
            fill="#fff"
            style={{ fontSize: "12px" }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default HorizontalBars;

