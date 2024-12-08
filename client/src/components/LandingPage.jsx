import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Carousel from './Carousel/Carousel';

const LandingPage = (props) => {
  const { setRestaurantName } = props;
  const location = useLocation(); // Get the current route

  const shouldRenderCarousel = location.pathname === '/listPage';

  return (
    <div>
      <Navbar />
      {shouldRenderCarousel && <Carousel setRestaurantName={setRestaurantName} />} 
      <Outlet />
    </div>
  );
};

export default LandingPage;
