import React, { Component } from "react";

class Orders extends Component {
  constructor() {
    super();
    this.state = {
      totalText: "Total: ",
      currency: "\u20B9 ",
      cancelBtn: "Cancel the order",
      viewBtn: "Cancelled",
      mulTxt: " x "
    };
  }

  render() {
    return (
      <div className="view-order">
        {this.props.orders.map(orders => (
          <div>
            <div className="view-header">
              <div className="view-location">
                <span className="title"> {orders.location} </span>
                <span className="address">
                  Method - {orders.delivery_type}{" "}
                </span>{" "}
              </div>
            </div>

            <div className="view-body">
              {orders.item_details.itemDetails.map((i, key) => (
                <div className="view-item">
                  <span className="name col-xs-6 pos-left"> {i.name} </span>
                  <span className="price col-xs-6 pos-right">
                    {" "}
                    <span className="calc">
                      {i.count}
                      {this.state.mulTxt}
                      {i.price}
                    </span>
                    {this.state.currency}
                    {i.count * i.price}
                  </span>
                </div>
              ))}
            </div>
            <div className="view-footer">
              <div className="view-total">
                {" "}
                <span className="content col-xs-6 pos-left">
                  {this.state.totalText}
                </span>{" "}
                <span className="price col-xs-6 pos-right">
                  {this.state.currency}
                  {orders.total_price}
                </span>{" "}
              </div>
              <div className="view-status">
                <span className="content col-xs-6 pos-left">
                  Order #{orders.id}
                </span>{" "}
                <span className="price col-xs-6 pos-right">
                  {orders.status}
                </span>{" "}
              </div>
            </div>
            {orders.status === "created" ? (
              <div className="view-btn">
                <div className="btn">
                  {" "}
                  <div
                    className="ahref"
                    onClick={id => this.props.cancelOrder(orders.id)}
                  >
                    {" "}
                    {this.state.cancelBtn}
                  </div>{" "}
                </div>
              </div>
            ) : (
              <div className="view-btn">
                <div className="cancelled-btn">
                  {" "}
                  <div className="ahref"> {this.state.viewBtn}</div>{" "}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
}

export default Orders;
