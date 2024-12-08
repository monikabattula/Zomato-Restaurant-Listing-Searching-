import React, { useEffect, useState } from 'react';
import { TECarousel, TECarouselItem } from 'tw-elements-react';



const Carousel = ({setRestaurantName}) => {
  const [name, setName] = useState("");
  const [debouncedName, setDebouncedName] = useState("");

  const handleNameChange = (e) =>{
    setName(e.target.value);

  }

  useEffect(() => {
    setRestaurantName(debouncedName);
  },[debouncedName])

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedName(name)
    },1000);
    return () => {
      clearTimeout(handler)
    };
  },[name])



  return (
    <div className="relative w-full h-[60vh] overflow-hidden">
      <TECarousel
        ride="carousel"
        className="absolute top-0 left-0 w-full h-full z-0" // Ensure it's behind the navbar
      >
        <TECarouselItem
          itemID={1}
          className="relative float-left w-full h-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
        >
          <div className="relative w-full h-full">
            <img
              src="https://images.unsplash.com/photo-1554998171-89445e31c52b?q=80&w=2139&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="block w-full h-full object-cover"
              alt="First slide"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent opacity-70" />
            <div className="absolute inset-0 flex flex-col justify-center items-center">
              <div className="absolute inset-x-[35%] top-1/2 transform -translate-y-1/2 my-9">
                <input
                  type="text"
                  placeholder="Search Restaurants"
                  className="w-full px-5 py-4 text-black rounded-full shadow-md focus:outline-none"
                  onChange={handleNameChange}
                />
                
              </div>
            </div>
          </div>
        </TECarouselItem>
      </TECarousel>
    </div>
  );
};

export default Carousel;
