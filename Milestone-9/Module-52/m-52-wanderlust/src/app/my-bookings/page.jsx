import { BookingCancelAlert } from "@/components/BookingCancelAlert";
import { auth } from "@/lib/auth";
import { TrashBin } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import { headers } from "next/headers";
import Image from "next/image";
import { use } from "react";


const MyBookingPage = async () => {
    // better auth er basic usege theke eta ana hoyeche nije bananu na ke login korlo eta ber kora hoyeche
    const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    })
    // console.log(session);

    const { token } = await auth.api.getToken({
        headers: await headers()
    })

    const user = session?.user

    // console.log(user);
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${user?.id}`
    ,{
        headers: {
      authorization: `Bearer ${token}`
    }
    });

    const bookings = await res.json()

    console.log(bookings);


    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-4xl font-black tracking-tight">
                        My Bookings
                    </h1>

                    <p className="text-muted-foreground mt-2">
                        Manage all your booked destinations in one place.
                    </p>
                </div>

                <div className="border px-5 py-3 rounded-2xl shadow-sm">
                    <p className="text-sm text-muted-foreground">
                        Total Bookings
                    </p>

                    <h2 className="text-3xl font-bold text-cyan-500">
                        {bookings.length}
                    </h2>
                </div>
            </div>

            <div className="space-y-6">
                {
                    bookings.length === 0 ? (

                        <div className="
                border
                rounded-3xl
                py-20
                px-10
                text-center
                bg-muted/20
                flex
                flex-col
                items-center
                justify-center
            ">

                            <h2 className="text-4xl font-black mb-3">
                                No Bookings Yet ✈️
                            </h2>

                            <p className="text-muted-foreground max-w-md">
                                You haven&apos;t booked any destinations yet.
                                Start exploring and book your dream trip today.
                            </p>

                        </div>

                    ) : (
                        bookings.map((booking) => (

                            <div
                                key={booking._id}
                                className="
                        group
                        flex flex-col lg:flex-row
                        gap-6
                        border
                        rounded-3xl
                        p-5
                        shadow-sm
                        hover:shadow-2xl
                        transition-all
                        duration-300
                        bg-white
                        overflow-hidden
                    "
                            >

                                <div className="overflow-hidden rounded-2xl">
                                    <Image
                                        src={booking.imageUrl}
                                        alt={booking.destinationName}
                                        width={320}
                                        height={220}
                                        className="
                                h-[220px]
                                w-full
                                lg:w-[320px]
                                object-cover
                                rounded-2xl
                                group-hover:scale-105
                                transition-transform
                                duration-500
                            "
                                    />
                                </div>

                                <div className="flex flex-col justify-between flex-1">

                                    <div className="space-y-3">

                                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">

                                            <div>
                                                <h1 className="text-3xl font-black">
                                                    {booking.destinationName}
                                                </h1>

                                                <p className="text-muted-foreground mt-1">
                                                    {booking.country}
                                                </p>
                                            </div>

                                            <h2 className="text-4xl font-black text-cyan-500">
                                                ${booking.price}
                                            </h2>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3">

                                            <div className="border rounded-2xl p-4 bg-muted/30">
                                                <p className="text-sm text-muted-foreground mb-1">
                                                    Departure Date
                                                </p>

                                                <p className="font-semibold">
                                                    {
                                                        new Date(
                                                            booking.departureDate
                                                        ).toLocaleDateString(
                                                            "en-US",
                                                            {
                                                                year: "numeric",
                                                                month: "long",
                                                                day: "numeric"
                                                            }
                                                        )
                                                    }
                                                </p>
                                            </div>

                                            <div className="border rounded-2xl p-4 bg-muted/30">
                                                <p className="text-sm text-muted-foreground mb-1">
                                                    Booking ID
                                                </p>

                                                <p className="font-semibold break-all">
                                                    {booking._id}
                                                </p>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="pt-6 flex justify-end">

                                        <BookingCancelAlert bookingId={booking._id}></BookingCancelAlert>

                                    </div>

                                </div>

                            </div>

                        ))
                    )
                }
            </div>
        </div>
    );
};

export default MyBookingPage;