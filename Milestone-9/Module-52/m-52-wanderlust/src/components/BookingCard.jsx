'use client'

import { authClient } from '@/lib/auth-client';
import { Button, Card, DateField, Label } from '@heroui/react';
import React, { useState } from 'react';

const BookingCard = ({ destination }) => {

    const {
        data: session,
    } = authClient.useSession()

    const user = session?.user
    // console.log(user);

    const [departureDate, setDepartureDate] = useState(null);
    // console.log(new Date (departureDate));
    // console.log(destination);s

    const { country, imageUrl, price, _id, destinationName
    } = destination;

    const handleBooking = async () => {
        const bookingData = {
            userId: user.id,
            userImage: user.image,
            userName: user.name,
            destinationId: _id,
            destinationName,
            price,
            imageUrl,
            country,
            departureDate: new Date(departureDate),

        }
        console.log(bookingData);


        const res = await fetch('http://localhost:5000/booking', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(bookingData)
    
        });
        const data = await res.json();
      
        console.log(data);
    }




    return (
        <Card
            className="
    relative overflow-hidden
    mt-6 rounded-3xl
    border border-white/20
    bg-white/80 backdrop-blur-xl
    shadow-2xl
    p-6 space-y-5
    hover:-translate-y-1
    transition-all duration-300
  "
        >

            {/* TOP GLOW */}
            <div className="absolute -top-16 -right-16 w-40 h-40 bg-cyan-400/20 blur-3xl rounded-full"></div>
            <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-purple-500/20 blur-3xl rounded-full"></div>

            {/* PRICE SECTION */}
            <div className="relative z-10">
                <p className="text-sm text-gray-500 font-medium">
                    Starting from
                </p>

                <div className="flex items-end gap-1 mt-1">
                    <h2 className="text-5xl font-black bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                        ${price}
                    </h2>

                    <span className="text-gray-500 mb-1">
                        / person
                    </span>
                </div>
            </div>

            {/* DATE FIELD */}
            <div className="relative z-10">
                <DateField onChange={setDepartureDate} className="w-full" name="date">

                    <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                        departureDate Date
                    </Label>

                    <DateField.Group
                        className="
          flex items-center
          rounded-2xl
          border border-gray-200
          bg-white
          px-4 py-3
          shadow-sm
          focus-within:ring-2
          focus-within:ring-cyan-400
          transition
        "
                    >
                        <DateField.Input className="flex gap-1 text-gray-700">
                            {(segment) => (
                                <DateField.Segment segment={segment} />
                            )}
                        </DateField.Input>
                    </DateField.Group>

                </DateField>
            </div>

            {/* BUTTON */}
            <Button onClick={handleBooking}
                className="
      w-full rounded-2xl
      py-6 text-lg font-bold
      bg-gradient-to-r from-cyan-500 to-blue-600
      text-white
      shadow-lg shadow-cyan-500/30
      hover:scale-[1.02]
      hover:shadow-cyan-500/50
      active:scale-95
      transition-all duration-300
    "
            >
                ✈️ Book Now
            </Button>

        </Card>
    );
};

export default BookingCard;