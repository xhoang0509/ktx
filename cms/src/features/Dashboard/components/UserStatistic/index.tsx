import { FC } from "react";
import {
    VictoryChart,
    VictoryLine,
    VictoryTheme,
    VictoryTooltip,
    VictoryVoronoiContainer,
} from "victory";

const UserStatistic: FC<any> = ({ data }) => {
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
            containerComponent={
                <VictoryVoronoiContainer
                    voronoiDimension="x"
                    labels={({ datum }) => `y: ${datum.y}`}
                    labelComponent={<VictoryTooltip />}
                />
            }
        >
            <VictoryLine data={data} />
        </VictoryChart>
    );
};

export default UserStatistic;
