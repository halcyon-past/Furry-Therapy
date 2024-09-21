"use client";
import React, { useState } from 'react';
import { Menu } from 'lucide-react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const scrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
        setIsOpen(false);
    };

    const menuItems = [
        { label: 'Home', sectionId: 'home' },
        { label: 'About', sectionId: 'about' },
        { label: 'Testimonials', sectionId: 'testimonials' },
        { label: 'Contact Us', sectionId: 'contact' },
    ];

    return (
        <nav className="nav h-20 w-full text-black fixed z-50 bg-[#ffffff55] backdrop-blur-md sm:h-28">
            <div className="container mx-auto h-full flex items-center justify-between px-4">
                <div className="font-bold cursor-pointer text-[30px] font-[Gistesy] sm:text-[50px]">Furry Therapy</div>
                
                {/* Desktop Menu */}
                <div className="hidden md:flex items-center justify-around space-x-4 w-1/2">
                    {menuItems.map((item, index) => (
                        <button 
                            key={index} 
                            onClick={() => scrollToSection(item.sectionId)}
                            className="hover:text-[#a17d60] cursor-pointer"
                        >
                            {item.label}
                        </button>
                    ))}
                    <button className="bg-[#e5ded1] flex justify-center items-center rounded-lg w-24 h-10 hover:bg-[#a17d60]">
                        Login
                    </button>
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
                <div className="md:hidden bg-[#ffffffcc] backdrop-blur-md absolute top-20 left-0 w-full shadow-md">
                    {menuItems.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => scrollToSection(item.sectionId)}
                            className="block w-full text-left py-2 px-4 text-sm hover:text-[#a17d60]"
                        >
                            {item.label}
                        </button>
                    ))}
                    <button
                        className="block w-full py-2 px-4 text-sm text-center mt-2 bg-[#a78c76]"
                    >
                        Login
                    </button>
                </div>
            )}
        </nav>
    );
}