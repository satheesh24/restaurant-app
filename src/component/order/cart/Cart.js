import React, { Component } from "react";
import Menu from "./Menu";
import Checkout from "./Checkout";
import Quantity from "./Quantity";

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      getQuantity: false,
      item: [
        {
          id: 1,
          name: "Chicken Briyani",
          price: 100.0,
          count: 1
        },
        {
          id: 2,
          name: "Mutton Briyani",
          price: 125.0,
          count: 1
        },
        {
          id: 3,
          name: "Egg Briyani",
          price: 75.0,
          count: 1
        }
      ]
    };
  }

  getQuantity = id => {
    let itemSelected = this.state.item;
    itemSelected = itemSelected.filter(i => i.id === id);
    this.props.itemSelectedFun(itemSelected);
    this.setState({ getQuantity: true });
  };

  getBackItemNow = () => {
    let itemSelected = [
      {
        id: 0,
        name: "",
        price: 0,
        count: 1
      }
    ];
    this.props.itemSelectedFun(itemSelected);
    this.setState({
      getQuantity: false
    });
  };

  getPrice = count => {
    return count * this.props.itemSelected.map((item, key) => item.price);
  };

  addCart = count => {
    let itemCart = this.props.itemCart;
    let itemSelected = this.props.itemCart;
    itemCart = itemCart.filter(i => i.id !== this.props.itemSelected[0].id);
    itemSelected = itemSelected.filter(
      i => i.id === this.props.itemSelected[0].id
    );
    let price = this.getPrice(count);
    itemSelected[0].price = price;
    itemSelected[0].count = count;
    itemCart.push({
      id: itemSelected[0].id,
      name: itemSelected[0].name,
      price: itemSelected[0].price,
      count: itemSelected[0].count
    });
    let itemDisplay = itemCart;
    itemDisplay = itemDisplay.filter(i => i.count !== 0);
    let totalValue = 0;
    for (let i = 0; i < itemDisplay.length; i++) {
      totalValue += itemDisplay[i].price;
    }
    this.props.totalValueFun(totalValue);
    this.props.itemCartFun(itemCart);
    this.props.itemDisplayFun(itemDisplay);
    this.getBackItemNow();
  };

  render() {
    return (
      <div className="view-menu">
        {this.props.getViewMenu ? (
          <Menu
            item={this.state.item}
            getBackOrderNow={this.props.getBackOrderNow}
            getSignOut={this.props.getSignOut}
            getQuantity={this.getQuantity}
            user={this.props.user}
          />
        ) : null}
        {this.state.getQuantity ? (
          <Quantity
            item={this.props.itemSelected}
            getBackItemNow={this.getBackItemNow}
            addCart={count => this.addCart(count)}
          />
        ) : null}
        {this.props.getCartMenu ? (
          <Checkout
            locationSelected={this.props.locationSelected}
            methodSelected={this.props.methodSelected}
            timeSelected={this.props.timeSelected}
            location={this.props.location}
            method={this.props.method}
            time={this.props.time}
            itemCart={this.props.itemCart}
            itemSelected={this.props.itemSelected}
            totalValue={this.props.totalValue}
            itemDisplay={this.props.itemDisplay}
            checkOut={this.props.checkOut}
          />
        ) : null}
      </div>
    );
  }
}

export default Cart;
