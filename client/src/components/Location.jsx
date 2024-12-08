import React, { useEffect, useState } from "react";
import LocationService from "../services/LocationService";
import { useNavigate } from "react-router-dom";
const hotelImages = require("../hotelImages");

const LocationSearch = () => {
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [radius, setRadius] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();
  const getRestaurantsByQuery = async () => {
    const data = {
      longitude: longitude,
      latitude: latitude,
      radiusInMeters: radius,
    };
    const res = await LocationService.getRestaurantsByLocation(data);
    if (!res.error) {
      setRestaurants(res.data);
    }
  };

  const handleClickSearch = () => {
    getRestaurantsByQuery();
  };

  const handleNavigation = (id) => {
    navigate(`/restaurantInfo/${id}`);
  };

  const getDeviceLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLongitude(position.coords.longitude);
          setLatitude(position.coords.latitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    console.log(restaurants[0]);
  }, [restaurants]);

  return (
    <div className="max-w-full ">
      <div className="bg-gray-100 py-20  px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div className="md:flex">
            <div className="p-8 w-full">
              <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
                Nearby Restaurant Search
              </h1>

              <div className="space-y-6">
                <button
                  onClick={getDeviceLocation}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                  Get My Location
                </button>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center justify-center">
                  {longitude && latitude ? (
                    <div className="flex items-center text-green-600">
                      <svg
                        className="w-6 h-6 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                      <span className="font-semibold">Location Fetched</span>
                    </div>
                  ) : (
                    <p className="text-gray-700">Location not set</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="radius"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Search Radius (Kilometers):
                  </label>
                  <input
                    type="number"
                    id="radius"
                    value={radius}
                    onChange={(e) => setRadius(Number(e.target.value))}
                    className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                <button
                  onClick={handleClickSearch}
                  className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                >
                  Search Restaurants
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 px-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800  ">
          Restaurants Found:
        </h2>
        {restaurants != null && restaurants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 max-w-7xl m-auto">
            {restaurants.map((restaurant, index) => (
              <div
                className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:cursor-pointer "
                onClick={() => {
                  handleNavigation(restaurant.restaurantId);
                }}
              >
                <div className="w-full h-48 md:h-32">
                  <img
                    src={
                      hotelImages[index % 15] ||
                      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    }
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="text-blue-gray-800 text-xl mb-2">
                    {restaurant.name}
                  </h4>
                  <hr />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 italic">
            No restaurants found. Try increasing your search radius or location.
          </p>
        )}
      </div>
    </div>
  );
};

export default LocationSearch;
