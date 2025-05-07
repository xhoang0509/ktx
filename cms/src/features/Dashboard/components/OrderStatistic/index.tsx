import { FC } from "react";
import { VictoryPie, VictoryTheme } from "victory";

const OrderStatistic: FC<any> = ({ data }) => {
  return (
    <VictoryPie
      data={data.map(({ _id, count }: { _id: string; count: number }) => ({
        x: _id,
        y: count,
      }))}
      // labelComponent={<VictoryTooltip />}
      labels={({ datum }) => `${datum.x}: ${datum.y}`}
      theme={VictoryTheme.clean}
    />
  );
};

export default OrderStatistic;
