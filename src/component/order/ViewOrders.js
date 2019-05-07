import React, { Component } from "react";
import Orders from "../order/cart/Orders";

class ViewOrders extends Component {
  createViewOrder = () => {
    let viewOrder = [];
    let orders = this.props.orders;

    for (
      let i = orders.length - 1;
      i > orders.length - 6 && orders[i] !== undefined;
      i--
    ) {
      let order = [];
      order.push(orders[i]);
      viewOrder.push(
        <Orders orders={order} cancelOrder={id => this.props.cancelOrder(id)} />
      );
    }
    return viewOrder;
  };
  render() {
    return (
      <fragment>
        <div className="wrapper-main" onClick={this.props.closeViewOrders} />

        <div className="wrapper">
          {this.createViewOrder()}
          <div />
        </div>
      </fragment>
    );
  }
}

export default ViewOrders;
