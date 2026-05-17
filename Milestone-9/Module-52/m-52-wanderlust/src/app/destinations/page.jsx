import DestinationCard from "@/components/DestinationCard";


const DestinationPage = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destination`)
    const destinations = await res.json()

    console.log(destinations);

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">

            {/* Heading */}
            <div className="text-center mb-14">

                <p className="text-sm uppercase tracking-[6px] text-gray-500 mb-3">
                    Explore The World
                </p>

                <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                    Discover Amazing
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
                        Travel Destinations
                    </span>
                </h1>

                <p className="max-w-2xl mx-auto mt-5 text-gray-600 text-lg leading-relaxed">
                    Find your dream destination and experience unforgettable journeys
                    around the world with premium travel experiences.
                </p>

                {/* Total Count */}
                <div className="mt-8 inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full shadow-xl">
                    <span className="text-lg font-bold">
                        {destinations.length}
                    </span>

                    <span className="text-sm opacity-80">
                        Destinations Available
                    </span>
                </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                    destinations.map(destination => (
                        <DestinationCard
                            key={destination._id}
                            destination={destination}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default DestinationPage;