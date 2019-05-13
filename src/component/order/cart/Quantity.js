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
      updtBtn: "Update the Cart",
      currency: "\u20B9 ",
      count: 1,
      countExist: 0
    };
  }

  componentWillMount = () => {
    this.getCount();
  };

  decrement = () => {
    let count = parseInt(this.state.count);
    count -= 1;
    this.setState({
      count
    });
  };

  increment = () => {
    let count = parseInt(this.state.count);
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

  getCount = () => {
    let itemDisplay = this.props.itemDisplay;
    let item = itemDisplay.filter(
      i => i.id === parseInt(this.props.item.map(item => item.id))
    );
    let countExist = parseInt(item.map(item => item.count)) > 0 ? 1 : 0;
    let count =
      parseInt(item.map(item => item.count)) > 0
        ? item.map(item => item.count)
        : parseInt("1");
    this.setState({
      count: count,
      countExist: countExist
    });
  };

  render() {
    return (
      <div className="quantity-menu">
        <div className="menu-body">
          <div className="quantity-header">
            <div>
              {" "}
              <span className="backward" onClick={this.getBackItemNow}>
                {this.state.backward}{" "}
              </span>
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
              {this.state.countExist ? this.state.updtBtn : this.state.cartBtn}
            </div>
          </div>
        </div>
      </div>
    );
  }

  toggleIBtn() {
    let classes = "count-Ibtn ";
    classes += this.state.count <= 0 ? "btn-disable" : "";
    return classes;
  }

  toggleDBtn() {
    let classes = "count-Ibtn ";
    classes += this.state.count >= 10 ? "btn-disable" : "";
    return classes;
  }
}

export default Quantity;
