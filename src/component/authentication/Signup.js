import React, { Component } from "react";
import UserAction from "../../actions/UserAction";
import UserStore from "../../stores/UserStore";

class Signup extends Component {
  constructor() {
    super();
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      fields: { fname: "", lname: "", email: "", password: "" },
      errors: { fname: "", lname: "", email: "", password: "" },
      isValid: { fname: true, lname: true, email: true, password: true },
      cancel: "Cancel",
      signupButton: "Create Account",
      btnEnable: { fname: false, lname: false, email: false, password: false },
      errMsg: "",
      isError: false
    };
  }

  componentDidMount() {
    UserStore.addTenantUserChangeListener(this.onStoreChange);
  }

  componentWillUnmount() {
    UserStore.removeTenantUserChangeListener(this.onStoreChange);
  }

  onStoreChange = () => {
    let status = UserStore.getStatus(),
      baseState = this.getInitialState();

    if (status === "SUCCESS") {
      this.props.getSignin();
    } else if (status === "FAILURE") {
      let errMsg = UserStore.getError();
      this.setState(baseState);
      this.setState({ isError: true, errMsg: errMsg });
    }
  };

  register = () => {
    UserAction.register({
      firstname: this.state.fields["fname"],
      lastname: this.state.fields["lname"],
      email: this.state.fields["email"].trim().toLowerCase(),
      password: this.state.fields["password"]
    });
  };

  handleChange = e => {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });
    switch (e.target.name) {
      case "fname":
        this.validateFname();
        break;
      case "lname":
        this.validateLname();
        break;
      case "email":
        this.validateEmail();
        break;
      case "password":
        this.validatePassword();
        break;
      default:
        break;
    }
  };

  validateFname() {
    let fields = this.state.fields;
    let errors = this.state.errors;
    let isValid = this.state.isValid;
    let btnEnable = this.state.btnEnable;

    if (!fields["fname"]) {
      isValid["fname"] = false;
      errors["fname"] = "first name  is required";
    } else if (typeof fields["fname"] !== "undefined") {
      if (!fields["fname"].match(/^[a-zA-Z ]*$/)) {
        isValid["fname"] = false;
        errors["fname"] = "Name should contain alphabets only";
      } else {
        isValid["fname"] = true;
        btnEnable["fname"] = true;
      }
    } else {
      isValid["fname"] = true;
      btnEnable["fname"] = true;
    }

    this.setState({
      errors: errors,
      isValid: isValid,
      btnEnable: btnEnable
    });
  }

  validateLname() {
    let fields = this.state.fields;
    let errors = this.state.errors;
    let isValid = this.state.isValid;
    let btnEnable = this.state.btnEnable;

    if (!fields["lname"]) {
      isValid["lname"] = false;
      errors["lname"] = "last name  is required";
    } else if (typeof fields["lname"] !== "undefined") {
      if (!fields["lname"].match(/^[a-zA-Z ]*$/)) {
        isValid["lname"] = false;
        errors["lname"] = "Name should contain alphabets only";
      } else {
        isValid["lname"] = true;
        btnEnable["lname"] = true;
      }
    } else {
      isValid["lname"] = true;
      btnEnable["lname"] = true;
    }

    this.setState({
      errors: errors,
      isValid: isValid,
      btnEnable: btnEnable
    });
  }

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

  validatePassword() {
    let fields = this.state.fields;
    let errors = this.state.errors;
    let isValid = this.state.isValid;
    let btnEnable = this.state.btnEnable;

    if (!fields["password"]) {
      isValid["password"] = false;
      errors["password"] = "password is required";
    } else if (typeof fields["password"] !== "undefined") {
      if (!fields["password"].match(/^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z]).*$/)) {
        isValid["password"] = false;
        errors["password"] =
          "Please enter strong password with minimum 8 characters";
      } else {
        isValid["password"] = true;
        btnEnable["password"] = true;
      }
    } else {
      isValid["password"] = true;
      btnEnable["password"] = true;
    }

    this.setState({
      errors: errors,
      isValid: isValid,
      btnEnable: btnEnable
    });
  }

  render() {
    return (
      <div className="sign-in">
        <div className="form">
          <div className="form-input">
            <input
              type="text"
              className="input"
              name="fname"
              placeholder="First Name"
              value={this.state.fields.fname}
              onChange={this.handleChange}
            />
          </div>
          <div className={this.state.isValid["fname"] ? "hide" : "alert-error"}>
            {" "}
            {this.state.errors["fname"]}{" "}
          </div>
          <div className="form-input">
            <input
              type="text"
              className="input"
              name="lname"
              placeholder="Last Name"
              value={this.state.fields.lname}
              onChange={this.handleChange}
            />
          </div>
          <div className={this.state.isValid["lname"] ? "hide" : "alert-error"}>
            {" "}
            {this.state.errors["lname"]}{" "}
          </div>
          <div className="form-input">
            <input
              type="email"
              className="input"
              name="email"
              placeholder="E-mail"
              value={this.state.fields.email}
              onChange={this.handleChange}
            />
          </div>
          <div className={this.state.isValid["email"] ? "hide" : "alert-error"}>
            {" "}
            {this.state.errors["email"]}{" "}
          </div>
          <div className="form-input">
            <input
              type="password"
              className="input"
              name="password"
              placeholder="Password"
              value={this.state.fields.password}
              onChange={this.handleChange}
            />
          </div>
          <div
            className={this.state.isValid["password"] ? "hide" : "alert-error"}
          >
            {" "}
            {this.state.errors["password"]}{" "}
          </div>
          <div className={this.state.isError === true ? "alert-error" : "hide"}>
            {this.state.errMsg}
          </div>
        </div>

        <div className="action">
          <div
            className={
              this.state.isValid["fname"] &&
              this.state.isValid["lname"] &&
              this.state.isValid["email"] &&
              this.state.isValid["password"] &&
              this.state.btnEnable["fname"] &&
              this.state.btnEnable["lname"] &&
              this.state.btnEnable["email"] &&
              this.state.btnEnable["password"]
                ? "signin-button signup-button"
                : "signin-button signup-button signup-disable-btn"
            }
            onClick={this.register}
          >
            {" "}
            <div className="ahref"> {this.state.signupButton} </div>
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
    );
  }
}

export default Signup;
