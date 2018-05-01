import React from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';


import SApage from './SA/SApage';

class ProfilePage extends React.Component {

  state = {
    Organisations: []
  }
  role = JSON.parse(localStorage.getItem('cme_payload')).data.role;

  componentDidMount() {
    axios.get('/cme/allOrgs')
      .then((data) => {
        this.setState(() => ({
          Organisations: data.data.data
        }))
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    return (
      <div>
        <h2>Profile</h2>
        <h3>Role : {this.role} </h3>
        <Route to={this.props.match.url + '/SA'} component={(props) => <SApage Organisations={this.state.Organisations}/>}/>
      </div>
    )
  }
}



export default ProfilePage;