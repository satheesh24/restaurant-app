import React, { Component } from "react";
import Signin from "../authentication/Signin";
import Signup from "../authentication/Signup";
import Reset from "../authentication/Reset";
import Signout from "../authentication/Signout";

class Authentication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: "Squarespace",
      getSignin: true,
      getSignup: false,
      getReset: false,
      getSignOut: false
    };
  }

  getSignup = () => {
    this.setState({
      getSignin: false,
      getSignup: true
    });
  };

  getReset = () => {
    this.setState({
      getSignin: false,
      getReset: true
    });
  };

  getSignin = () => {
    this.setState({
      getSignin: true,
      getSignup: false,
      getReset: false,
      getSignout: false
    });
  };

  render() {
    const { getSignup } = this.state;
    return (
      <div className="authenticate">
        <div className="authentication">
          <div className="header"> {this.state.header} </div>
          <hr />
          {this.state.getSignin ? (
            <Signin
              signedIn={this.props.signedIn}
              signinCancelClick={() => this.props.signinCancelClick()}
              getSignup={this.getSignup}
              getReset={this.getReset}
            />
          ) : null}
          {getSignup ? <Signup getSignin={this.getSignin} /> : null}
          {this.state.getReset ? <Reset getSignin={this.getSignin} /> : null}
        </div>
      </div>
    );
  }
}

export default Authentication;
