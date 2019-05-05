import React, { Component } from "react";
import UserAction from "../actions/UserAction";
import UserStore from "../stores/UserStore";
import Header from "./home/Header";
import Body from "./home/Body";
import Authentication from "./authentication/Authentication";
import OrderIndex from "./order/OrderIndex";

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
      orderCompleted: false
    };
  }

  componentWillMount() {
    this.initialLoad();
  }

  componentDidMount() {
    UserStore.addInitialChangeListener(this.onStoreChange);
  }

  componentWillUnmount() {
    UserStore.removeInitialChangeListener(this.onStoreChange);
  }

  initialLoad = () => {
    UserAction.initialLoad();
  };

  onStoreChange = () => {
    let status = UserStore.getStatus(),
      user = this.state.userName;
    user += UserStore.getUserName();

    if (status === "SUCCESS") {
      this.setState({ user: user, signedIn: true });
    }
  };

  onClick = component => {
    if (component === "OrderNow") {
      this.setState({
        component: component,
        componentSelected: true,
        userId: localStorage.id,
        orderCompleted: false
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
      orderCompleted: false
    });
  };

  exitOrder = () => {
    this.setState({
      component: "",
      componentSelected: false,
      orderCompleted: true
    });
  };

  render() {
    return (
      <div class="main">
        <Header onClick={this.onClick} />
        <Body />

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
          />
        ) : null}

        {this.state.componentSelected ? (
          <div onClick={this.exit} className="order-now-extra" />
        ) : null}
      </div>
    );
  }
}

export default Index;
