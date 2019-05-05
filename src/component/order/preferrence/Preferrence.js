import React, { Component } from "react";
import Location from "./Location";
import Method from "./Method";
import Time from "./Time";

class Preferrence extends Component {
  render() {
    return (
      <fragment>
        <p className="content-list">
          <Location
            locationSelected={this.props.locationSelected}
            locationTitleClick={this.props.locationTitleClick}
            locationOptionClick={this.props.locationOptionClick}
            location={this.props.location}
          />{" "}
        </p>
        <p className="content-list">
          <Method
            locationSelected={this.props.locationSelected}
            methodSelected={this.props.methodSelected}
            methodTitleClick={this.props.methodTitleClick}
            methodOptionClick={this.props.methodOptionClick}
            method={this.props.method}
          />{" "}
        </p>
        <p className="content-list">
          <Time
            methodSelected={this.props.methodSelected}
            timeSelected={this.props.timeSelected}
            timeTitleClick={this.props.timeTitleClick}
            timeOptionClick={this.props.timeOptionClick}
            time={this.props.time}
          />{" "}
        </p>
      </fragment>
    );
  }
}

export default Preferrence;
