import React, { Component } from "react";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "TREMONT",
      navTab: [
        { id: 1, name: "Order Now", value: "OrderNow" },
        { id: 2, name: "Home", value: "Home" },
        { id: 3, name: "Gallery", value: "Gallery" },
        { id: 4, name: "Story", value: "Story" },
        { id: 5, name: "Visit", value: "Visit" }
      ],
      viewOrder: "View Orders"
    };
  }

  render() {
    return (
      <div className="index-header">
        <div className="index-title col-xs-6 pos-left">{this.state.title}</div>
        <div className="index-nav col-xs-6 pos-right">
          {this.state.navTab.map(navTab => (
            <span
              className="index-nav-content"
              onClick={() => this.props.onClick(navTab.value)}
            >
              {navTab.name}
            </span>
          ))}{" "}
          <span
            className="index-nav-content"
            onClick={() => this.props.onClick(this.state.viewOrder)}
          >
            {this.props.signedIn ? this.state.viewOrder : null}{" "}
          </span>
        </div>
      </div>
    );
  }
}

export default Header;
