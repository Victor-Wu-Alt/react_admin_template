import React from "react";
import PieChart from '@/components/echarts/pieChart'
import '@/styles/dashboard.scss'

const Dashboard: React.FC = () => {
    const pieChartData = [
        {name: 'Category A', value: 30},
        {name: 'Category B', value: 40},
        {name: 'Category C', value: 20},
        {name: 'Category D', value: 10},
    ];
    return (
        <div className='dashboard_wrap'>
            <div className='top'>
                <div> <PieChart data={pieChartData}/></div>
                <div> <PieChart data={pieChartData}/></div>
                <div> <PieChart data={pieChartData}/></div>
            </div>
        </div>
    )
}

export default Dashboard
