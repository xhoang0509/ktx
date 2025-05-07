import { FC } from "react";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryTooltip,
} from "victory";

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
        data={data.map(({ _id, count }: { _id: string; count: number }) => ({
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
