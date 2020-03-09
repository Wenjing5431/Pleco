import "../css/Header.css";
import React from "react";
import { Link, withRouter } from "react-router-dom";
import Auth from "./Auth";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.renderLogout = this.renderLogout.bind(this);
  }

  renderLogout = () => {
    Auth.logout(() => {
      this.props.history.push({
        pathname: "/"
      });
    });
  };

  render() {
    const { username } = this.props;
    const authenticated = Auth.isAuthenticated();

    return (
      <div className="ui secondary fixed pointing menu header">
        {authenticated ? (
          <Link to="/dashboard" className="item">
            <i className="fas fa-compass header-icon" />
            Personal Learning Compass
          </Link>
        ) : (
          <Link to="/" className="item">
            <i className="fas fa-compass header-icon" />
            Personal Learning Compass
          </Link>
        )}

        <div className="right menu">
          <a
            href="https://github.com/Wenjing5431/PLB_Capstone"
            target="_blank"
            rel="noopener noreferrer"
            className="item"
          >
            Github
          </a>

          {authenticated ? (
            <span className="header-span">
              <p className="item">{username}</p>
              <button className="item" onClick={this.renderLogout}>
                Logout
              </button>
            </span>
          ) : (
            <span className="header-span">
              <Link to="" className="item">
                About Us
              </Link>
              <Link to="/login" className="item login">
                Get Started
              </Link>
            </span>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
