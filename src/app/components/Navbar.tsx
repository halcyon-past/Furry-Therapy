"use client";
import React, { useState } from 'react';
import { Menu, XIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Navbar() {
    const { data: session } = useSession();
    const router = useRouter();
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

    const defaultMenuItems = [
        { label: 'Home', sectionId: 'home' },
        { label: 'About', sectionId: 'about' },
        { label: 'Testimonials', sectionId: 'testimonials' },
        { label: 'Contact Us', sectionId: 'contact' },
    ];

    const petOwnerMenuItems = [
        { label: 'My Pets', path: '/my_pets' },
        { label: 'Add Pet', path: '/register_pet' },
    ];

    const userMenuItems = [
        { label: 'Edit Bio', path: '/register_user' },
        { label: 'Find Dates', path: '/date' },
    ];

    const loginWithGoogle = () => {
        signIn('google', { callbackUrl: '/date' });
    };

    const home = () => {
        router.push('/');
    };

    const logout = () => {
        signOut({ callbackUrl: '/' });
    };

    const renderMenuItems = () => {
        if (session?.user) {
            const userType = session.user.userType;

            if (userType === 'pet_owner') {
                return petOwnerMenuItems.map((item, index) => (
                    <button 
                        key={index} 
                        onClick={() => router.push(item.path)}
                        className="hover:text-[#a17d60] cursor-pointer mb-4 md:mb-0 md:ml-6"
                    >
                        {item.label}
                    </button>
                ));
            }

            if (userType === 'user') {
                return userMenuItems.map((item, index) => (
                    <button 
                        key={index} 
                        onClick={() => router.push(item.path)}
                        className="hover:text-[#a17d60] cursor-pointer mb-4 md:mb-0 md:ml-6"
                    >
                        {item.label}
                    </button>
                ));
            }
        }

        return defaultMenuItems.map((item, index) => (
            <button 
                key={index} 
                onClick={() => scrollToSection(item.sectionId)}
                className="hover:text-[#a17d60] cursor-pointer mb-4 md:mb-0 md:ml-6"
            >
                {item.label}
            </button>
        ));
    };

    return (
        <nav className="nav h-20 w-full text-black fixed z-50 bg-[#ffffff55] backdrop-blur-md sm:h-28">
            <div className="container mx-auto h-full flex items-center justify-between px-4">
                <div className="font-bold cursor-pointer text-[30px] font-[Gistesy] sm:text-[50px]" onClick={home}>
                    Furry Therapy
                </div>
                
                {/* Desktop Menu */}
                <div className="hidden md:flex items-center justify-between space-x-6">
                    {renderMenuItems()}

                    {session?.user ? (
                        <div className="flex items-center space-x-4 ml-auto">
                            <img src={session.user?.image || ''} alt={session.user?.name || ''} className="w-8 h-8 rounded-full" />
                            <span>{session.user?.name}</span>
                            <button className="bg-[#e5ded1] flex justify-center items-center rounded-lg w-24 h-10 hover:bg-[#a17d60]" onClick={logout}>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <button className="bg-[#e5ded1] flex justify-center items-center rounded-lg w-24 h-10 hover:bg-[#a17d60]" onClick={loginWithGoogle}>
                            Login
                        </button>
                    )}
                </div>
                
                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="focus:outline-none">
                        {isOpen ? <XIcon size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>
            
            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-[#ffffffcc] backdrop-blur-md absolute top-20 left-0 w-full shadow-md">
                    <div className="flex flex-col items-center py-4 space-y-4">
                        {renderMenuItems()}

                        {session?.user ? (
                            <div className="flex flex-col items-center space-y-4">
                                <div className="flex items-center space-x-2">
                                    <img src={session.user?.image || ''} alt={session.user?.name || ''} className="w-8 h-8 rounded-full" />
                                    <span className="font-medium">{session.user?.name}</span>
                                </div>
                                <button
                                    className="block py-2 px-4 text-sm mt-2 bg-[#a78c76] hover:bg-[#a17d60] text-white rounded transition-all duration-200"
                                    onClick={logout}
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <button
                                className="block w-full py-2 px-4 text-sm text-center mt-2 bg-[#a78c76] hover:bg-[#a17d60] text-white transition-all duration-200"
                                onClick={loginWithGoogle}
                            >
                                Login
                            </button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
