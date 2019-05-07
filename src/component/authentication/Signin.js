import React, { Component } from "react";
import UserAction from "../../actions/UserAction";
import UserStore from "../../stores/UserStore";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      fields: { email: "", password: "" },
      errors: { email: "", password: "" },
      cancel: "Cancel",
      reset: "Forgot Password?",
      createBtn: "Create an Account",
      signinBtn: "Signin to place order",
      isValid: { email: true, password: true },
      btnEnable: { email: false, password: false },
      errMsg: "",
      isError: false,
      isSuccess: false
    };
  }

  componentDidMount() {
    UserStore.addChangeListener(this.onStoreChange);
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this.onStoreChange);
  }

  onStoreChange = () => {
    let status = UserStore.getStatus(),
      userName = UserStore.getUserName(),
      errMsg = "",
      baseState = this.getInitialState;

    if (status === "SUCCESS") {
      this.props.signedIn(userName);
    } else if (status === "FAILURE") {
      errMsg = UserStore.getError();
      this.setState(baseState);
      this.setState({ isError: true, errMsg: errMsg });
    }
  };

  cancelClick = () => {
    this.props.signinCancelClick();
  };

  getReset = () => {
    this.props.getReset();
  };

  getSignup = () => {
    this.props.getSignup();
  };

  signin = () => {
    UserAction.signin({
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
    e.target.name === "email" ? this.validateEmail() : this.validatePassword();
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
          {" "}
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
          <div className={this.state.isValid["email"] ? "hide" : "alert-error"}>
            {this.state.errors["email"]}
          </div>
          <div className="form-input">
            <input
              className="input"
              type="password"
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
              this.state.isValid["email"] &&
              this.state.isValid["password"] &&
              this.state.btnEnable["email"] &&
              this.state.btnEnable["password"]
                ? "signin-button"
                : "signin-button signin-disable-btn"
            }
            onClick={this.signin}
          >
            {" "}
            <div className="ahref"> {this.state.signinBtn} </div>{" "}
          </div>
          <div className="col-xs-12 other-action">
            <div className="pos-left reset-action" onClick={this.cancelClick}>
              {" "}
              {this.state.cancel}{" "}
            </div>
            <div className="pos-right reset-action" onClick={this.getReset}>
              {" "}
              {this.state.reset}{" "}
            </div>
          </div>

          <div className="create-button">
            {" "}
            <div className="btn" onClick={this.getSignup}>
              {" "}
              {this.state.createBtn}{" "}
            </div>{" "}
          </div>
        </div>
      </div>
    );
  }
}

export default Signin;
