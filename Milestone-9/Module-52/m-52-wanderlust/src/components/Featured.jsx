import { Button } from '@heroui/react';
import React from 'react';
import DestinationCard from './DestinationCard';
import Link from 'next/link';

const Featured = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/features`)
    const destionations = await res.json()
    console.log(destionations);
    return (
    <section className='max-w-7xl mx-auto px-4 py-16'>
        
        {/* Top Section */}
        <div className='flex flex-col md:flex-row md:items-end md:justify-between gap-6'>
            
            <div className='max-w-2xl'>
                <p className='text-cyan-500 font-semibold tracking-[0.2em] uppercase mb-3'>
                    Explore The World
                </p>

                <h1 className='text-4xl md:text-5xl font-extrabold leading-tight'>
                    Featured
                    <span className='text-cyan-500'> Destinations</span>
                </h1>

                <p className='text-muted-foreground mt-5 text-lg leading-relaxed'>
                    Discover handpicked destinations around the world —
                    from peaceful beaches to vibrant cities, crafted to
                    inspire your next unforgettable adventure.
                </p>
            </div>

            <Link href="/destinations">
                <Button
                    variant="outline"
                    className='
                        rounded-full
                        px-7
                        py-6
                        border-2
                        border-cyan-500
                        text-cyan-500
                        hover:bg-cyan-500
                        hover:text-white
                        transition-all
                        duration-300
                        shadow-sm
                        hover:shadow-cyan-500/30
                    '
                >
                    View All Destinations
                </Button>
            </Link>
        </div>

        {/* Decorative Line */}
        <div className='mt-8 w-32 h-1 bg-cyan-500 rounded-full'></div>

        {/* Destination Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-14'>
            {
                destionations.map(destionation => (
                    <div
                        key={destionation._id}
                        className='
                            group
                            hover:-translate-y-2
                            transition-all
                            duration-300
                        '
                    >
                        <DestinationCard
                            destination={destionation}
                        />
                    </div>
                ))
            }
        </div>
    </section>
);
};

export default Featured;