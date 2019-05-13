import React, { Component } from "react";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "TREMONT",
      navTab: [{ id: 1, name: "Order Now", value: "OrderNow" }],
      otherTab: [
        { id: 2, name: "Gallery", value: "Gallery" },
        { id: 3, name: "Story", value: "Story" },
        { id: 4, name: "Visit", value: "Visit" }
      ],
      viewOrder: "Order History"
    };
  }

  render() {
    return (
      <div className="index-header">
        <div className="pos-left">
          <span className="index-title">{this.state.title}</span>
          {this.state.otherTab.map(otherTab => (
            <span
              className="other-nav-content"
              onClick={() => this.props.onClick(otherTab.name)}
            >
              {otherTab.name}
            </span>
          ))}{" "}
        </div>
        <div className="index-nav pos-right">
          {this.state.navTab.map(navTab => (
            <div className="index-nav-content">
              <span
                className="index-cursor"
                onClick={() => this.props.onClick(navTab.name)}
              >
                {navTab.name}
              </span>
            </div>
          ))}{" "}
          <div className="index-nav-content">
            <span
              className="index-cursor"
              onClick={() => this.props.onClick(this.state.viewOrder)}
            >
              {this.props.signedIn ? this.state.viewOrder : null}{" "}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
