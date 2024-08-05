import React from 'react'
import { chart } from '../constant/data'
import { useTheme } from '../context/useThemeContext'
import Chart from 'react-apexcharts'
import { useTranslation } from 'react-i18next'

const ChartCard = () => {
    const { theme } = useTheme()
    const { t } = useTranslation()

    const options = {
        chart: {
            id: 'basic-line',
            toolbar: {
                show: false,
            },
        },
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        xaxis: {
            categories: [...Array(24).keys()],
        },
        yaxis: {
            min: 0,
            max: 60,
            tickAmount: 6,
        },
        tooltip: {
            enabled: true,
            shared: true,
            intersect: false,
            y: {
                formatter: function (val) {
                    return val;
                },
            },
        },
        markers: {
            size: 4,
            hover: {
                size: 6,
            },
        },
        legend: {
            show: true,
            position: 'top',
            horizontalAlign: 'right',
            labels: {
                colors: '#333',
            },
        },
        grid: {
            show: true,
        },
        colors: ['#2962FF', '#C3CAD9'],
    }

    const series = [
        {
            name: 'Today',
            data: [10, 20, 15, 25, 20, 30, 25, 35, 30, 40, 35, 45, 40, 50, 45, 55, 50, 45, 40, 35, 30, 25, 20, 15],
        },
        {
            name: 'Yesterday',
            data: [15, 25, 20, 30, 25, 35, 30, 40, 35, 45, 40, 50, 45, 55, 50, 45, 40, 35, 30, 25, 20, 15, 10, 5],
        },
    ]

    return (
        <div className={`col-span-4 rounded-md border ${!theme ? 'bg-white' : 'bg-darkmode'}`}>
            <div className="w-full flex flex-col md:flex-row">
                <div className="lg:w-2/3 p-6">
                    <div className="text-lg font-semibold">Today's trends</div>
                    <span className="text-sm text-gray-400">as of 25 May 2019</span>
                    <Chart
                        options={options}
                        series={series}
                        type="line"
                        height="350"
                    />
                </div>
                <div className="flex-1 md:border-l">
                    {chart.map((item, i) => (
                        <div key={i} className={`flex flex-col justify-center items-center gap-2 p-4 border-b ${chart.length - 1 === i ? 'border-b-transparent' : ''}`}>
                            <span className="text-gray-400">{t(item.title)}</span>
                            <div className="text-lg font-medium">{item.value}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ChartCard