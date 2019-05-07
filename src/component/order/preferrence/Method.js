import React, { Component } from "react";

class Method extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Choose a Method"
    };
  }
  render() {
    return (
      <div className="order-location">
        <div
          className={this.getToggleHeader()}
          onClick={() => this.props.methodTitleClick()}
        >
          <span className="location-icon" />
          <span className="header-content">{this.getToggleTitle()}</span>
        </div>
        <div className={this.getToggleContent()}>
          {this.props.method.map((method, key) => (
            <p
              className="address-content"
              onClick={() =>
                this.props.methodOptionClick(method.id, method.name)
              }
            >
              <p className="address-header">{method.name}</p>
              <p className="address-detail">
                <span> {method.content} </span>{" "}
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
      this.props.locationSelected === 0
        ? "un-selected-header"
        : this.props.methodSelected === 0
        ? "header"
        : "selected-header";
    return classes;
  }

  getToggleContent() {
    let classes = "address ";
    classes +=
      this.props.locationSelected === 0 || this.props.methodSelected !== 0
        ? "hide"
        : "visible";
    return classes;
  }

  getToggleTitle() {
    const method = [...this.props.method];
    const value = this.props.methodSelected - 1;
    let header = " ";
    header +=
      this.props.methodSelected === 0 ? this.state.title : method[value].name;
    return header;
  }
}

export default Method;
