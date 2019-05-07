import React, { Component } from "react";

class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      totalText: "TOTAL",
      bfrBtn: "Place order",
      aftBtn: "Checkout",
      currency: "$"
    };
  }

  render() {
    return (
      <div className="check-out">
        <div className="check-header">
          <div className="check-location">
            {" "}
            <span className="title">
              {" "}
              {this.props.location
                .filter(i => i.id === this.props.locationSelected)
                .map(loc => loc.name)}{" "}
            </span>
            <span className="address">
              {this.props.location
                .filter(i => i.id === this.props.locationSelected)
                .map(loc => loc.address)}{" "}
            </span>{" "}
          </div>
          <div className="check-method">
            <span className="method">
              {this.props.method
                .filter(i => i.id === this.props.methodSelected)
                .map(meth => meth.name)}{" "}
              -{" "}
            </span>
            <span className="time">
              {this.props.time
                .filter(i => i.id === this.props.timeSelected)
                .map(tim => tim.display)}{" "}
            </span>
          </div>
        </div>
        <div className="check-body">
          {this.props.itemDisplay.map((i, key) => (
            <div className="check-item">
              <span className="name"> {i.name} </span>
              <span className="price">
                {this.state.currency}
                {i.price}{" "}
              </span>
            </div>
          ))}
        </div>
        <div className="check-footer">
          <div className="check-total">
            {" "}
            <span className="content">{this.state.totalText}</span>{" "}
            <span className="price">
              {this.state.currency}
              {this.props.totalValue}
            </span>{" "}
          </div>
          <div
            className={
              this.props.totalValue > 0 ? "check-btn" : "check-btn disBtn"
            }
          >
            <div className="ahref" onClick={this.props.checkOut}>
              {this.props.totalValue > 0
                ? this.state.aftBtn
                : this.state.bfrBtn}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Checkout;
