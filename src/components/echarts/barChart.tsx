import React, { useEffect, useRef } from 'react'
import echarts from '@/utils/echarts.ts'
import { EChartOption, ECharts } from 'echarts'

interface BarChartProps {
    data: Array<{ name: string; value: number }>
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
    const chartRef = useRef<HTMLDivElement | null>(null)
    const chartInstance = useRef<ECharts | null>(null)

    useEffect(() => {
        if (chartRef.current) {
            // @ts-ignore
            chartInstance.current = echarts.init(chartRef.current)
        }

        const options: EChartOption = {
            grid: {
                left: '0%',
                right: '0',
                top: '-2%',
            },
            xAxis: {
                type: 'category',
                data: data.map((item) => item.name),
            },
            yAxis: {
                type: 'value',
            },
            tooltip: {
                trigger: 'item',
                formatter: '{b}: {c}',
            },
            series: [
                {
                    name: 'Data',
                    type: 'bar',
                    barWidth: 20,
                    data: data.map((item) => item.value),
                },
            ],
        }

        if (chartInstance.current) {
            chartInstance.current.setOption(options)
        }

        // Add resize event listener
        const handleResize = () => {
            if (chartInstance.current) {
                chartInstance.current.resize()
            }
        }

        window.addEventListener('resize', handleResize)

        // Clean up when component unmounts
        return () => {
            if (chartInstance.current) {
                chartInstance.current.dispose()
            }
        }
    }, [data])

    return <div ref={chartRef} style={{ width: '100%', height: '200px' }} />
}

export default BarChart
