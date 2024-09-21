"use client";
import React, { useState } from 'react';
import { Menu } from 'lucide-react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const menuItems = [
        { label: 'Home', href: '#' },
        { label: 'About', href: '#' },
        { label: 'Testimonials', href: '#' },
        { label: 'Contact Us', href: '#' },
    ];

    return (
        <nav className="nav h-28 w-full text-black">
            <div className="container mx-auto h-full flex items-center justify-between px-4">
                <div className="font-bold text-[30px] font-[Gistesy] sm:text-[50px]">Furry Therapy</div>
                
                {/* Desktop Menu */}
                <div className="hidden md:flex items-center justify-around space-x-4 w-1/2">
                    {menuItems.map((item, index) => (
                        <a key={index} href={item.href} className="hover:text-[#a17d60]">
                            {item.label}
                        </a>
                    ))}
                    <a href="#" className="bg-[#e5ded1] flex justify-center items-center rounded-lg w-24 h-10 hover:bg-[#a17d60]">
                        Login
                    </a>
                </div>
                
                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="focus:outline-none">
                        <Menu size={24} />
                    </button>
                </div>
            </div>
            
            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-white absolute top-28 left-0 w-full shadow-md">
                    {menuItems.map((item, index) => (
                        <a
                            key={index}
                            href={item.href}
                            className="block py-2 px-4 text-sm hover:bg-gray-100 hover:text-[#a17d60]"
                        >
                            {item.label}
                        </a>
                    ))}
                    <a
                        href="#"
                        className="block py-2 px-4 text-sm bg-[#e5ded1] text-center mt-2 hover:bg-[#a17d60]"
                    >
                        Login
                    </a>
                </div>
            )}
        </nav>
    );
}