import React from 'react';
import axios from 'axios';
import { isError } from 'util';
import { Redirect } from 'react-router-dom';

class LoginPage extends React.Component {

  authenticated;

  state = {
    emailId: "",
    password: "",
    validForm: false
  }

  componentWillMount() {
    this.authenticated = localStorage.getItem('cme_token') ? true : false;
  }
  // A valid Email id and Password of more than 6 characters required
  validateForm = () => {
    if (this.state.emailId && this.state.password) {
      if (this.state.password.length > 5) {
        var re = /\S+@\S+\.\S+/;
        this.setState(() => ({
          validForm: re.test(this.state.emailId)  
        }))
      }
    }else {
      this.setState(() => ({
        validForm: false  
      }))     
    }
  }

  // Update state on change on value in input fields
  handlechange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    this.setState(() => ({
      [name]: value
    }),
  () => {
    this.validateForm();
  })
  }
  
  login = (event) => {
    event.preventDefault();
    axios.post('/cme/login', {
      "emailId": this.state.emailId,
      "password": this.state.password
    })
    .then( (response) => {
      const payload = JSON.parse(window.atob(response.data.data.split('.')[1]));
      localStorage.setItem('cme_token', response.data.data);
      localStorage.setItem('cme_payload', JSON.stringify(payload));
      this.props.history.push('/profile/' + payload.data.role)
    })
    .catch( (error) => {
      console.log(error);
    });
  }  

  render() {
    return (
      <div>
        {this.authenticated ? <Redirect to="/" /> : null }
        <h1>Login Form</h1>
        <form onSubmit={this.login}>
          <label htmlFor="emailId">Email ID</label>
          <input
            type="email"
            name="emailId" 
            placeholder="Enter Email..."
            value={this.state.emailId}
            onChange={this.handlechange}
          />
          <br />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password" 
            placeholder="Enter Password..."
            value={this.state.password}
            onChange={this.handlechange}
          />
          <br />
          <button type="submit" disabled={!this.state.validForm}>Login</button>    
        </form>
      </div>
    )
  }
}

export default LoginPage;