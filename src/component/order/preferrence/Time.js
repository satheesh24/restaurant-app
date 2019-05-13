import React, { Component } from "react";

class Time extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Choose a Time",
      time: "Time - "
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
          <span className="header-content">
            <span className="header-side">
              {this.props.timeSelected === 0 ? "" : this.state.time}
            </span>
            {this.getToggleTitle()}
          </span>
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
    const timePeriod = [...this.props.timePeriod];
    const value = this.props.timeSelected - 1;
    let header = " ";
    header +=
      this.props.timeSelected === 0
        ? this.state.title
        : this.props.timeSelected === 2 && this.props.timePeriodSelected !== 0
        ? time[value].display +
          " at " +
          timePeriod[this.props.timePeriodSelected - 1].time
        : time[value].display;
    return header;
  }
}

export default Time;
