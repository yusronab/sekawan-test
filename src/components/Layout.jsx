import React, { useState } from 'react'
import Sidebar from './Sidebar'
import { Navigate, Outlet } from 'react-router-dom'
import { useMediaQuery, useTheme as useMaterialTheme } from '@mui/material';
import Navbar from './Navbar';
import { useTheme } from '../context/useThemeContext';

const Layout = () => {
    const materialTheme = useMaterialTheme();
    const { theme, language, changeLanguage } = useTheme();
    const isLargeScreen = useMediaQuery(materialTheme.breakpoints.up('lg'));
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const token = localStorage.getItem("dkAccessToken");
    if (token === null) return <Navigate to="/login" />

    const toggleDrawer = () => {
        setDrawerOpen(!isDrawerOpen);
    };

    return (
        <div className="min-h-screen max-w-screen flex">
            <Sidebar isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} isLargeScreen={isLargeScreen} />
            <div className={`p-4 overflow-x-hidden ${!theme ? 'bg-gray-100' : 'bg-gray-800'} w-full ${isLargeScreen ? 'ml-[250px]' : 'ml-0'}`}>
                <Navbar isLargeScreen={isLargeScreen} toggleDrawer={toggleDrawer} />
                <Outlet />
            </div>
        </div>
    )
}

export default Layout