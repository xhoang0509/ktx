import { FC } from "react";
import { VictoryPie, VictoryTheme } from "victory";

const ProductStatistic: FC<any> = ({ data: { _id, ...rest } }) => {
  return (
    <VictoryPie
      data={Object.entries({ ...rest }).map(([key, value]) => ({
        x: key,
        y: value,
      }))}
      // labelComponent={<VictoryTooltip />}
      labels={({ datum }) => (!!datum.y ? `${datum.x}: ${datum.y}` : null)}
      theme={VictoryTheme.clean}
    />
  );
};

export default ProductStatistic;
