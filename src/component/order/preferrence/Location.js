import React, { Component } from "react";

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Choose Location",
      location: "Location - "
    };
  }

  render() {
    return (
      <div className="order-location">
        <div
          className={this.getToggleHeader()}
          onClick={() => this.props.locationTitleClick()}
        >
          <span className="location-icon" />
          <span className="header-content">
            <span className="header-side">
              {this.props.locationSelected === 0 ? "" : this.state.location}{" "}
            </span>
            {this.getToggleTitle()}
          </span>
        </div>
        <div className={this.getToggleContent()}>
          {this.props.location.map((location, key) => (
            <p
              className="address-content"
              onClick={() => this.props.locationOptionClick(location.id)}
            >
              <p className="address-header">{location.name}</p>
              <p className="address-detail">
                <span> {location.address} </span>
                <span> {location.city} </span>
                <span> {location.country} </span>{" "}
              </p>
            </p>
          ))}
        </div>
      </div>
    );
  }

  getToggleTitle() {
    const location = [...this.props.location];
    const value = this.props.locationSelected - 1;
    let header = " ";
    header +=
      this.props.locationSelected === 0
        ? this.state.title
        : location[value].name;
    return header;
  }

  getToggleHeader() {
    let classes = " ";
    classes += this.props.locationSelected === 0 ? "header" : "selected-header";
    return classes;
  }

  getToggleContent() {
    let classes = "address ";
    classes += this.props.locationSelected === 0 ? "visible" : "hide";
    return classes;
  }
}

export default Location;
