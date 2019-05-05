import React, { Component } from "react";
import "../../assets/style.scss";
import "../../assets/orderNow.scss";
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
      signoutButton: "Log Out",
      viewOrderBtn: "View Placed Orders",
      viewOrder: false
    };
  }

  signout = () => {
    UserAction.signout();
    window.localStorage.clear();
    this.props.signedOut();
  };

  viewOrders = () => {
    this.setState({ viewOrder: true });
  };

  render() {
    return (
      <div className="authenticate">
        <div className="authentication">
          <div className="header"> {this.state.header} </div>
          <hr />
          <div className="sign-in">
            <div className="action">
              <div
                className={
                  this.state.viewOrder ? "hide" : "signin-button reset-button"
                }
              >
                {" "}
                <div className="ahref" onClick={this.viewOrders}>
                  {" "}
                  {this.state.viewOrderBtn}{" "}
                </div>{" "}
              </div>
              {this.state.viewOrder ? <Orders /> : null}
              <div className="other-action col-xs-12">
                <div
                  className="reset-action pos-left"
                  onClick={this.props.signOutCancelClick}
                >
                  {" "}
                  {this.state.cancel}{" "}
                </div>
              </div>
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
