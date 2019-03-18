import React from "react";
import { Button } from "reactform-appco";
import "css/lightbox.css";
import "css/form.css";

class UserMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subscribedState: false
    };
  }

  componentDidMount = () => {
    if (this.props.user.subscribe === true) {
      this.setState({ subscribedState: false });
    } else {
      this.setState({ subscribedState: true });
    }
  };

  render() {
    return (
      <>
        <div>
          {this.props.user.subscribe ? (
            <p style={{ paddingBottom: "20px" }}>You are subscribed</p>
          ) : (
            <p style={{ paddingBottom: "20px" }}>You are not subscribed</p>
          )}
          <span
            className="signout-button"
            onClick={this.props.updateSubscribed}
          >
            {this.props.user.subscribe ? (
              <Button value="Unsubscribe" className="submit-button" />
            ) : (
              <Button value="Subscribe" className="submit-button" />
            )}
          </span>
          <Button
            className="submit-button"
            onClick={this.props.logout}
            value="Sign Out"
          />
        </div>
      </>
    );
  }
}

export default UserMenu;
