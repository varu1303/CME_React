import React from 'react';
import axios from 'axios';


class DepForm extends React.Component {

  state = {
    name: '',
    emailId: '',
    orgId: this.props.match.params.orgId,
    organisationName: ''
  }

  componentDidMount() {
    console.log(this.props.match.params.orgId);
    axios.get('/cme/nameOrg/' + this.props.match.params.orgId)
      .then(data => {
        this.setState(() => {
          return {
            organisationName: data.data.data
          }
        })
      })
      .catch(error => {
        console.log(error);
      })
  }

  updateState = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      }
    })
  }

  addDep = (event) => {
    event.preventDefault();
    let config = {
      headers: {
        'x-auth': localStorage.getItem('cme_token')
      }
    }
    axios.post('/oa/newDep', this.state, config)
      .then(data => {
        this.props.history.push('/org/' + this.props.match.params.orgId);
      })
      .catch(error => {
        console.log('Error', error);
      })
  }

  render() {
    return (
      <div>
        <h1>Enter Department Details</h1>
        <form onSubmit={this.addDep}>
          <input 
            type="text"
            name="name"
            placeholder="name"
            value={this.state.name}
            onChange={this.updateState}
          />
          <br />
          <input 
            type="email"
            name="emailId"
            placeholder="Email Id"
            value={this.state.emailId}
            onChange={this.updateState}
          />
          <br />
          <input 
            type="text"
            name="organisationName"
            placeholder="Organisations name"
            value={this.state.organisationName}
          />        
          <button type="submit">SUBMIT</button>
        </form>
      </div>
    )
  }
}

export default DepForm;