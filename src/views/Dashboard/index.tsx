import React from 'react'
import '@/styles/dashboard.scss'
import { Card, Col, Row } from 'antd'
import BarChart from '@/components/echarts/barChart.tsx'
import PieChart from '@/components/echarts/pieChart.tsx'
import RadarChart from '@/components/echarts/radarChart.tsx'
import LiquidFillGauge from '@/components/echarts/liquidFillGauge.tsx'

const Dashboard: React.FC = () => {
    //chart数据
    const BarChartData = [
        { name: 'A', value: 30 },
        { name: 'B', value: 40 },
        { name: 'C', value: 20 },
        { name: 'D', value: 10 },
        { name: 'E', value: 50 },
        { name: 'F', value: 25 },
        { name: 'G', value: 35 },
        { name: 'H', value: 15 },
        { name: 'I', value: 55 },
        { name: 'J', value: 45 },
    ]

    //雷达图数据
    const radarData = [80, 90, 70, 60, 75] // 你的雷达图数据

    //水球图
    const gaugeValue = 0.25 // 你的水球图值
    const gaugeTitle = '销售量'

    return (
        <div className='dashboard_wrap'>
            <>
                <Row gutter={16}>
                    <Col className='gutter-row' span={6}>
                        <Card>
                            <BarChart data={BarChartData} />
                        </Card>
                    </Col>
                    <Col className='gutter-row' span={6}>
                        <Card>
                            <PieChart data={BarChartData} />
                        </Card>
                    </Col>
                    <Col className='gutter-row' span={6}>
                        <Card>
                            <RadarChart data={radarData}></RadarChart>
                        </Card>
                    </Col>
                    <Col className='gutter-row' span={6}>
                        <Card>
                            <LiquidFillGauge
                                value={gaugeValue}
                                title={gaugeTitle}></LiquidFillGauge>
                        </Card>
                    </Col>
                </Row>
            </>
            <div className='content'>
                <div className='right'>右边</div>
                <div className='left'>左边</div>
            </div>
        </div>
    )
}

export default Dashboard
