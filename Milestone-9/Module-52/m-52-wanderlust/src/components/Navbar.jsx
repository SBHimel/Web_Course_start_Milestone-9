'use client'

import { authClient } from '@/lib/auth-client';
import { Avatar, Button } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    const {
        data: session,
    } = authClient.useSession()

    const user = session?.user
    console.log(user);

    // logout er jonno
    const handleSignOut = async () => {
        await authClient.signOut();
        // window.location.href = "/login";
    };


    const navLinks = (
        <>
            {[
                { name: "Home", href: "/" },
                { name: "Destinations", href: "/destinations" },
                { name: "My Booking", href: "/my-booking" },
                { name: "Add Destination", href: "/add-destination" },
            ].map((item, i) => (
                <li key={i}>
                    <Link
                        href={item.href}
                        className="relative group text-gray-700 font-medium transition"
                    >
                        {item.name}

                        {/* underline animation */}
                        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                </li>
            ))}
        </>
    );

    return (
        <header className="sticky top-0 z-50">

            {/* glass effect */}
            <nav className="backdrop-blur-xl bg-white/70 border-b border-white/30 shadow-lg">

                <div className='max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between'>

                    {/* LEFT */}
                    <ul className='hidden lg:flex items-center gap-8'>
                        {navLinks}
                    </ul>

                    {/* LOGO */}
                    <Link href="/" className="flex items-center gap-3 group">

                        <div className="rounded-2xl overflow-hidden shadow-md group-hover:scale-105 transition duration-300">
                            <Image
                                src={'/assets/Wanderlast.png'}
                                height={55}
                                width={55}
                                alt='logo'
                            />
                        </div>

                        <div>
                            <h1 className="text-2xl font-black bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                                Wanderlust
                            </h1>
                            <p className="text-[10px] tracking-[4px] text-gray-500 uppercase">
                                Explore The World
                            </p>
                        </div>

                    </Link>

                    {/* RIGHT */}
                    <div className='flex items-center gap-3'>

                        <Link
                            href={'/profile'}
                            className='hidden md:flex px-5 py-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-100 transition'
                        >
                            Profile
                        </Link>

                        {user ? <>
                            <li><Avatar>
                                <Avatar.Image referrerPolicy='no-referrer' alt="John Doe" src={user?.image} />
                                <Avatar.Fallback>j</Avatar.Fallback>
                            </Avatar></li>
                            <li>
                                <Button onClick={handleSignOut}
                                    className="rounded-none px-5 py-2 font-medium text-red-600 
  bg-red-50 border border-red-200 
  hover:bg-red-100 hover:border-red-300 
  transition"
                                >
                                    Logout
                                </Button>
                            </li>

                        </> : <>
                            <Link
                                href={'/login'}
                                className='px-5 py-2 rounded-xl hover:bg-gray-100 transition text-gray-700'
                            >
                                Login
                            </Link>

                            <Link
                                href={'/signup'}
                                className='px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold shadow-lg hover:scale-105 transition'
                            >
                                Sign Up
                            </Link>
                        </>}
                    </div>

                </div>
            </nav>

            {/* MOBILE */}
            <div className='lg:hidden bg-white/80 backdrop-blur-xl border-b border-gray-100'>
                <ul className='flex flex-wrap justify-center gap-5 py-3 text-sm'>
                    {navLinks}
                </ul>
            </div>
        </header>
    );
};

export default Navbar;