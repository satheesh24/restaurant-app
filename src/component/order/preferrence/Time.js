import React, { Component } from "react";

class Time extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Choose a Time"
    };
  }
  render() {
    return (
      <div className="order-location">
        <div
          className={this.getToggleHeader()}
          onClick={() => this.props.timeTitleClick()}
        >
          <span className="location-icon" />
          <span className="header-content">{this.getToggleTitle()}</span>
        </div>
        <div className={this.getToggleContent()}>
          {this.props.time.map((time, key) => (
            <p
              className="address-content"
              onClick={() => this.props.timeOptionClick(time.id, time.name)}
            >
              <p className="address-header">{time.name}</p>
              <p className="address-detail">
                <span> {time.content} </span>{" "}
              </p>
            </p>
          ))}
        </div>
      </div>
    );
  }

  getToggleHeader() {
    let classes = " ";
    classes +=
      this.props.methodSelected === 0
        ? "un-selected-header"
        : this.props.timeSelected === 0
        ? "header"
        : "selected-header";
    return classes;
  }

  getToggleContent() {
    let classes = "address ";
    classes +=
      this.props.methodSelected === 0 || this.props.timeSelected !== 0
        ? "hide"
        : "visible";
    return classes;
  }

  getToggleTitle() {
    const time = [...this.props.time];
    const value = this.props.timeSelected - 1;
    let header = " ";
    header +=
      this.props.timeSelected === 0 ? this.state.title : time[value].name;
    return header;
  }
}

export default Time;
