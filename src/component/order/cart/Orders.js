import React, { Component } from "react";
import "../../../assets/orderNow.scss";
import "../../../assets/style.scss";

class Orders extends Component {
  constructor() {
    super();
    this.state = {
      totalText: "TOTAL",
      currency: "$",
      location: "Olympia Tech Park",
      address: "Guindy",
      method: "PickUp",
      time: "Now",
      itemDisplay: [
        {
          name: "Chicken Briyani",
          count: 2,
          unitPrice: 100
        },
        {
          name: "Mutton Briyani",
          count: 1,
          unitPrice: 125
        }
      ],
      totalValue: 325
    };
  }

  render() {
    return (
      <div className="view-order">
        <div className="view-header">
          <div className="view-location">
            {" "}
            <div className="col-xs-6 pos-left">
              <span className="title"> {this.state.location} </span>
              <span className="address">{this.state.address} </span>{" "}
            </div>
            <div className="col-xs-6 pos-right">
              <span className="method">{this.state.method}</span>
              <span className="time">{this.state.time}</span>
            </div>
          </div>
        </div>
        <div className="view-body">
          {this.state.itemDisplay.map((i, key) => (
            <div className="view-item">
              <span className="name"> {i.name} </span>
              <span className="price"> {i.count} </span>
              <span className="price">
                {this.state.currency}
                {i.price}{" "}
              </span>
            </div>
          ))}
        </div>
        <div className="view-footer">
          <div className="view-total">
            {" "}
            <span className="content">{this.state.totalText}</span>{" "}
            <span className="price">
              {this.state.currency}
              {this.state.totalValue}
            </span>{" "}
          </div>
        </div>
      </div>
    );
  }
}

export default Orders;
