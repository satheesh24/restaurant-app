import React, { Component } from "react";
import "../../assets/style.scss";
import "../../assets/orderNow.scss";
import Preferrence from "../order/preferrence/Preferrence";
import Cart from "../order/cart/Cart";
import Signout from "../authentication/Signout";
import UserAction from "../../actions/UserAction";
import UserStore from "../../stores/UserStore";

class OrderIndex extends Component {
  constructor() {
    super();
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      title: "Eats",
      viewBtn: "view the menu",
      location: [
        {
          id: 1,
          name: "Olympia Tech Park",
          address: "Guindy",
          city: "Chennai",
          country: "IND 600100"
        },
        {
          id: 2,
          name: "DLF IT Park",
          address: "Porur",
          city: "Chennai",
          country: "IND 600105"
        }
      ],
      method: [
        {
          id: 1,
          name: "Pickup",
          content: "We are waiting with the order."
        },
        {
          id: 2,
          name: "Door Delivery",
          content: "We will be at your door  with the order."
        }
      ],
      time: [
        {
          id: 1,
          name: "Order for Now",
          content: "Have your order prepared as soon as possible.",
          display: "Now"
        },
        {
          id: 2,
          name: "Order for Later",
          content:
            "Have your order prepared at a specified future date & time.",
          display: "Later"
        }
      ],
      itemCart: [
        {
          id: 1,
          name: "Chicken Briyani",
          price: 100.0,
          count: 0
        },
        {
          id: 2,
          name: "Mutton Briyani",
          price: 125.0,
          count: 0
        },
        {
          id: 3,
          name: "Egg Briyani",
          price: 75.0,
          count: 0
        }
      ],
      itemSelected: [
        {
          id: 0,
          name: "",
          price: 0,
          count: 0
        }
      ],
      clearAll: false,
      getPreferrenceOption: true,
      getViewMenu: false,
      getCartMenu: false,
      getSignout: false,
      locationSelected: 0,
      methodSelected: 0,
      timeSelected: 0,
      itemDisplay: [],
      totalValue: 0
    };
  }

  componentDidMount() {
    UserStore.addCheckoutChangeListener(this.onStoreChange);
  }

  componentWillUnmount() {
    UserStore.removeCheckoutChangeListener(this.onStoreChange);
  }

  locationOptionClick = locationSelected => {
    this.setState({ locationSelected });
  };

  locationTitleClick = () => {
    this.setState({
      locationSelected: 0,
      methodSelected: 0,
      timeSelected: 0
    });
  };

  methodOptionClick = (methodSelected, method) => {
    this.setState({ methodSelected });
  };

  methodTitleClick = () => {
    this.setState({
      methodSelected: 0,
      timeSelected: 0
    });
  };

  timeOptionClick = (timeSelected, time) => {
    this.setState({ timeSelected });
  };

  timeTitleClick = () => {
    this.setState({
      timeSelected: 0
    });
  };

  getPreferrenceOption = () => {
    this.setState({
      getPreferrenceOption: true,
      getViewMenu: false,
      getCartMenu: false,
      getSignout: false
    });
  };

  getSignout = () => {
    this.setState({
      getPreferrenceOption: false,
      getViewMenu: false,
      getCartMenu: false,
      getSignout: true
    });
  };

  getViewMenu = () => {
    this.setState({
      getPreferrenceOption: false,
      getViewMenu: true,
      getCartMenu: true,
      getSignout: false
    });
  };

  itemCartFun = itemCart => {
    this.setState({
      itemCart
    });
  };

  itemDisplayFun = itemDisplay => {
    this.setState({
      itemDisplay
    });
  };

  itemSelectedFun = itemSelected => {
    this.setState({
      itemSelected
    });
  };

  totalValueFun = totalValue => {
    this.setState({
      totalValue
    });
  };

  checkOut = () => {
    let itemDetails = [];

    for (let i = 0; i < this.state.itemDisplay.length; i++) {
      itemDetails.push({
        name: this.state.itemDisplay[i].name,
        count: this.state.itemDisplay[i].count,
        price: this.state.itemDisplay[i].price / this.state.itemDisplay[i].count
      });
    }

    UserAction.checkOut({
      location: String(
        this.state.location
          .filter(i => i.id === this.state.locationSelected)
          .map(loc => loc.name)
      ),
      delivery_type: String(
        this.state.method
          .filter(i => i.id === this.state.methodSelected)
          .map(meth => meth.name)
      ),
      delivery_time: String(
        this.state.time
          .filter(i => i.id === this.state.timeSelected)
          .map(time => time.display)
      ),
      item_details: {
        itemDetails
      },
      total_price: this.state.totalValue,
      userId: this.props.userId
    });
  };

  onStoreChange = () => {
    let status = UserStore.getStatus();
    if (status === "SUCCESS") {
      console.log("Success");
      this.props.exitOrder();
    } else if (status === "FAILURE") {
      let errMsg = UserStore.getError();
      console.log(errMsg);
    }
  };

  render() {
    return (
      <div className={this.props.componentSelected ? "" : "hide"}>
        <div className={this.getSignOut ? "hide" : "order-now"}>
          <div className="header">
            <span className="title col-xs-6 pos-left">{this.state.title}</span>
            <span className="user col-xs-6 pos-right" onClick={this.getSignout}>
              {this.props.user}
            </span>
          </div>
          <div className="content">
            <Preferrence
              locationSelected={this.state.locationSelected}
              locationTitleClick={this.locationTitleClick}
              locationOptionClick={this.locationOptionClick}
              location={this.state.location}
              methodSelected={this.state.methodSelected}
              methodTitleClick={this.methodTitleClick}
              methodOptionClick={this.methodOptionClick}
              method={this.state.method}
              timeSelected={this.state.timeSelected}
              timeTitleClick={this.timeTitleClick}
              timeOptionClick={this.timeOptionClick}
              time={this.state.time}
            />
          </div>
          <div className="content-button">
            {" "}
            <div className={this.toggleButton()} onClick={this.getViewMenu}>
              {" "}
              {this.state.viewBtn}
            </div>{" "}
          </div>
        </div>
        {this.state.getViewMenu ? (
          <Cart
            getViewMenu={this.state.getViewMenu}
            getCartMenu={this.state.getCartMenu}
            locationSelected={this.state.locationSelected}
            methodSelected={this.state.methodSelected}
            timeSelected={this.state.timeSelected}
            location={this.state.location}
            method={this.state.method}
            time={this.state.time}
            getBackOrderNow={this.getPreferrenceOption}
            itemCart={this.state.itemCart}
            itemCartFun={itemCart => this.itemCartFun(itemCart)}
            itemDisplay={this.state.itemDisplay}
            itemDisplayFun={itemDisplay => this.itemDisplayFun(itemDisplay)}
            itemSelected={this.state.itemSelected}
            itemSelectedFun={itemSelected => this.itemSelectedFun(itemSelected)}
            totalValue={this.state.totalValue}
            totalValueFun={totalValue => this.totalValueFun(totalValue)}
            checkOut={this.checkOut}
          />
        ) : null}
        {this.state.getSignout ? (
          <Signout
            signOutCancelClick={this.getPreferrenceOption}
            signedOut={this.props.signedOut}
          />
        ) : null}
      </div>
    );
  }

  toggleButton() {
    let classes = "";
    classes +=
      this.state.locationSelected !== 0 &&
      this.state.methodSelected !== 0 &&
      this.state.timeSelected !== 0
        ? "order-btn visible"
        : "hide";
    return classes;
  }

  toggleOrderNowExtra() {
    let classes = "order-now-extra ";
    classes += this.props.componentSelected === "OrderNow" ? "visible" : "hide";
    return classes;
  }
}

export default OrderIndex;
