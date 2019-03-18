import React from "react";
import EB from "./util/EB";
import LightBox from "lightbox-appco";
import SignIn from "./SignIn";
import NewUser from "./NewUser";
import { Menu, MenuButton } from "menu-appco";
import UserMenu from "./UserMenu";
import "css/form.css";
import "css/usermenu.css";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showUserMenu: false };
    this.toggleUserMenu = this.toggleUserMenu.bind(this);
  }

  toggleUserMenu() {
    if (this.state.showUserMenu === true) {
      this.setState({ showUserMenu: false });
    } else {
      this.setState({ showUserMenu: true });
    }
  }

  render() {
    return (
      <>
        {this.props.user.username ? (
          <>
            {/* prettier-ignore */}
            <EB comp="if username is true, section">
              <>
              <p id="userstate" className="user-menu-area">Signed in as {this.props.user.username}</p>
              <div className="user-menu-area">
              <MenuButton style={{ bordercolor: "grey" }} 
                  barStyle={{backgroundColor: "black"}} 
                  onClick={this.toggleUserMenu} 
              />
              </div>
              </>
            </EB>

            {this.state.showUserMenu ? (
              <EB comp="UserMenu in User.js">
                <>
                  <Menu
                    showMenu={this.state.showUserMenu}
                    closeHandler={this.toggleUserMenu}
                    style={{
                      backgroundColor: "lightgrey",
                      height: "200px",
                      width: "250px"
                    }}
                  >
                    <UserMenu
                      showUserMenu={this.toggleUserMenu}
                      style={{ backgroundColor: "white" }}
                      closeHandler={this.toggleUserMenu}
                      logout={this.props.logout}
                      user={this.props.user}
                      updateSubscribed={this.props.updateSubscribed}
                    />
                  </Menu>
                </>
              </EB>
            ) : null}
          </>
        ) : (
          <>
            {/* prettier-ignore */}
            <LightBox
              close={this.props.close} style={{backgroundColor: "white", width: "275px", height: "400px" }}>
              <div>
                {this.props.authForm === "sign-in" ? (
                  <EB comp="sign-in in User.js">
                    <SignIn response={this.props.signInResponse} userNotify={this.props.userNotify} />
                  </EB>
                ) : this.props.authForm === "new-user" ? (
                  <EB comp="NewUser in User.js">
                    <NewUser response={this.props.signInResponse} userNotify={this.props.userNotify} />
                  </EB>
                ) : null}
              </div>
            </LightBox>
          </>
        )}
      </>
    );
  }
}

export default User;
