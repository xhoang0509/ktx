import { FC } from "react";
import {
  VictoryBar,
  VictoryChart,
  VictoryContainer,
  VictoryLine,
  VictoryTheme,
  VictoryTooltip,
} from "victory";

const RevenueStatistic: FC<any> = ({ data }) => {
  return (
    <VictoryChart
      domainPadding={{ x: 20 }}
      height={400}
      width={1500}
      containerComponent={<VictoryContainer responsive={true} />}
      theme={VictoryTheme.clean}
      padding={{
        top: 30,
        left: 100,
        right: 10,
        bottom: 50,
      }}
    >
      <VictoryLine
        data={data?.labels?.map((label: string, index: number) => ({
          x: label,
          y: data.data[index],
        }))}
        labelComponent={<VictoryTooltip />}
        labels={({ datum }) => datum.y}
      />
    </VictoryChart>
  );
};

export default RevenueStatistic;
