import React, { Component } from "react";
import UserAction from "../actions/UserAction";
import UserStore from "../stores/UserStore";
import Header from "./home/Header";
import HeaderMob from "./home/HeaderMob";
import Body from "./home/Body";
import Authentication from "./authentication/Authentication";
import OrderIndex from "./order/OrderIndex";
import ViewOrders from "./order/ViewOrders.js";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      component: "",
      componentSelected: false,
      user: "",
      userName: "Hello, ",
      signedIn: false,
      userId: 0,
      orderCompleted: false,
      viewOrders: false,
      orders: [],
      messageStatus: false,
      message: "Order Placed Successfully !",
      viewMenu: false
    };
  }

  componentWillMount() {
    this.initialLoad();
  }

  componentDidMount() {
    UserStore.addInitialChangeListener(this.onStoreChange);
    UserStore.addViewOrderChangeListener(this.viewOrderChange);
    UserStore.addCancelOrderChangeListener(this.cancelOrderChange);
  }

  componentWillUnmount() {
    UserStore.removeInitialChangeListener(this.onStoreChange);
    UserStore.removeViewOrderChangeListener(this.viewOrderChange);
    UserStore.addCancelOrderChangeListener(this.cancelOrderChange);
  }

  initialLoad = () => {
    UserAction.initialLoad();
  };

  viewOrders = () => {
    let userId = this.state.userId;
    UserAction.viewOrders(userId);
  };

  cancelOrder = id => {
    UserAction.cancelOrder({ id: id, data: { status: "cancelled" } });
  };

  onStoreChange = () => {
    let status = UserStore.getStatus(),
      user = this.state.userName;
    user += UserStore.getUserName();

    if (status === "SUCCESS") {
      this.setState({ user: user, signedIn: true });
    }
  };

  viewOrderChange = () => {
    let status = UserStore.getStatus();
    if (status === "SUCCESS") {
      let orders = UserStore.getOrders();
      this.setState({
        orders: orders
      });
    }
  };

  cancelOrderChange = () => {
    this.setState({});
  };

  toggleMenu = () => {
    let viewMenu = !this.state.viewMenu;
    this.setState({
      viewMenu
    });
  };

  onClick = component => {
    if (component === "Order Now") {
      this.setState({
        component: component,
        componentSelected: true,
        userId: localStorage.id,
        orderCompleted: false,
        viewOrders: false,
        messageStatus: false,
        viewMenu: false
      });
    } else if (component === "Order History") {
      this.setState({
        viewOrders: true,
        component: component,
        componentSelected: false,
        viewMenu: false
      });
      this.viewOrders();
    } else {
      this.setState({
        viewOrders: false,
        component: "",
        componentSelected: false,
        orderCompleted: false,
        messageStatus: false,
        viewMenu: false
      });
    }
  };

  signedIn = userName => {
    let user = this.state.userName;
    user += userName;
    this.setState({
      signedIn: true,
      user: user,
      userId: localStorage.id
    });
  };

  signedOut = () => {
    this.setState({
      user: "",
      signedIn: false
    });
    this.closeClick();
  };

  closeClick = () => {
    let user = this.state.signedIn ? this.state.user : "Signin >>";
    this.setState({
      component: "",
      componentSelected: false,
      user: user,
      orderCompleted: false
    });
  };

  exit = () => {
    this.setState({
      component: "",
      componentSelected: false,
      orderCompleted: false,
      viewMenu: false
    });
  };

  exitOrder = () => {
    this.setState({
      component: "",
      componentSelected: false,
      orderCompleted: true,
      messageStatus: true,
      viewMenu: false
    });
  };

  render() {
    const { viewOrders } = this.state;
    return (
      <div class="main">
        <Header onClick={this.onClick} signedIn={this.state.signedIn} />
        <HeaderMob
          onClick={this.onClick}
          signedIn={this.state.signedIn}
          viewMenu={this.state.viewMenu}
          toggleMenu={this.toggleMenu}
        />
        <Body />
        {viewOrders ? (
          <ViewOrders
            orders={this.state.orders}
            cancelOrder={id => this.cancelOrder(id)}
          />
        ) : null}

        {this.state.componentSelected ? (
          !this.state.signedIn ? (
            <Authentication
              signedIn={this.signedIn}
              signinCancelClick={this.closeClick}
            />
          ) : null
        ) : null}

        {this.state.signedIn && !this.state.orderCompleted ? (
          <OrderIndex
            user={this.state.user}
            userId={this.state.userId}
            signedOut={this.signedOut}
            componentSelected={this.state.componentSelected}
            exitOrder={this.exitOrder}
            exit={this.exit}
          />
        ) : null}

        {this.state.componentSelected ? (
          <div onClick={this.exit} className="order-now-extra">
            {" "}
            <div className="close"> X </div>
          </div>
        ) : null}
        {this.state.messageStatus ? (
          <div id="message" className="message">
            {this.state.message}{" "}
          </div>
        ) : null}
      </div>
    );
  }
}

export default Index;
