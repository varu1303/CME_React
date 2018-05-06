import React from 'react';
import axios from 'axios';

class Department extends React.Component {

  state = {
    department: {
      name: '',
      orgName: '',
      orgId: '',
      emailId: '',
      events: [],
      subscribed: []      
    }
  }

  componentDidMount() {
    axios.get('/cme/oneDep/' + this.props.match.params.depId)
      .then(data => {
        let dep = data.data.data;
        this.setState(() => {
          return {
            department : {
              name: dep.name,
            orgId: dep.orgId,
            orgName: dep.organisationName,
            events: dep.events,
            subscribed: dep.subscribed
            }
          }
        })
      })
      .catch(error => {
        console.log('Error', error);
      })
  }

  render() {

    return (
      <div>
        <h1>Department's Page</h1>
        <h2>{this.state.department.name} of {this.state.department.orgName}</h2>
        <p>Number of subscribers {this.state.department.subscribed.length}</p>
        <p>Number of events {this.state.department.events.length}</p>
        <button onClick={() => {
          this.props.history.push('/addEvent/' + this.state.department.orgId + '/' + this.props.match.params.depId)
        }}>Add an Event</button>
        <hr />
        {
          this.state.department.events.map((event, i) => {
            return (
              <div key={i}>
                <p>{event.title} in {event.address.city}</p>
                <button onClick={() => {
                  this.props.history.push('/event/' + event._id)
                }}>See Details</button>
                <hr />
              </div>
            )
          })
        }
      </div>
    )
  }
}
export default Department;