import React, { Component } from "react";
import "../../assets/style.scss";

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "123 Fake Street — Seattle, WA — 206-555-7890",
      mode: [
        { id: 1, name: "EAT" },
        { id: 2, name: "DRINK" },
        { id: 3, name: "VISIT" }
      ]
    };
  }
  render() {
    return (
      <div className="index-content">
        <div className="index-address">{this.state.address}</div>
        <div className="index-mode">
          {" "}
          {this.state.mode.map(mode => (
            <span className="index-mode-content">{mode.name}</span>
          ))}{" "}
        </div>
      </div>
    );
  }
}

export default Body;
