import React, { useState } from "react";
import ImageService from "../services/ImageService";
import { useNavigate } from "react-router-dom";
import hotelImages from "../hotelImages";
const ImageSearch = () => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [cuisine, setCuisine] = useState('')
  const navigate = useNavigate();
  const handleChange = (evt) => {
    const file = evt.target.files[0];
    setImage(file);
    setError(null);
    setSuccess(false);
  };

  const handleUpload = async (evt) => {
    evt.preventDefault();

    if (!image) {
      setError("No image file selected");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    setUploading(true);
    setError(null);

    try {
      const response = await ImageService.getRestaurantByImageSearch(formData);
      if(!response.error){
        setRestaurants(response.data);
        setCuisine(response.cuisine);
        setSuccess(true);
      }
    } catch (error) {
      setError("Error uploading image");
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleNavigation = (id) => {
    navigate(`/restaurantInfo/${id}`);
  };


  return (
    <div className="bg-gray-100 min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
            Search Restaurant by Food Image
          </h2>

          <form onSubmit={handleUpload} className="space-y-6">
            
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 relative overflow-hidden"
              >
                {image ? (
                  <div className="absolute inset-0 w-full h-full">
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Uploaded preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"></div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-10 h-10 mb-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                )}
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleChange}
                  accept="image/*"
                />
              </label>
            </div>
            {
              !success ? (
                <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Upload and Search"}
              </button>
              ) : (
                <div className="w-full mx-">
                  <span className="font-semibold text-lg">Cuisine : {cuisine} </span>
                </div>
                
              )
            }
           
          </form>

          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

          {success && (
            <div className="mt-4 bg-green-100 p-4 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 mr-2 text-green-600"
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
              <span className="font-semibold text-green-600">
                Search Successful
              </span>
            </div>
          )}

        </div>
      </div>

      <div className="bg-gray-100 px-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800  ">
          Related Restaurants :
        </h2>
        {restaurants != null && restaurants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {restaurants.map((restaurant, index) => (
              <div
                className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
                onClick={() => {
                  handleNavigation(restaurant.RestaurantID);
                }}
              >
                <div className="w-full h-48 md:h-32">
                  <img
                    src={
                      hotelImages[index % 15] ||
                      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    }
                    alt={restaurant.RestaurantName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="text-blue-gray-800 text-xl mb-2">
                    {restaurant.RestaurantName}
                  </h4>
                  <hr />
                  <p>
                    Cuisines : {restaurant.Cuisines}
                  </p>
                  <div className="flex mt-2 items-center">
                    <p className="bg-red-100 text-red-500 h-8 w-8 flex items-center justify-center text-sm font-semibold rounded-full">
                      {restaurant.AggregateRating} 
                    </p>
                    <p className="ms-3 text-gray-900 font-medium">
                      {restaurant.RatingText}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 italic">
            No restaurants found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ImageSearch;
