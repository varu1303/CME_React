import React from 'react';
import axios from 'axios';


class DepForm extends React.Component {

  state = {
    name: '',
    emailId: '',
    orgId: this.props.match.params.orgId
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
          <input 
            type="email"
            name="emailId"
            placeholder="Email Id"
            value={this.state.emailId}
            onChange={this.updateState}
          />
          <button type="submit">SUBMIT</button>
        </form>
      </div>
    )
  }
}

export default DepForm;