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
    let initialLoadUrl = "api/Users/1?access_token=";
    initialLoadUrl += data;
    return apiConfig.get(initialLoadUrl, id);
  },
  checkOut(data, accessToken) {
    let logOutUrl = "api/orders?access_token=";
    logOutUrl += accessToken;
    return apiConfig.post(logOutUrl, data);
  }
};

export default UserApi;
