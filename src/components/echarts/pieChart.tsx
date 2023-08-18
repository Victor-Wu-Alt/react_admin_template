import React, {useEffect, useRef} from 'react';
import  echarts from '@/utils/echarts.ts'
import {EChartOption, ECharts} from 'echarts';

interface PieChartProps {
    data: Array<{ name: string; value: number }>;
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
            title: {
                text: 'Pie Chart',
                // @ts-ignore
                x: 'center' as const, // Cast the type to a known value
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)',
            },
            // legend: {
            //     orient: 'vertical',
            //     left: 'left',
            //     data: data.map(item => item.name),
            // },
            series: [
                {
                    name: 'Data',
                    type: 'pie',
                    radius: '50%',
                    center: ['50%', '60%'],
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

    return <div ref={chartRef} style={{width: '300px', height: '200px'}}/>;
};

export default PieChart;
