import React, { Component } from "react";

class HeaderMob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "TREMONT",
      navTab: [
        { id: 1, name: "Order Now", value: "OrderNow" },
        { id: 2, name: "Order History", value: "OrderHistory" },
        { id: 3, name: "Gallery", value: "Gallery" },
        { id: 4, name: "Story", value: "Story" },
        { id: 5, name: "Visit", value: "Visit" }
      ]
    };
  }

  render() {
    return (
      <div className="index-header-mob">
        <div className="index-title">
          <span>{this.state.title}</span>
          <div className="menu-body" onClick={this.props.toggleMenu}>
            <div className="menu-icon" />
            <div className="menu-icon" />
            <div className="menu-icon" />{" "}
          </div>
        </div>
        {this.props.viewMenu ? (
          <div className="index-nav">
            {this.state.navTab.map(navTab =>
              this.props.signedIn ||
              (!this.props.signedIn && navTab.name !== "Order History") ? (
                <div
                  className="index-nav-content"
                  onClick={() => this.props.onClick(navTab.name)}
                >
                  {navTab.name === "Order History"
                    ? this.props.signedIn
                      ? navTab.name
                      : null
                    : navTab.name}
                </div>
              ) : null
            )}{" "}
          </div>
        ) : null}
      </div>
    );
  }
}

export default HeaderMob;
