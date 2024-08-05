import { Avatar, Drawer, List } from '@mui/material'
import React from 'react'
import { FaLightbulb, FaTicket } from "react-icons/fa6"
import { BiSolidPieChartAlt2 } from "react-icons/bi"
import { NavLink } from 'react-router-dom'
import { IoIosPaper, IoIosPeople, IoIosPerson } from "react-icons/io"
import { useTranslation } from 'react-i18next'

export const sidebar = [
    {
        title: 'navigation.overview',
        to: '/',
        key: '',
        icon: <BiSolidPieChartAlt2 className="w-5 h-5 text-inherit" />
    },
    {
        title: 'navigation.ticket',
        to: '/ticket',
        key: 'ticket',
        icon: <FaTicket className="w-5 h-5 text-inherit" />
    },
    {
        title: 'navigation.ideas',
        to: '/ideas',
        key: 'ideas',
        icon: <FaLightbulb className="w-5 h-5 text-inherit" />
    },
    {
        title: 'navigation.contacts',
        to: '/contact',
        key: 'contact',
        icon: <IoIosPeople className="w-5 h-5 text-inherit" />
    },
    {
        title: 'navigation.agents',
        to: '/agent',
        key: 'agent',
        icon: <IoIosPerson className="w-5 h-5 text-inherit" />
    },
    {
        title: 'navigation.articles',
        to: '/article',
        key: 'article',
        icon: <IoIosPaper className="w-5 h-5 text-inherit" />
    },
]

const Sidebar = ({ isDrawerOpen, toggleDrawer, isLargeScreen }) => {
    const { t } = useTranslation()

    const drawerContent = (
        <div className="min-h-full bg-gray-800 text-white">
            <div className="mb-6 py-6 flex gap-3 items-center justify-center">
                <Avatar src={"http://placehold.it/32x32"} alt={"logo-brand"} />
                <span>Dashboard Kit</span>
            </div>
            <List>
                {sidebar.map((item, i) => (
                    <NavLink to={item.to} key={i}>
                        {({ isActive }) => (
                            <div className={`flex gap-2 p-4 items-center border-l ${isActive ? 'border-l-white bg-gray-700' : 'border-l-transparent hover:bg-gray-500'}`}>
                                {item.icon}
                                <span>{t(item.title)}</span>
                            </div>
                        )}
                    </NavLink>
                ))}
            </List>
        </div>
    )

    return (
        <Drawer
            variant={isLargeScreen ? 'permanent' : 'temporary'}
            open={isLargeScreen || isDrawerOpen}
            onClose={toggleDrawer}
            sx={{
                '& .MuiDrawer-paper': {
                    boxSizing: 'border-box',
                    width: 250,
                },
            }}
        >
            {drawerContent}
        </Drawer>
    )
}

export default Sidebar