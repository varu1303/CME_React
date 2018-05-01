import React from 'react';
import axios from 'axios';

class Organisation extends React.Component {

  state = {
    orgs: {
      phoneNumber: [],
      departments: [ 
        {
          phoneNumber: [],
          subscribed: [],
          events: []
        }
      ],
    }
  }

  componentDidMount() {
    axios.get('/cme/oneOrg/' + this.props.match.params.id)
      .then(data => {
        this.setState(() => {
          return {
            orgs: data.data.data
          }
        })
      })
      .catch(error => {
        console.log(error);
      })
  }

  goToDep = (depId) => {
    this.props.history.push('/dep/' + depId)
  }

  render() {
    return (
      <div>
        <h1>Organisation's Details</h1>
        <h2>Name: {this.state.orgs.name}</h2>
        <p>Address: {this.state.orgs.address}</p>
        <p>emailId: {this.state.orgs.emailId}</p>
        <p>Phone Numbers : {
          this.state.orgs.phoneNumber.map((number, i) => {
            return <span key={i}>{number} ,</span>
          })
        }
        </p>
        <p>Number of Departments: {this.state.orgs.departments.length}</p>
        <button onClick={() => {this.props.history.push('/addDep/' + this.props.match.params.id)}}>Add Department</button>
        {this.state.orgs.departments.length ? <h2>Departments</h2> : null }
        {
          this.state.orgs.departments.map((dep, i) => {
            return (
              <div key={i}>
                <p>Name: {dep.name}</p>
                <p>emailId: {dep.emailId}</p>
                <p>Phone Number: {
                  dep.phoneNumber.map((number, index) => {
                    return <span key={index}>{number} ,</span>
                  })
                }</p>
                <p>Number of events: {dep.events.length}</p>
                <p>Number of subscribers: {dep.subscribed.length}</p>
                <button onClick={() => {this.goToDep(dep._id)}}>See Department's details</button>
                <hr />
              </div>
            )
          })
        }
      </div>
    )
  }
}


export default Organisation;