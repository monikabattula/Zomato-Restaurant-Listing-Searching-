import React, { useState } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';

import Error from './components/ErrorComponent/Error';
import ListPage from './components/ListPage';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import RestaurantInfo from './components/RestaurantInfo';
import LocationSearch from './components/Location';
import ImageSearch from './components/ImageSearch';
// import Carousel from './components/Carousel/Carousel';

function App() {
  const [name, setName] = useState("");
  const setRestaurantName = (name) => {
    setName(name);
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<LandingPage setRestaurantName={setRestaurantName}/>}>
            <Route path='/' element={<Navigate to="/listPage"/>}/>
            <Route path='/listPage' element={<ListPage restName={name} />}/>
            <Route path='/navbar' element={<Navbar/>}/>
            <Route path='/restaurantInfo/:id' element = {<RestaurantInfo />}/>
            <Route path='/locationSearch' element={<LocationSearch/>}/>
            <Route path='/imageSearch' element={<ImageSearch/>}/>
            </Route>
            <Route path='*' element={<Error/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
