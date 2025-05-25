import { VictoryChart, VictoryBar, VictoryAxis, VictoryTheme, VictoryGroup, VictoryLegend } from 'victory';
import { MonthlyBillData } from '../types';

interface MonthlyChartProps {
    data: MonthlyBillData[];
}

const MonthlyChart = ({ data }: MonthlyChartProps) => {
    return (
        <div className="h-full">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Hóa đơn điện nước theo tháng</h3>
            <div className="h-80">
                <VictoryChart
                    theme={VictoryTheme.material}
                    domainPadding={20}
                    padding={{ left: 80, top: 40, right: 80, bottom: 60 }}
                    height={300}
                >
                    <VictoryLegend
                        x={100}
                        y={10}
                        orientation="horizontal"
                        gutter={20}
                        style={{ border: { stroke: "black" }, title: { fontSize: 20 } }}
                        data={[
                            { name: "Đã thanh toán", symbol: { fill: "#22c55e" } },
                            { name: "Chưa thanh toán", symbol: { fill: "#ef4444" } }
                        ]}
                    />
                    <VictoryAxis dependentAxis tickFormat={(x) => `${x/1000}k`} />
                    <VictoryAxis />
                    <VictoryGroup offset={20} colorScale={["#22c55e", "#ef4444"]}>
                        <VictoryBar
                            data={data}
                            x="month"
                            y="paid"
                        />
                        <VictoryBar
                            data={data}
                            x="month"
                            y="unpaid"
                        />
                    </VictoryGroup>
                </VictoryChart>
            </div>
        </div>
    );
};

export default MonthlyChart; 