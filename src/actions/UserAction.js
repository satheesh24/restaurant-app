import AppDispatcher from "../dispatcher/AppDispatcher";

const UserAction = {
  register(user) {
    AppDispatcher.handleAction({
      actionType: "REGISTER",
      data: user
    });
  },

  signin(user) {
    AppDispatcher.handleAction({
      actionType: "SIGNIN",
      data: user
    });
  },

  signout() {
    AppDispatcher.handleAction({
      actionType: "SIGNOUT"
    });
  },

  initialLoad() {
    AppDispatcher.handleAction({
      actionType: "LOAD"
    });
  },

  checkOut(user) {
    AppDispatcher.handleAction({
      actionType: "CHECKOUT",
      data: user
    });
  }
};

export default UserAction;
