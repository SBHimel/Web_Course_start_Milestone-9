"use client";

import { Button } from "@heroui/react";
import Link from "next/link";


export default function Error({ error, reset }) {
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">

            <div className="text-center max-w-xl">

                <h1 className="text-6xl font-extrabold text-red-500">
                    Something Went Wrong
                </h1>

                <p className="mt-5 text-muted-foreground text-lg">
                    We could not load this destination right now.
                </p>

                <p className="mt-2 text-sm text-gray-400">
                    {error?.message}
                </p>

                <div className="flex items-center justify-center gap-4 mt-8">

                    <Button
                        onClick={() => reset()}
                        className="bg-cyan-500 hover:bg-cyan-600"
                    >
                        Try Again
                    </Button>

                    <Link href="/destinations">
                        <Button variant="outline">
                            Back To Destinations
                        </Button>
                    </Link>

                </div>
            </div>
        </div>
    );
}