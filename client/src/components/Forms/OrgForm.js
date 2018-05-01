import React from 'react';
import axios from 'axios';


class OrgForm extends React.Component {

  state = {
    name: '',
    address: '',
    emailId: '',
    phoneNumber: [''],
    phoneCount: 1
  }

  addPhone = () => {
    this.setState((prevState) => {
      console.log('check', prevState);
      return {
        phoneNumber: prevState.phoneNumber.push(''),
        phoneCount: prevState.phoneCount + 1
      }
    })
  }


  updateState = (event) => {
    let name = event.target.name;
    let value = event.target.value;

      this.setState(() => ({
        [name]: value
      }))
  }

  updatePhone = (event, i) => {
     let phoneNos = this.state.phoneNumber;
     phoneNos[i] = event.target.value;
    this.setState(() => {
      return {
        phoneNumber: phoneNos   
      }
    })
  }

  saveOrg = (event) => {
    event.preventDefault();
    let {phoneCount, ...body} = this.state;
    let config = {
      headers: {
        'x-auth': localStorage.getItem('cme_token')
      }
    }
    axios.post('/sa/neworg', body, config)
      .then(data => {
        console.log(this.props);
        this.props.history.push('/profile/SA');
      })
      .catch(error => {
        console.log('Error', error);
      })

  }

  render() {
    return (
      <div>
        <h1>Add Organisation</h1>
        <form onSubmit={this.saveOrg}>
          <input name="name" 
                type="text" 
                value={this.state.name} 
                placeholder="Name" 
                onChange={this.updateState}/>
          <br />
          <input name="address"
                type="text"
                value={this.state.address}
                placeholder="address"
                onChange={this.updateState}/>
          <br />
          <input name="emailId"
                type="email" 
                value={this.state.emailId} 
                placeholder="email" 
                onChange={this.updateState}/>
          <br />
          {
            this.state.phoneNumber.map((no, i) => {
              return (<div key={i}>
                <input name={'phoneNumber' + i}
                type="tel"
                value={this.state.phoneNumber[i]}
                placeholder="Phone number" 
                onChange={(event) => {this.updatePhone(event, i)}}/>
              </div>)
            })
          }
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}


export default OrgForm;