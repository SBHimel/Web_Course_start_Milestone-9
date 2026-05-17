import BookingCard from "@/components/BookingCard";
import { DeleteAlert } from "@/components/DeleteAlert";
import { EditModal } from "@/components/EditModal";
import { auth } from "@/lib/auth";
import { Button } from "@heroui/react";
import { Edit } from "lucide-react";
import { headers } from "next/headers";



const DestinationDetailsPage = async ({ params }) => {
  const { id } = await params;
  const {token} = await auth.api.getToken({
    headers: await headers()
  })
  console.log(token);

  const res = await fetch(`http://localhost:5000/destination/${id}`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })
  const destination = await res.json()

  console.log(destination);


  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">



      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">

      <div className="flex items-center gap-3 justify-end mt-5 mb-6">
        <EditModal destination={destination}></EditModal>
      <DeleteAlert destination={destination}></DeleteAlert>
      </div>
    

        {/* IMAGE SECTION */}
        <div className="relative">
          <img
            src={destination.imageUrl}
            alt={destination.destinationName}
            className="w-full h-[400px] object-cover"
          />

          {/* overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent"></div>

          {/* title on image */}
          <div className="absolute bottom-6 left-6 text-white">
            <h1 className="text-3xl md:text-4xl font-bold">
              {destination.destinationName}
            </h1>
            <p className="text-sm opacity-90">{destination.country}</p>
          </div>

          {/* price badge */}
          <div className="absolute top-6 right-6 bg-white text-black px-5 py-2 rounded-xl font-bold shadow-lg">
            ৳ {destination.price}
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-6 md:p-10 space-y-6">

          {/* tags */}
          <div className="flex flex-wrap gap-3">
            <span className="bg-black text-white px-4 py-1 rounded-full text-sm">
              {destination.category}
            </span>

            <span className="bg-gray-200 text-gray-700 px-4 py-1 rounded-full text-sm">
              {destination.duration}
            </span>

            <span className="bg-gray-200 text-gray-700 px-4 py-1 rounded-full text-sm">
              Departure: {destination.departureDate}
            </span>
          </div>

          {/* description */}
          <p className="text-gray-600 leading-relaxed text-lg">
            {destination.description}
          </p>

          {/* info grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">

            <div className="p-4 bg-gray-100 rounded-2xl">
              <h3 className="font-semibold">Country</h3>
              <p className="text-gray-600">{destination.country}</p>
            </div>

            <div className="p-4 bg-gray-100 rounded-2xl">
              <h3 className="font-semibold">Duration</h3>
              <p className="text-gray-600">{destination.duration}</p>
            </div>

            <div className="p-4 bg-gray-100 rounded-2xl">
              <h3 className="font-semibold">Category</h3>
              <p className="text-gray-600">{destination.category}</p>
            </div>

          </div>

          {/* BOOK BUTTON */}
          <div className="flex justify-between items-center">
            <div className="pt-6">
            <button className="w-full md:w-auto px-10 py-4 bg-black text-white rounded-2xl font-semibold hover:bg-gray-800 transition duration-300 shadow-lg">
              Book This Destination
            </button>
          </div>
          <div>
            <BookingCard destination={destination}></BookingCard>
          </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DestinationDetailsPage;