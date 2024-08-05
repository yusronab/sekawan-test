import { useTheme } from "../context/useThemeContext";
import { MdLightMode, MdLogout, MdSettings } from "react-icons/md";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { FaBarsStaggered } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { sidebar } from "./Sidebar";
import { auth } from "../constant/data";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Navbar = ({ toggleDrawer, isLargeScreen }) => {
    const { theme, toggleTheme } = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const { i18n, t } = useTranslation();
    const navigate = useNavigate();

    const handleToggle = () => {
        toggleTheme();
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const { pathname } = useLocation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const handleLogout = () => {
        localStorage.removeItem('dkAccessToken');
        navigate('/login');
    };

    return (
        <>
            <nav className="flex items-center justify-between mb-6">
                <div className="text-2xl">{t(sidebar.find((item) => item.to === pathname).title)}</div>
                <div className="flex gap-2 items-center">
                    <div className="flex md:gap-2">
                        <button onClick={() => changeLanguage('en')} className={`p-2 rounded-md ${i18n.language === 'en' ? 'bg-gray-200' : ''}`}>en</button>
                        <button onClick={() => changeLanguage('id')} className={`p-2 rounded-md ${i18n.language === 'id' ? 'bg-gray-200' : ''}`}>id</button>
                    </div>
                    {!isLargeScreen && (
                        <IconButton onClick={toggleDrawer} color="inherit" >
                            <FaBarsStaggered />
                        </IconButton>
                    )}
                    <IconButton onClick={handleToggle} color="inherit">
                        {theme ? <BsFillMoonStarsFill /> : <MdLightMode />}
                    </IconButton>
                    <button onClick={handleClick} className="flex gap-2 items-center border-l-2 pl-4 border-l-gray-300">
                        <Avatar src={auth.picture} alt={auth.name} />
                        <p className="hidden md:block">{auth.name}</p>
                    </button>
                </div>
            </nav>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClose}>
                    <Avatar /> Profile
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Avatar /> My account
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <MdSettings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <MdLogout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    )
}

export default Navbar
