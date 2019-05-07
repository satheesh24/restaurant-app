import axios from "axios";

const apiConfig = axios.create({
  baseURL: "http://0.0.0.0:3000/"
});

const UserApi = {
  register(data) {
    return apiConfig.post("api/Users", data);
  },
  signin(data) {
    return apiConfig.post("api/Users/login", data);
  },
  signout(data) {
    let logOutUrl = "api/Users/logout?access_token=";
    logOutUrl += data;
    return apiConfig.post(logOutUrl, {});
  },
  initialLoad(data, id) {
    let initialLoadUrl = "api/Users/" + id + "?access_token=";
    initialLoadUrl += data;
    return apiConfig.get(initialLoadUrl, id);
  },
  checkOut(data, accessToken) {
    let checkOutUrl = "api/orders?access_token=";
    checkOutUrl += accessToken;
    return apiConfig.post(checkOutUrl, data);
  },
  viewOrders(accessToken, id) {
    let viewOrdersUrl =
      "http://0.0.0.0:3000/api/users/" +
      id +
      "/orders?access_token=" +
      accessToken;
    return apiConfig.get(viewOrdersUrl, id);
  },
  cancelOrder(data, id, accessToken) {
    let cancelOrderUrl =
      "http://0.0.0.0:3000/api/orders/update?where=%7B%20%22id%22%3A%20" +
      id +
      "%20%7D&access_token=" +
      accessToken;

    return apiConfig.post(cancelOrderUrl, data);
  }
};

export default UserApi;
