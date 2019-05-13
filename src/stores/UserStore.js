import { EventEmitter } from "events";
import AppDispatcher from "../dispatcher/AppDispatcher";
import UserApi from "../api/UserApi";
import _ from "underscore";

let id = 0,
  accessToken = "",
  userName = "",
  status = "",
  error = "",
  orders = "",
  cancelId = "";

const UserStore = _.extend({}, EventEmitter.prototype, {
  emitInitialChange() {
    this.emit("change");
  },

  addInitialChangeListener(callback) {
    this.on("change", callback);
  },

  removeInitialChangeListener(callback) {
    this.removeListener("change", callback);
  },

  emitChange() {
    this.emit("change");
  },

  addChangeListener(callback) {
    this.on("change", callback);
  },

  removeChangeListener(callback) {
    this.removeListener("change", callback);
  },

  emitTenantUserChange() {
    this.emit("tenantUserChange");
  },

  addTenantUserChangeListener(callback) {
    this.on("tenantUserChange", callback);
  },

  removeTenantUserChangeListener(callback) {
    this.removeListener("tenantUserChange", callback);
  },

  emitCheckoutChange() {
    this.emit("change");
  },

  addCheckoutChangeListener(callback) {
    this.on("change", callback);
  },

  removeCheckoutChangeListener(callback) {
    this.removeListener("change", callback);
  },

  emitViewOrderChange() {
    this.emit("viewOrderChange");
  },

  addViewOrderChangeListener(callback) {
    this.on("viewOrderChange", callback);
  },

  removeViewOrderChangeListener(callback) {
    this.removeListener("viewOrderChange", callback);
  },

  emitCancelOrderChange() {
    this.emit("cancelOrderChange");
  },

  addCancelOrderChangeListener(callback) {
    this.on("cancelOrderChange", callback);
  },

  removeCancelOrderChangeListener(callback) {
    this.removeListener("cancelOrderChange", callback);
  },

  updateOrder() {
    orders.map(i => (i.id === cancelId ? (i.status = "cancelled") : null));
  },

  getUserName() {
    return userName;
  },

  getStatus() {
    return status;
  },

  getError() {
    return error;
  },

  getOrders() {
    return orders;
  }
});

AppDispatcher.register(function(payload) {
  const { action } = payload;

  switch (action.actionType) {
    case "LOAD":
      accessToken = localStorage.access_token;
      id = localStorage.id;
      if (accessToken !== "") {
        UserApi.initialLoad(accessToken, id).then(response => {
          error = "";
          id = response.data.id;
          userName = response.data.email.substring(0, 4);
          status = "SUCCESS";
          UserStore.emitInitialChange();
        });
      }
      break;

    case "REGISTER":
      window.localStorage.clear();
      UserApi.register(action.data).then(
        response => {
          id = 0;
          accessToken = "";
          userName = "";
          error = "";
          status = "SUCCESS";
          UserStore.emitTenantUserChange();
        },
        err => {
          id = 0;
          accessToken = "";
          userName = "";
          error = "The email and password provided already exists.";
          status = "FAILURE";
          UserStore.emitTenantUserChange();
        }
      );
      break;
    case "SIGNIN":
      window.localStorage.clear();
      UserApi.signin(action.data).then(
        response => {
          id = response.data.userId;
          accessToken = response.data.id;
          userName = response.config.data.substring(10, 14);
          status = "SUCCESS";
          error = "";
          if (accessToken) {
            localStorage.setItem("access_token", accessToken);
            localStorage.setItem("id", id);
          }
          UserStore.emitChange();
        },
        err => {
          id = "";
          accessToken = "";
          userName = "";
          status = "FAILURE";
          error = "Invalid Credential !";
          UserStore.emitChange();
        }
      );
      break;

    case "SIGNOUT":
      if (accessToken !== "") {
        UserApi.signout(accessToken).then(response => {
          window.localStorage.clear();
          id = "";
          accessToken = "";
          userName = "";
          status = "";
          error = "";
        });
      }
      break;

    case "CHECKOUT":
      accessToken = localStorage.access_token;
      if (accessToken !== "")
        UserApi.checkOut(action.data, accessToken).then(
          response => {
            window.localStorage.clear();
            if (accessToken) {
              localStorage.setItem("access_token", accessToken);
              localStorage.setItem("id", id);
            }
            error = "";
            status = "SUCCESS";
            UserStore.emitCheckoutChange();
          },
          err => {
            status = "FAILURE";
            error = "Order not placed";
            UserStore.emitCheckoutChange();
          }
        );
      break;

    case "VIEWORDERS":
      accessToken = localStorage.access_token;
      id = localStorage.id;
      if (accessToken !== "")
        UserApi.viewOrders(accessToken, id).then(
          response => {
            error = "";
            status = "SUCCESS";
            orders = response.data;
            UserStore.emitViewOrderChange();
          },
          err => {
            status = "FAILURE";
            error = "Orders not retrieved";
            UserStore.emitViewOrderChange();
          }
        );
      break;

    case "CANCELORDER":
      accessToken = localStorage.access_token;
      cancelId = action.data.id;
      if (accessToken !== "")
        UserApi.cancelOrder(action.data.data, action.data.id, accessToken).then(
          response => {
            error = "";
            status = "SUCCESS";
            UserStore.updateOrder();
            UserStore.emitCancelOrderChange();
          },
          err => {
            status = "FAILURE";
            error = "Orders not retrieved";
            UserStore.emitCancelOrderChange();
          }
        );
      break;

    default:
      return true;
  }

  return true;
});

export default UserStore;
