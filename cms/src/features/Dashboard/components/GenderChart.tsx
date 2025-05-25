import { VictoryPie, VictoryTheme, VictoryLabel } from 'victory';
import { GenderData } from '../types';

interface GenderChartProps {
    data: GenderData[];
}

const GenderChart = ({ data }: GenderChartProps) => {
    return (
        <div className="h-full">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Phân bố sinh viên theo giới tính</h3>
            <div className="h-80 flex items-center justify-center">
                <VictoryPie
                    data={data}
                    x="gender"
                    y="count"
                    theme={VictoryTheme.material}
                    colorScale={["#3b82f6", "#ec4899"]}
                    innerRadius={50}
                    padAngle={3}
                    labelComponent={
                        <VictoryLabel 
                            style={{ 
                                fontSize: 14, 
                                fontWeight: "bold",
                                fill: "white"
                            }} 
                        />
                    }
                    labelRadius={({ innerRadius }) => innerRadius as number + 30 }
                    animate={{
                        duration: 1000
                    }}
                    height={300}
                    width={300}
                />
            </div>
            <div className="flex justify-center space-x-6 mt-4">
                {data.map((item, index) => (
                    <div key={index} className="flex items-center">
                        <div 
                            className={`w-4 h-4 rounded mr-2 ${index === 0 ? 'bg-blue-500' : 'bg-pink-500'}`}
                        ></div>
                        <span className="text-sm text-gray-600">
                            {item.gender}: {item.count} ({item.percentage}%)
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GenderChart; 