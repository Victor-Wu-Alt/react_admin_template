import React, { useEffect, useRef, useState } from 'react'
import echarts from '@/utils/echarts.ts'
import { EChartOption, ECharts } from 'echarts'

interface RadarChartProps {
    data: number[] // 雷达图数据，例如[80, 90, 70, 60, 75]
}

const RadarChart: React.FC<RadarChartProps> = ({ data }) => {
    const chartRef = useRef<HTMLDivElement | null>(null);
    const [chart, setChart] = useState<ECharts | null>(null);

    // 监听窗口大小变化
    useEffect(() => {
        function handleResize() {
            if (chart) {
                chart.resize();
            }
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [chart]);

    useEffect(() => {
        if (chartRef.current) {
            const newChart = echarts.init(chartRef.current);

            const option: EChartOption = {
                radar: {
                    radius: '100%',
                    name: {
                        textStyle: {
                            color: '#fff',
                            fontSize: 12
                        }
                    },
                    indicator: [
                        { name: '维度1' },
                        { name: '维度2' },
                        { name: '维度3' },
                        { name: '维度4' },
                        { name: '维度5' },
                    ],
                },
                tooltip: {},
                series: [
                    {
                        type: 'radar',
                        data: [
                            {
                                value: data, // 传入的雷达图数据
                                name: '数据名称',
                            },
                        ],
                    },
                ],
            };

            // @ts-ignore
            newChart.setOption(option);
            // @ts-ignore
            setChart(newChart);

            // 在组件卸载时销毁图表实例
            return () => {
                newChart.dispose();
            };
        }
    }, [data]);

    return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />;
};

export default RadarChart;
