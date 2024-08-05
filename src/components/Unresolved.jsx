import React from 'react'
import { unresolved } from '../constant/data'
import { useTheme } from '../context/useThemeContext'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const Unresolved = () => {
    const { theme } = useTheme()
    const { t } = useTranslation()
    
    return (
        <div className={`col-span-4 lg:col-span-2 rounded-md border ${!theme ? 'bg-white' : 'bg-darkmode'}`}>
            <div className="flex justify-between items-center p-4">
                <div>
                    <div className="text-lg font-semibold">{t('homeCard2title')}</div>
                    <span className="text-sm text-gray-400">Group: Support</span>
                </div>
                <Link to={"/ticket"} className="text-blue-500 text-sm font-medium">{t('homeCard2cta')}</Link>
            </div>
            {unresolved.map((item, i) => (
                <div key={i} className={`p-4 border-b flex justify-between ${unresolved.length - 1 === i ? 'border-b-transparent' : ''}`}>
                    <span>{item.title}</span>
                    <span className="text-gray-500">{item.count}</span>
                </div>
            ))}
        </div>
    )
}

export default Unresolved