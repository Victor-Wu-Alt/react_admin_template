import React, { useEffect, useRef } from 'react'
import echarts from '@/utils/echarts.ts'
import { EChartOption, ECharts } from 'echarts'

interface PieChartProps {
    data: Array<{ name: string; value: number }>
}

const PieChart: React.FC<PieChartProps> = ({data}) => {
    const chartRef = useRef<HTMLDivElement | null>(null);
    const chartInstance = useRef<ECharts | null>(null);

    useEffect(() => {
        if (chartRef.current) {
            // @ts-ignore
            chartInstance.current = echarts.init(chartRef.current);
        }

        const options: EChartOption = {
            grid:{
                left:'0%',
                right :'0',
                top :'0%',
                containLabel:false
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)',
            },
            series: [
                {
                    name: 'Data',
                    type: 'pie',
                    radius: '60%',
                    center: ['50%', '32%'],
                    data: data,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                        },
                    },
                },
            ],
        };

        if (chartInstance.current) {
            chartInstance.current.setOption(options);
        }

        // Clean up when component unmounts
        // Add resize event listener
        const handleResize = () => {
            if (chartInstance.current) {
                chartInstance.current.resize();
            }
        };

        window.addEventListener('resize', handleResize);

        // Clean up when component unmounts
        return () => {
            if (chartInstance.current) {
                chartInstance.current.dispose();
            }
            window.removeEventListener('resize', handleResize);
        };
    }, [data]);

    return <div ref={chartRef} style={{width: '100%', height: '200px'}}/>;
};

export default PieChart;
