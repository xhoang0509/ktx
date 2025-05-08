import { FC } from "react";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryTooltip,
} from "victory";

const data2 = [
  { _id: "Tháng 1", count: 10 },
  { _id: "Tháng 2", count: 20 },
  { _id: "Tháng 3", count: 30 },
  { _id: "Tháng 4", count: 40 },
  { _id: "Tháng 5", count: 50 },
]
const ImportStatistic: FC<any> = ({ data }) => {
  return (
    <VictoryChart
      domainPadding={{ x: 20 }}
      theme={VictoryTheme.clean}
      padding={{
        top: 30,
        left: 10,
        right: 10,
        bottom: 50,
      }}
    >
      <VictoryBar
        data={data2.map(({ _id, count }: { _id: string; count: number }) => ({
          x: _id,
          y: count,
        }))}
        labelComponent={<VictoryTooltip />}
        labels={({ datum }) => datum.y}
      />
    </VictoryChart>
  );
};

export default ImportStatistic;
