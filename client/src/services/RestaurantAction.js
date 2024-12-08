const { PUBLIC_SERVER_URL } = require("../api");
const host = PUBLIC_SERVER_URL

class RestaurantAction {


  async getRestaurantList(reqData) {
    // console.log("🚀 ~ RestaurantAction ~ getRestaurantList ~ reqData:", reqData)
    const response = await fetch(`${host}/api/getList`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqData),
    })
    const json = await response.json();
    return json;
  }

  async getRestaurantByID(reqData) {
    // console.log("🚀 ~ RestaurantAction ~ getRestaurantByID ~ reqData:", reqData)
    const res = await fetch(`${host}/api/getByID`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqData),
    })

    const json = await res.json();
    return json;
  }

}

module.exports = new RestaurantAction();