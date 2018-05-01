import React from 'react';
import { NavLink } from 'react-router-dom';


class Header extends React.Component {

  authenticated = localStorage.getItem('cme_token') ? true : false;

  logout = () => {
    localStorage.removeItem('cme_token');
    localStorage.removeItem('cme_payload');
  }

  componentDidMount() {
    if (localStorage.getItem('cme_token')) {
      this.authenticated = true;
    }else {
      this.authenticated = false;
    }
  }

  componentWillUpdate() {
    if (localStorage.getItem('cme_token')) {
      this.authenticated = true;
    }else {
      this.authenticated = false;
    }
  }

  render() {
    return (
    <div>
      <nav>
        <NavLink to="/" exact>Home</NavLink>
        {this.authenticated ? null : <NavLink to="/login">Login</NavLink>}
        {this.authenticated ? <NavLink to="/profile">Profile</NavLink> : null}
        {this.authenticated ? <NavLink to="/logout" onClick={this.logout}>Logout</NavLink> : null}
      </nav>
    </div>
    )
  }
}

export { Header };
