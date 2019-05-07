import React, { Component } from "react";

class Menu extends Component {
  constructor() {
    super();
    this.state = {
      backward: "< Locations",
      title: " Briyani",
      currency: "$"
    };
  }

  render() {
    return (
      <div className="menu">
        <div className="menu-body">
          <div className="menu-header">
            <div
              className="backward pos-left"
              onClick={this.props.getBackOrderNow}
            >
              {" "}
              {this.state.backward}{" "}
            </div>
          </div>
          <div className="menu-content">
            <div className="menu-title col-xs-12">{this.state.title}</div>

            {this.props.item.map((item, key) => (
              <div
                className="menu-row col-xs-12"
                onClick={() => this.props.getQuantity(item.id)}
              >
                {" "}
                <div className="menu-name col-xs-6 pos-left">{item.name}</div>
                <div className="menu-price col-xs-6 pos-right">
                  {this.state.currency}
                  {item.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Menu;
