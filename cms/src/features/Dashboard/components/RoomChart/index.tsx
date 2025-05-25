import {
    VictoryChart,
    VictoryLine,
    VictoryTheme,
    VictoryTooltip,
    VictoryVoronoiContainer,
} from "victory";

export default function RoomChart({ data }: any) {
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
}
