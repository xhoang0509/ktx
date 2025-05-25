import { VictoryPie, VictoryTheme, VictoryTooltip } from "victory";

export default function DeviceChart({ data }: any) {
    return (
        <VictoryPie
            labels={({ datum }) => `${datum.x}: ${datum.y}`}
            labelComponent={<VictoryTooltip />}
            data={data}
            theme={VictoryTheme.clean}
        />
    );
}
