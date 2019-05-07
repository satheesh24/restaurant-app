import React, { Component } from "react";

class Quantity extends Component {
  constructor() {
    super();
    this.state = {
      backward: "< Menu",
      title: "Choose a Quantity",
      incBtn: "+",
      decBtn: "-",
      cartBtn: "Add to Cart",
      currency: "$",
      count: 1
    };
  }

  decrement = () => {
    let count = this.state.count;
    count -= 1;
    this.setState({
      count
    });
  };

  increment = () => {
    let count = this.state.count;
    count += 1;
    this.setState({
      count
    });
  };

  addCart = () => {
    this.props.addCart(this.state.count);
  };

  getBackItemNow = () => {
    this.props.getBackItemNow();
  };

  render() {
    return (
      <div className="menu">
        <div className="menu-body">
          <div className="quantity-header">
            <div className="backward" onClick={this.getBackItemNow}>
              {" "}
              {this.state.backward}{" "}
            </div>
          </div>
          <div className="quantity-body">
            {this.props.item.map((item, key) => (
              <div className="item col-xs-12">
                <div className="item-header col-xs-6 pos-left">
                  {" "}
                  {item.name}
                </div>
                <div className="item-price col-xs-6 pos-right">
                  {" "}
                  {this.state.currency}
                  {item.price}
                </div>
              </div>
            ))}
            <div className="item-quantity">
              {" "}
              <div className="content col-xs-12"> {this.state.title} </div>
              <div className="item-count">
                <span className={this.toggleIBtn()} onClick={this.decrement}>
                  {" "}
                  {this.state.decBtn}{" "}
                </span>
                <span className="count-item"> {this.state.count} </span>
                <span className={this.toggleDBtn()} onClick={this.increment}>
                  {" "}
                  {this.state.incBtn}{" "}
                </span>
              </div>
            </div>
          </div>
          <div className="quantity-footer">
            <div className="cart-btn" onClick={this.addCart}>
              {this.state.cartBtn}
            </div>
          </div>
        </div>
      </div>
    );
  }

  toggleIBtn() {
    let classes = "count-Ibtn ";
    classes += this.state.count === 0 ? "btn-disable" : "";
    return classes;
  }

  toggleDBtn() {
    let classes = "count-Ibtn ";
    classes += this.state.count === 10 ? "btn-disable" : "";
    return classes;
  }
}

export default Quantity;
