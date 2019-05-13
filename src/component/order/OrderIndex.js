import React, { Component } from "react";
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
      title: "Home",
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
          content: "Have your order prepared at a specified time.",
          display: "Later"
        }
      ],
      itemCart: [
        {
          id: 1,
          name: "Chicken Briyani",
          price: 3.0,
          count: 0
        },
        {
          id: 2,
          name: "Mutton Briyani",
          price: 4.0,
          count: 0
        },
        {
          id: 3,
          name: "Egg Briyani",
          price: 2.0,
          count: 0
        }
      ],

      timePeriod: [
        {
          id: 1,
          time: "a"
        },
        {
          id: 2,
          time: "b"
        },
        {
          id: 3,
          time: "c"
        },
        {
          id: 4,
          time: "d"
        },
        {
          id: 5,
          time: "e"
        },
        {
          id: 6,
          time: "f"
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
      timePeriodSelected: 0,
      itemDisplay: [],
      totalValue: 0,
      loadChange: {
        locationSelected: 0,
        methodSelected: 0,
        timeSelected: 0
      }
    };
  }

  componentWillMount() {
    this.initialLoad();
  }

  componentDidMount() {
    UserStore.addCheckoutChangeListener(this.onStoreChange);
  }

  componentWillUnmount() {
    UserStore.removeCheckoutChangeListener(this.onStoreChange);
  }

  initialLoad = () => {
    if (localStorage.loadChange !== undefined) {
      let loadChange = JSON.parse(localStorage.loadChange);
      let locationSelected = loadChange.locationSelected;
      let methodSelected = loadChange.methodSelected;
      let timeSelected = loadChange.timeSelected;
      this.setState({
        loadChange,
        locationSelected,
        methodSelected,
        timeSelected
      });
    }

    if (localStorage.itemDisplay !== undefined) {
      let itemDisplay = JSON.parse(localStorage.itemDisplay);
      let totalValue = 0;
      for (let i = 0; i < itemDisplay.length; i++) {
        totalValue += itemDisplay[i].price;
      }
      this.setState({
        itemDisplay,
        totalValue
      });
    }

    if (localStorage.itemCart !== undefined) {
      let itemCart = JSON.parse(localStorage.itemCart);
      this.setState({
        itemCart
      });
    }
  };

  locationOptionClick = locationSelected => {
    let loadChange = this.state.loadChange;
    loadChange.locationSelected = locationSelected;
    localStorage.setItem("loadChange", JSON.stringify(loadChange));
    this.setState({
      locationSelected,
      loadChange
    });
  };

  locationTitleClick = () => {
    let loadChange = this.state.loadChange;
    loadChange.locationSelected = 0;
    loadChange.methodSelected = 0;
    loadChange.timeSelected = 0;
    localStorage.setItem("loadChange", JSON.stringify(loadChange));
    this.setState({
      locationSelected: 0,
      methodSelected: 0,
      timeSelected: 0,
      timePeriodSelected: 0,
      loadChange
    });
  };

  methodOptionClick = (methodSelected, method) => {
    let loadChange = this.state.loadChange;
    loadChange.methodSelected = methodSelected;
    localStorage.setItem("loadChange", JSON.stringify(loadChange));
    this.setState({
      methodSelected,
      loadChange
    });
  };

  methodTitleClick = () => {
    let loadChange = this.state.loadChange;
    loadChange.methodSelected = 0;
    loadChange.timeSelected = 0;
    localStorage.setItem("loadChange", JSON.stringify(loadChange));
    this.setState({
      methodSelected: 0,
      timeSelected: 0,
      timePeriodSelected: 0,
      loadChange
    });
  };

  getCurrTime = () => {
    let date = new Date();
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let timePeriod = this.state.timePeriod;
    for (let i = 0; i < 6; i++) {
      minutes = minutes + 30;
      hours = minutes >= 60 ? (hours + 1 > 23 ? 0 : hours + 1) : hours;
      minutes = minutes % 60;
      let strTime =
        (hours >= 12 ? hours % 12 : hours) +
        ":" +
        (minutes < 10 ? "0" + minutes : minutes) +
        " " +
        (hours >= 12 ? "pm" : "am");
      timePeriod[i].time = strTime;
    }
    this.setState({
      timePeriod
    });
  };

  timeOptionClick = (timeSelected, time) => {
    let loadChange = this.state.loadChange;
    loadChange.timeSelected = timeSelected === 2 ? 0 : timeSelected;
    localStorage.setItem("loadChange", JSON.stringify(loadChange));
    if (timeSelected === 2) {
      this.getCurrTime();
    }
    this.setState({
      timeSelected,
      loadChange
    });
  };

  timeTitleClick = () => {
    let loadChange = this.state.loadChange;
    loadChange.timeSelected = 0;
    localStorage.setItem("loadChange", JSON.stringify(loadChange));
    this.setState({
      timeSelected: 0,
      timePeriodSelected: 0,
      loadChange
    });
  };

  timePeriodOptionClick = timePeriodSelected => {
    this.setState({
      timePeriodSelected
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
    let item = itemCart;
    localStorage.setItem("itemCart", JSON.stringify(item));
    this.setState({
      itemCart: item
    });
  };

  itemDisplayFun = itemDisplay => {
    let item = itemDisplay;
    localStorage.setItem("itemDisplay", JSON.stringify(item));
    this.setState({
      itemDisplay: item
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
      this.props.exitOrder();
    } else if (status === "FAILURE") {
      let errMsg = UserStore.getError();
    }
  };

  render() {
    return (
      <div className={this.props.componentSelected ? "" : "hide"}>
        <div className={this.getSignOut ? "hide" : "order-now"}>
          <div className="header">
            <div className="col-xs-6 pos-left">
              <span className="title" onClick={this.props.exit}>
                {this.state.title}
              </span>
            </div>
            <div className="col-xs-6 pos-right">
              <span className="user" onClick={this.getSignout}>
                {this.props.user}
              </span>
            </div>
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
              timePeriodOptionClick={this.timePeriodOptionClick}
              timePeriod={this.state.timePeriod}
              timePeriodSelected={this.state.timePeriodSelected}
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
            timePeriodSelected={this.state.timePeriodSelected}
            location={this.state.location}
            method={this.state.method}
            time={this.state.time}
            timePeriod={this.state.timePeriod}
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
        ? this.state.timeSelected === 2
          ? this.state.timePeriodSelected !== 0
            ? "order-btn visible"
            : "hide"
          : "order-btn visible"
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
