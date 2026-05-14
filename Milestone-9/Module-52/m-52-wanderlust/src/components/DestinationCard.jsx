import React from 'react';
import { MapPin, CalendarDays, Clock3, Tag, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const DestinationCard = ({ destination }) => {

    const {
        _id,
        destinationName,
        country,
        category,
        price,
        departureDate,
        description,
        duration,
        imageUrl
    } = destination;

    return (
        <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">

            {/* Image */}
            <div className="relative overflow-hidden">
                <img
                    src={imageUrl}
                    alt={destinationName}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                    <span className="bg-black/70 text-white text-xs px-4 py-2 rounded-full backdrop-blur-md">
                        {category}
                    </span>
                </div>

                {/* Price */}
                <div className="absolute bottom-4 right-4">
                    <span className="bg-white text-black font-bold px-4 py-2 rounded-xl shadow-lg">
                        ৳ {price}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">

                {/* Title */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 line-clamp-1">
                        {destinationName}
                    </h2>

                    <div className="flex items-center gap-2 text-gray-500 mt-2">
                        <MapPin size={18} />
                        <span>{country}</span>
                    </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed line-clamp-3">
                    {description}
                </p>

                {/* Info */}
                <div className="grid grid-cols-2 gap-4 pt-2">

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock3 size={16} />
                        <span>{duration}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <CalendarDays size={16} />
                        <span>{departureDate}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600 col-span-2">
                        <Tag size={16} />
                        <span>{category} Tour</span>
                    </div>
                </div>

                {/* Button */}
                <Link href={`/destinations/${_id}`}>
                    <button className="w-full mt-4 flex items-center justify-center gap-2 bg-black text-white py-3.5 rounded-2xl font-semibold hover:bg-gray-800 transition duration-300">
                        <ExternalLink size={18} />
                        Explore Now
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default DestinationCard;