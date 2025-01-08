import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import DonutSmallOutlinedIcon from '@mui/icons-material/DonutSmallOutlined';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';

const NavbarMobile = () => {
    const location = useLocation(); // Get the current location

    const navItems = [
        {
            name: 'Dashboard',
            path: '/',
            icon: location.pathname === '/' ? <DonutSmallIcon /> : <DonutSmallOutlinedIcon fontSize="small" />,
        },
        {
            name: 'Portfolio',
            path: '/portfolio',
            icon: location.pathname === '/portfolio' ? <FolderIcon /> : <FolderOutlinedIcon fontSize="small" />,
        },
        {
            name: 'History',
            path: '/history',
            icon: location.pathname === '/history' ? <NoteAltIcon /> : <NoteAltOutlinedIcon fontSize="small" />,
        },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 flex justify-between py-2 px-8 bg-zinc-900 w-full">
            <div className="flex items-center justify-between w-full">
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        to={item.path}
                        className={`flex flex-col items-center text-xs ${location.pathname === item.path
                            ? 'text-white font-bold'
                            : 'text-gray-400'
                            } hover:text-white`}
                    >
                        <div className="mb-1">{item.icon}</div>
                        <span>{item.name}</span>
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default NavbarMobile;
