import React, { Component } from "react";
import UserAction from "../../actions/UserAction";
import UserStore from "../../stores/UserStore";
import Orders from "../order/cart/Orders";

class Signout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: "Squarespace",
      footerText: "Eats",
      footerTitle: "POWERED BY: ",
      cancel: "Cancel",
      signoutButton: "Log Out"
    };
  }

  signout = () => {
    UserAction.signout();
    window.localStorage.clear();
    this.props.signedOut();
  };

  render() {
    return (
      <div className="authenticate">
        <div className="authentication">
          <div className="header"> {this.state.header} </div>
          <hr />
          <div className="sign-in">
            <div className="action">
              <div className="signin-button reset-button">
                {" "}
                <div className="ahref" onClick={this.signout}>
                  {" "}
                  {this.state.signoutButton}{" "}
                </div>{" "}
              </div>
              <div className="other-action col-xs-12">
                <div
                  className="reset-action pos-left"
                  onClick={this.props.signOutCancelClick}
                >
                  {" "}
                  {this.state.cancel}{" "}
                </div>
              </div>
            </div>
          </div>
          <div classsName="foot">
            {" "}
            <span className="footer-1"> {this.state.footerTitle} </span>
            <span className="footer-2"> {this.state.footerText} </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Signout;
