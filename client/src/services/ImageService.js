
const { PUBLIC_SERVER_URL } = require("../api");
const host = PUBLIC_SERVER_URL

class LocationService {

  async getRestaurantByImageSearch(reqData) {
    const response = await fetch(`${host}/api/image/imageSearch`, {
      method: 'POST',
      body: reqData,
      // body : JSON.stringify(reqData),
      headers: {
        // 'Content-Type': 'multipart/form-data',
        // is not needed, fetch automatically sets the boundary for multipart data.
      },
    });
    const res = await response.json();
    console.log(res);
    return res;
  }
}

module.exports = new LocationService();
