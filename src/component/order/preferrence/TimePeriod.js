import React, { Component } from "react";

class TimePeriod extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="time-period">
        {this.props.timePeriod.map(time => (
          <div
            className="time-content"
            onClick={() => this.props.timePeriodOptionClick(time.id)}
          >
            {time.time}
          </div>
        ))}
      </div>
    );
  }
}

export default TimePeriod;
