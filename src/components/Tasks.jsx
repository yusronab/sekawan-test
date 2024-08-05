import React from 'react'
import { FaSquarePlus } from "react-icons/fa6"
import { tasks } from '../constant/data'
import { Chip } from '@mui/material'
import { getStatusColor } from '../constant/func'
import { useTheme } from '../context/useThemeContext'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const Tasks = () => {
    const { theme } = useTheme()
    const { t } = useTranslation()
    
    return (
        <div className={`col-span-4 lg:col-span-2 rounded-md border ${!theme ? 'bg-white' : 'bg-darkmode'}`}>
            <div className="flex justify-between items-center p-4">
                <div>
                    <div className="text-lg font-semibold">{t('homeCard3title')}</div>
                    <span className="text-sm text-gray-400">Today</span>
                </div>
                <Link to={"/ticket"} className="text-blue-500 text-sm font-medium">{t('homeCard3cta')}</Link>
            </div>
            <div className="flex justify-between items-center p-4 border-b text-gray-400">
                <span>Create new task</span>
                <FaSquarePlus />
            </div>
            {tasks.map((item, i) => (
                <div key={i} className={`p-4 border-b flex gap-2 ${tasks.length - 1 === i ? 'border-b-transparent' : ''}`}>
                    <div>{item.content}</div>
                    <div className="ml-auto text-sm">
                        <Chip
                            label={item.status}
                            color={getStatusColor(item.status)}
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Tasks