import React, { Component } from "react";

class Orders extends Component {
  constructor() {
    super();
    this.state = {
      totalText: "Total: ",
      currency: "$ ",
      totalValue: 475,
      cancelBtn: "Cancel the order",
      viewBtn: "Cancelled"
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
                  Arrival - {orders.delivery_time}{" "}
                </span>{" "}
              </div>
            </div>

            <div className="view-body">
              {orders.item_details.itemDetails.map((i, key) => (
                <div className="view-item">
                  <span className="name col-xs-6 pos-left"> {i.name} </span>
                  <span className="price col-xs-6 pos-right">
                    {" "}
                    {i.count} qty.{" "}
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
