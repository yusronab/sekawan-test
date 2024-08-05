import React from 'react'
import { listCard } from '../constant/data'
import Unresolved from '../components/Unresolved'
import Tasks from '../components/Tasks'
import ChartCard from '../components/ChartCard'
import { useTheme } from '../context/useThemeContext'
import { useTranslation } from 'react-i18next'

const Home = () => {
    const { theme } = useTheme()
    const { t } = useTranslation()
    
    return (
        <div>
            <div className="grid grid-cols-4 gap-6">
                {listCard.map((item, i) => (
                    <div key={i} className={`col-span-4 md:col-span-2 lg:col-span-1 cursor-pointer p-4 flex flex-col items-center justify-center gap-2 ${!theme ? 'bg-white' : 'bg-darkmode'} rounded-md border hover:border-blue-500 hover:text-blue-500 group`}>
                        <span className="text-gray-500 font-medium group-hover:text-blue-500">{t(item.title)}</span>
                        <h1 className="text-3xl font-semibold">{item.count}</h1>
                    </div>
                ))}
                <ChartCard />
                <Unresolved />
                <Tasks />
            </div>
        </div>
    )
}

export default Home