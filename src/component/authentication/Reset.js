import React, { Component } from "react";

class Reset extends Component {
  constructor() {
    super();
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      fields: { email: "" },
      errors: { email: "" },
      cancel: "Cancel",
      resetButton: "Reset my Password",
      isValid: { email: true },
      btnEnable: { email: false }
    };
  }

  handleChange = e => {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });
    this.validateEmail();
  };

  validateEmail() {
    let fields = this.state.fields;
    let errors = this.state.errors;
    let isValid = this.state.isValid;
    let btnEnable = this.state.btnEnable;

    if (!fields["email"]) {
      isValid["email"] = false;
      errors["email"] = "email is required";
    } else if (typeof fields["email"] !== "undefined") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(fields["email"])) {
        isValid["email"] = false;
        errors["email"] = "Please enter valid Email-ID";
      } else {
        isValid["email"] = true;
        btnEnable["email"] = true;
      }
    } else {
      isValid["email"] = true;
      btnEnable["email"] = true;
    }
    this.setState({
      errors: errors,
      isValid: isValid,
      btnEnable: btnEnable
    });
  }

  render() {
    return (
      <fragment>
        <div className="sign-in">
          <div className="form">
            <div className="form-input">
              <input
                className="input"
                type="email"
                name="email"
                placeholder="E-mail"
                value={this.state.fields.email}
                onChange={this.handleChange}
              />
            </div>
            <div
              className={this.state.isValid["email"] ? "hide" : "alert-error"}
            >
              {this.state.errors["email"]}
            </div>
          </div>
          <div className="action">
            <div
              className={
                this.state.isValid["email"] && this.state.btnEnable["email"]
                  ? "signin-button reset-button"
                  : "signin-button reset-button reset-disable-btn"
              }
            >
              {" "}
              <div className="ahref"> {this.state.resetButton} </div>{" "}
            </div>
            <div className="other-action col-xs-12">
              <div
                className="reset-action pos-left"
                onClick={this.props.getSignin}
              >
                {" "}
                {this.state.cancel}{" "}
              </div>
            </div>
          </div>
        </div>
      </fragment>
    );
  }
}

export default Reset;
