import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const location = useLocation(); // Get the current location

    return (
        <nav className="flex items-center justify-between py-4 px-8 bg-zinc-900">
            <div className="flex items-center space-x-4">
                <div className="text-xl font-bold">CapX</div>
                <div className="hidden px-10 md:flex space-x-10">
                    {[
                        { name: 'Dashboard', path: '/' },
                        { name: 'Portfolio', path: '/portfolio' },
                        { name: 'History', path: '/history' },
                    ].map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`${location.pathname === item.path
                                ? 'text-white font-bold'
                                : 'text-gray-400'
                                } hover:text-white`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <div className="relative hidden md:flex">
                    <input
                        className="px-4 py-2 bg-zinc-900 rounded-full text-sm outline outline-1 outline-gray-400 focus:outline focus:outline-white min-w-[20vw]"
                        placeholder="Search"
                        type="text"
                    />
                    <FontAwesomeIcon
                        icon={faSearch}
                        className="absolute right-3 translate-y-1/2 text-gray-400"
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <img
                        alt="User avatar"
                        className="w-8 h-8 rounded-full"
                        src="https://storage.googleapis.com/a1aa/image/HDRSjOXMHxIePymna6cLalULPDTftYecNcfVxK2D7mDowBEQB.jpg"
                    />
                    <span>Sahil K</span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
