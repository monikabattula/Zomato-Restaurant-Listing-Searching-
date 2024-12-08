import React from 'react'
import countryCodes from './countryCodes'

const Filters = ({filterCountryCode,filterCuisine,filterAvgMinCost,filterAvgMaxCost,handleCountryChange, handleCuisineChange, handleAvgMinCostChange, handleAvgMaxCostChange}) => {
  return (
    <div className="flex flex-col sm:flex-row md:flex-col mt-[8vh] align-center rounded-xl h-[50%] shadow-xl px-5 ">
      <h2 className='text-center text-2xl font-bold my-5'>Filters</h2>
        <div className="mb-4 ">
          <label htmlFor="country" className="block text-gray-700 text-center">
            <strong>
              Country
            </strong>
          </label>
          <select
            id="country"
            value={filterCountryCode}
            onChange={handleCountryChange}
            className="p-2 border rounded-lg w-full  text-center"
          >
            <option value="">All Countries</option>
            {Object.entries(countryCodes).map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4 mt-5">
          <label htmlFor="cuisine" className="block text-center text-gray-700">
            <strong>
             Cuisine
            </strong>
          </label>
          <input
            id="cuisine"
            type="text"
            // value={filterCuisine}
            onChange={handleCuisineChange}
            placeholder="Enter cuisine type"
            className="p-2 border rounded-lg text-center w-full "
          />
        </div>

        <div className="mb-4 mt-5">
          <label htmlFor="minCost" className="block text-center text-gray-700">
            <strong>
              Average Spend for Two People
            </strong>
          </label>
          <input
            id="minCost"
            type="text"
            // value={filterAvgMinCost}
            onChange={handleAvgMinCostChange}
            placeholder="Minimum Limit"
            className="p-2 border rounded-lg text-center w-full mb-4"
          />
          <input
            id="maxCost"
            type="text"
            // value={filterAvgMaxCost}
            onChange={handleAvgMaxCostChange}
            placeholder="Maximum Limit"
            className="p-2 border text-center rounded-lg w-full "
          />
        </div>

      </div>
  )
}

export default Filters