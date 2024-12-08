import React, { useState, useEffect } from "react";
import RestaurantAction from "../services/RestaurantAction";
import { useParams } from "react-router-dom";
import countryCodes from "./countryCodes";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  MdLocationOn,
  MdFastfood,
  MdMoneyOff,
  MdStar,
  MdThumbUp,
  MdCurrencyExchange,
  MdDeliveryDining,
  MdRestaurant,
  MdLocationCity,
} from "react-icons/md";


const redIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [30, 48],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41],
  className: 'red-icon'
});

const RestaurantInfoPage = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");

  const [error, setError] = useState(null);

  const getRestaurant = async () => {
    try {
      setLoading(true);
      const response = await RestaurantAction.getRestaurantByID({ id });
      if (response.error) {
        setError(response.msg);
      } else {
        setRestaurant(response.data);
      }
      const api = "1aQXB9QhiOLGoPTs20X80wsS2rdUhQ_djrbBeTJbaDM";
      const imageResponse = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: {
            query: response.data.Cuisines,
            per_page: 1,
          },
          headers: {
            Authorization: `Client-ID ${api}`,
          },
        }
      );

      // console.log("🚀 ~ getRestaurant ~ imageResponse:", imageResponse);
      if (imageResponse.data.results.length > 0) {
        setImage(imageResponse.data.results[0].urls.regular);
      }
    } catch (err) {
      setError("Failed to fetch restaurant data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    console.log(restaurant);
    
  },[restaurant])

  useEffect(() => {
    getRestaurant();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!restaurant) {
    return <p>No restaurant data available.</p>;
  }

  const extractCurrencyCode = (currency) => {
    const match = currency.match(/\(([^)]+)\)/);
    return match ? match[1] : currency; // Return the text inside parentheses or the original string if no match
  };



  return (
    <div>
      <div className=" bg-gray-100">
        <div className="bg-white shadow-md rounded-s-sm overflow-hidden">
          <div className="relative">
            <img
              src={
                image ||
                "https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png" ||
                "https://via.placeholder.com/1200x600"
              }
              alt={restaurant.RestaurantName}
              className="w-full h-[60vh] object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent text-white">
              <h1 className="text-4xl font-bold font-serif">
                {restaurant.RestaurantName}
              </h1>
            </div>
          </div>
          <div className="p-6">
            <div>
              <div className="flex sm:flex-col lg:flex-row md:flex-row justify-between">
                <div className="flex flex-wrap ">
                  <div className="flex flex-wrap justify-start min-w-[10vw] max-w-[15vw] lg:min-w-[30%] m-3 p-4 bg-gray-50 rounded-lg shadow-md transform hover:scale-105 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center justify-center mb-3">
                      <MdFastfood className="h-10 w-10 text-red-500" />
                    </div>

                    <div className="flex flex-col justify-center items-start mt-3 mx-2">
                      <h4 className="text-lg font-semibold text-gray-800 mb-1">
                        Cuisines
                      </h4>
                      <p className="text-base text-wrap text-gray-700">
                        {restaurant.Cuisines}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-evenly min-w-[15vw] lg:min-w-[30%] m-3 p-4 bg-gray-50 rounded-lg shadow-md transform hover:scale-105 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center justify-center mb-3">
                      <MdThumbUp className="h-10 w-10 text-red-500" />
                    </div>
                    <div className="flex flex-col justify-center items-start mt-3 mx-2">
                      <h4 className="text-lg font-semibold text-gray-800 mb-1">
                        Votes
                      </h4>
                      <p className="text-base text-gray-700">
                        {restaurant.Votes}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-evenly min-w-[15vw] lg:min-w-[30%] m-3 p-4 bg-gray-50 rounded-lg shadow-md transform hover:scale-105 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center justify-center mb-3">
                      <MdMoneyOff className="h-10 w-10 text-red-500" />
                    </div>
                    <div className="flex flex-col justify-center items-start mt-3 mx-2">
                      <h4 className="text-lg font-semibold text-gray-800 mb-1">
                        Cost For Two
                      </h4>
                      <p className="text-base text-gray-700">
                        {extractCurrencyCode(restaurant.Currency)}{" "}
                        {restaurant.AverageCostForTwo}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-evenly min-w-[15vw] lg:min-w-[30%] m-3 p-4 bg-gray-50 rounded-lg shadow-md transform hover:scale-105 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center justify-center mb-3">
                      <MdCurrencyExchange className="h-10 w-10 text-red-500" />
                    </div>
                    <div className="flex flex-col justify-center items-start mt-3 mx-2">
                      <h4 className="text-lg font-semibold text-gray-800 mb-1">
                        Price Range
                      </h4>
                      <p className="text-base text-gray-700">
                        {restaurant.PriceRange}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-evenly min-w-[15vw] lg:min-w-[30%] m-3 p-4 bg-gray-50 rounded-lg shadow-md transform hover:scale-105 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center justify-center mb-3">
                      <MdStar className="h-10 w-10 text-red-500" />
                    </div>
                    <div className="flex flex-col justify-center items-start mt-3 mx-2">
                      <h4 className="text-lg font-semibold text-gray-800 mb-1">
                        Rating
                      </h4>
                      <p className="text-base text-gray-700">
                        {restaurant.AggregateRating}
                      </p>
                      <p className="text-base text-gray-700">
                        {restaurant.RatingText}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-evenly min-w-[15vw] lg:min-w-[30%] m-3 p-4 bg-gray-50 rounded-lg shadow-md transform hover:scale-105 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center justify-center mb-3">
                      <MdLocationCity className="h-10 w-10 text-red-500" />
                    </div>
                    <div className="flex flex-col justify-center items-start mt-3 mx-2">
                      <h4 className="text-lg font-semibold text-gray-800 mb-1">
                        City
                      </h4>
                      <p className="text-base text-gray-700">
                        {restaurant.City}
                      </p>
                      <p className="text-base text-gray-700">
                        {countryCodes[restaurant.CountryCode]}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-evenly min-w-[15vw] lg:min-w-[30%] m-3 p-4 bg-gray-50 rounded-lg shadow-md transform hover:scale-105 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center justify-center mb-3">
                      <MdRestaurant className="h-10 w-10 text-red-500" />
                    </div>
                    <div className="flex flex-col justify-center items-start mt-3 mx-2">
                      <h4 className="text-lg font-semibold text-gray-800 mb-1">
                        Booking
                      </h4>
                      <p className="text-base text-gray-700">
                        {restaurant.HasTableBooking
                          ? "Available"
                          : "Not Available"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-evenly min-w-[15vw] lg:min-w-[30%] m-3 p-4 bg-gray-50 rounded-lg shadow-md transform hover:scale-105 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center justify-center mb-3">
                      <MdDeliveryDining className="h-10 w-10 text-red-500" />
                    </div>
                    <div className="flex flex-col justify-center items-start mt-3 mx-2">
                      <h4 className="text-lg font-semibold text-gray-800 mb-1">
                        Home Delivery
                      </h4>
                      <p className="text-base text-gray-700">
                        {restaurant.IsDeliveringNow
                          ? "Available"
                          : "Not Available"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="min-w-[50%] mx-5 p-6 shadow-lg">
                  <div className="flex flex1 flex-wrap  min-w-[20vw] lg:min-w-[40%] rounded-sm ">
                    <div className="flex flex-row justify-items-center items-center mb-5 mx-2">
                      <MdLocationOn className="h-[5vh] w-[5vw] text-red-500 align-center" />
                      <p className="text-xl text-wrap text-gray-900 text-center">
                        {restaurant.Address}
                      </p>
                    </div>
                  </div>
                  <div className=" mb-4 rounded overflow-hidden shadow-sm">
                    {/* <Map
                latitude={restaurant.latitude}
                longitude={restaurant.longitude}
                address={restaurant.address}
              /> */}

                    {restaurant != null && (
                      <MapContainer
                        center={[restaurant.Latitude, restaurant.Longitude]}
                        zoom={13}
                        style={{ height: "400px", width: "100%" }}
                      >
                        <TileLayer
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker
                          position={[restaurant.Latitude, restaurant.Longitude]}
                          icon = {redIcon}
                        >
                          <Popup>
                            {restaurant.RestaurantName}
                          </Popup>
                        </Marker>
                      </MapContainer>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantInfoPage;
