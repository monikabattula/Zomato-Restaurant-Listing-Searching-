import React, { useState, useEffect } from "react";
import RestaurantAction from "../services/RestaurantAction";
import { Link, useNavigate } from "react-router-dom";
import countryCodes from "./countryCodes";
import Filters from "./Filters";

import hotelImages from "../hotelImages";

const ListPage = ({ restName }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filterCountryCode, setFilterCountryCode] = useState(""); 
  const [filterCuisine, setFilterCuisine] = useState("");
  const [debouncedCuisine, setDebouncedCuisine] = useState(""); 
  const [filterAvgMinCost, setFilterAvgMinCost] = useState(0);
  const [debouncedAvgMinCost, setDebouncedAvgMinCost] = useState(0);
  const [filterAvgMaxCost, setFilterAvgMaxCost] = useState(
    Number.MAX_SAFE_INTEGER
  );
  const [debouncedAvgMaxCost, setDebouncedAvgMaxCost] = useState(
    Number.MAX_SAFE_INTEGER
  );
  const [images, setImages] = useState(hotelImages);
  // const [index, setIndex] = useState(0);
  const navigate = useNavigate();


  const getRestaurantList = async () => {
    setLoading(true);
    const page = currentPage;
    const restaurantName = restName;
    const countryCode = filterCountryCode || "";
    const cuisine = debouncedCuisine;
    const avgMinCost = debouncedAvgMinCost;
    const avgMaxCost = debouncedAvgMaxCost;
    
    const res = await RestaurantAction.getRestaurantList({
      page,
      restaurantName,
      countryCode,
      cuisine,
      avgMinCost,
      avgMaxCost,
    });
    if (!res.error) {
      setRestaurants(res.data);
      setTotalPages(res.pagination.totalPages);
      setCurrentPage(res.pagination.currentPage);
    }
    setLoading(false);
  };


  useEffect(() => {
    getRestaurantList();
  }, [
    currentPage,
    filterCountryCode,
    debouncedCuisine,
    debouncedAvgMinCost,
    debouncedAvgMaxCost,
    restName,
  ]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedCuisine(filterCuisine);
      setDebouncedAvgMinCost(filterAvgMinCost);
      setDebouncedAvgMaxCost(filterAvgMaxCost);
    }, 1000);
    return () => {
      clearTimeout(handler);
    };
  }, [filterCuisine, filterAvgMinCost, filterAvgMaxCost]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleNavigate = (RestaurantID) => {
    navigate(`/restaurantInfo/${RestaurantID}`);
  };

  const handleCountryChange = (e) => {
    setFilterCountryCode(e.target.value);
    setCurrentPage(1); // Reset to first page when country changes
  };

  const handleCuisineChange = (e) => {
    setFilterCuisine(e.target.value);
    setCurrentPage(1);
  };
  const handleAvgMinCostChange = (e) => {
    setFilterAvgMinCost(e.target.value);
    setCurrentPage(1);
  };
  const handleAvgMaxCostChange = (e) => {
    setFilterAvgMaxCost(e.target.value);
    setCurrentPage(1);
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 2 && i <= currentPage + 2)
      ) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`p-2 sm:px-4 sm:py-2 mx-1 text-gray-600 border rounded-lg focus:outline-none ${
              i === currentPage
                ? "ring ring-primary bg-primary/20"
                : "hover:bg-gray-100"
            }`}
          >
            {i}
          </button>
        );
      } else if (i === currentPage - 3 || i === currentPage + 3) {
        pages.push(
          <span
            key={i}
            className="p-2 text-gray-600 rounded-lg focus:outline-none"
          >
            ...
            
          </span>
        );
      }
    }

    return pages;
  };



  return (
    <>
    <div className="flex flex-row p-5 m-auto justify-around lg:flex-row md:flex-col sm:flex-col">
      <Filters
        filterCountryCode={filterCountryCode}
        handleCountryChange={handleCountryChange}
        filterCuisine={filterCuisine}
        handleCuisineChange={handleCuisineChange}
        filterAvgMinCost={filterAvgMinCost}
        handleAvgMinCostChange={handleAvgMinCostChange}
        filterAvgMaxCost={filterAvgMaxCost}
        handleAvgMaxCostChange={handleAvgMaxCostChange}
      />
      <div className="container mx-10 p-4">
        <h1 className="text-3xl font-bold text-center mb-6">Restaurant List</h1>

        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant, key) => (
             
              <div
                key={restaurant._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              >

                <img
                  src={images[key]}
                  alt={restaurant.RestaurantName}
                  className="w-full h-48 object-cover"
                  
                />
                <div className="p-4">
                  <h2 className="text-2xl font-semibold text-blue-900 mb-2">
                    {restaurant.RestaurantName}
                  </h2>
                  <p className="text-gray-600 mb-1">
                    {restaurant.City}, {countryCodes[restaurant.CountryCode]}
                  </p>
                  <p className="text-gray-600">
                    Cuisines: {restaurant.Cuisines}
                  </p>
                </div>
                <div className="p-4 border-t border-gray-200 flex justify-between items-center">
                  <div className="flex items-center">
                    <p className="bg-blue-100 text-blue-800 h-8 w-8 flex items-center justify-center text-sm font-semibold rounded-full">
                      {restaurant.AggregateRating}
                    </p>
                    <p className="ms-3 text-gray-900 font-medium">
                      {restaurant.RatingText}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      handleNavigate(restaurant.RestaurantID);
                    }}
                    className="px-4 py-2 rounded bg-red-500 text-white font-bold hover:bg-red-600 transition-colors"
                  >
                    View Restaurant
                  </button>
                </div>
              </div>
              
            ))}
          </div>
        )}

        <div className="flex justify-center mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-2 mx-1 rounded ${
              currentPage === 1
                ? "bg-gray-300"
                : "bg-gray-500 text-white hover:bg-red-600"
            }`}
          >
            Previous
          </button>
          {renderPagination()}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-2 mx-2 rounded ${
              currentPage === totalPages
                ? "bg-gray-300"
                : "bg-gray-500 text-white hover:bg-red-600"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
            

</>
  );
};

export default ListPage;
