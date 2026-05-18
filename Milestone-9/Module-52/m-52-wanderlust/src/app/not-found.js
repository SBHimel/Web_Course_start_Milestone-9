import { Button } from '@heroui/react';
import Link from 'next/link';
import React from 'react';

const NotFoundPage = () => {
     return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-cyan-50 via-white to-blue-50">

            <div className="text-center max-w-2xl">

                {/* 404 */}
                <h1 className="text-8xl md:text-9xl font-extrabold text-cyan-500">
                    404
                </h1>

                {/* Title */}
                <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-800">
                    Oops! Page Not Found
                </h2>

                {/* Description */}
                <p className="mt-5 text-gray-500 text-lg leading-relaxed">
                    The page you are looking for might have been removed,
                    renamed, or does not exist.
                </p>

                {/* Buttons */}
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">

                    <Link href="/">
                        <Button
                            className="
                                rounded-full
                                px-7
                                py-6
                                bg-cyan-500
                                hover:bg-cyan-600
                                shadow-lg
                                hover:shadow-cyan-500/30
                                transition-all
                            "
                        >
                            Go Back Home
                        </Button>
                    </Link>

                    <Link href="/destinations">
                        <Button
                            variant="outline"
                            className="
                                rounded-full
                                px-7
                                py-6
                                border-2
                                border-cyan-500
                                text-cyan-500
                                hover:bg-cyan-500
                                hover:text-white
                                transition-all
                            "
                        >
                            Explore Destinations
                        </Button>
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;