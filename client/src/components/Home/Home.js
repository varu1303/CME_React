import React from 'react';
import axios from 'axios';
import moment from 'moment';

class HomePage extends React.Component {

  state = {
    events: []
  }

  componentDidMount() {
    axios.get('/cme/allEvents')
      .then(data => {
        this.setState(() => {
          return { events:  data.data.data}
        })
      })
  }
  
  render() {
    return (
      <div>
      <h2>Home Page</h2>
      {
        this.state.events.map((event, i) => {
          return (
            <div key={i}>
              <hr />
              <h3>Event {event.title}</h3>
              <h3>Department <span onClick={() => {this.props.history.push('/dep/' + event.depId)}}>{event.departmentName}</span> 
                  - Organisation <span onClick={() => {this.props.history.push('/org/' + event.orgId)}}>{event.organisationName}</span></h3>
      
              <p>Title: {event.title}</p>
              <p>From : {moment(event.fromDate).format("DDMMMMYYYY")}</p>
              <p>To: {moment(event.toDate).format("DDMMMMYYYY")}</p>
              {event.limitedSeats ? <p>'***HAS LIMITED SEATS***'</p> : <p>'***UNLIMITED SEATS***'</p>}
              <p>Seat Count : {event.seatCount}</p>
              <p>Fees: {event.fees}</p>
              <h3>POC</h3>
              {
                event.poc.map((contact, i) => {
                  return (
                    <div key={i}>
                      <p>{contact.name}</p>
                      <p>
                        Call him on - 
                          {
                            contact.phoneNumber.map((num, i) => {
                              return (
                                <span key={i}>
                                  {num}
                                </span>
                              )
                            })
                          }
                        | Email - 
                          {
                            contact.emailId.map((email, i) => {
                              return (
                                <span key={i}>
                                  {email}
                                </span>
                              )
                            })
                          }
      
                      </p>
                    </div>
                  )
                })
              }
              <hr />
            </div>
          )
        })
      }
      </div>
    )
  }
}

export default HomePage;