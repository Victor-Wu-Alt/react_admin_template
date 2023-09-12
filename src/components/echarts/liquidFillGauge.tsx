import React, { useEffect, useRef, useState } from 'react'
import echarts from '@/utils/echarts.ts'
import { EChartOption, ECharts } from 'echarts'
import 'echarts-liquidfill'

interface LiquidFillGaugeProps {
    value: number // 水球图的值，取值范围0-1
    title: string // 图表标题
}

const LiquidFillGauge: React.FC<LiquidFillGaugeProps> = ({ value, title }) => {
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
                series: [
                    {
                        type: 'liquidFill',
                        data: [value],
                        radius: '90%',
                        center: ['50%', '50%'],
                        label: {
                            normal: {
                                textStyle: {
                                    fontSize: 16,
                                    color: 'black',
                                },
                                formatter: `{a|${title}}\n{b|${(value * 100).toFixed(2)}%}`,
                                rich: {

                                },
                            },
                        },
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
    }, [value, title]);

    return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />;
};

export default LiquidFillGauge;
