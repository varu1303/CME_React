import React from 'react';
import { Redirect } from 'react-router-dom';

class SApage extends React.Component {

  state = {
    toOrgForm: false,
    getOneOrg: false,
    ToId: ''
  }

  goToOrg = (id) => {
    this.setState(() => {
      return {
        getOneOrg: true,
        ToId: id
      }
    })
  }

  reroute = () => {
    this.setState(() => ({ toOrgForm: true }))
  }

  render() {
    return (<div>
      {this.state.getOneOrg ? <Redirect from="/profile/SA" to={'/org/' + this.state.ToId} /> : null}
      {this.state.toOrgForm ? <Redirect from="/profile/SA" to="/addOrg" /> : null}
      <button onClick={this.reroute}>Add Organisation</button>
      <p>{this.props.Organisations.length} Organisations</p>
      {
        this.props.Organisations.map((org) => {
          return (
            <div key={org._id}>
              <h2>{org.name}</h2>
              <p>{org.address}</p>
              <p>Number of Departments: {org.departments.length}</p>
              <button onClick={() => { this.goToOrg(org._id) } }>See Details</button>
              <br />
              <button>Delete Organisation</button>
              <hr />
            </div>
          )
        })
      }
    </div>)
  }
}

export default SApage;