import React from 'react';
import axios from 'axios';
import moment from 'moment'



class Event extends React.Component {

  state = {
    title: '',
    orgId: '',
    organisationName: '',
    depId: '',
    departmentName: '',
    fromDate: '',
    toDate: '',
    limitedSeats: true,
    seatCount: 0,
    fees: '',
    credits: '',
    poc: [],
    timeTable: []
  }

  componentDidMount() {
    axios.get('/cme/event/' + this.props.match.params.eventId)
      .then(data => {
        let event = data.data.data;
        this.setState(() => {
          console.log(moment(event.fromDate).format("DDMMMMYYYY"))
          return {
            title: event.title,
            orgId: event.orgId,
            organisationName: event.organisationName,
            depId: event.depId,
            departmentName: event.departmentName,
            fromDate: event.fromDate,
            toDate: event.toDate,
            limitedSeats: event.limitedSeats,
            seatCount: event.seatCount,
            fees: event.fees,
            credits: event.credits,
            poc: event.poc,
            timeTable: event.timeTable
          }
        })
      })
      .catch(error => {
        console.log(error);
      })
  }
  render() {

    return (
      <div>
        <h1>Event {this.state.title}</h1>
        <h2>Department <span onClick={() => {this.props.history.push('/dep/' + this.state.depId)}}>{this.state.departmentName}</span> 
            - Organisation <span onClick={() => {this.props.history.push('/org/' + this.state.orgId)}}>{this.state.organisationName}</span></h2>

        <p>Title: {this.state.title}</p>
        <p>From : {moment(this.state.fromDate).format("DDMMMMYYYY")}</p>
        <p>To: {moment(this.state.toDate).format("DDMMMMYYYY")}</p>
        {this.state.limitedSeats ? <p>***HAS LIMITED SEATS***</p> : <p>***UNLIMITED SEATS***</p>}
        <p>Seat Count : {this.state.seatCount}</p>
        <p>Fees: {this.state.fees}</p>
        <hr />
        {
          this.state.poc.map((contact, i) => {
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
        {
          this.state.timeTable.map((part, i) => {
            return (
              <div key={i}>
                {
                  part.break ? <p>'**BREAK**'</p> : <p>{part.topic} - {part.speaker} - {part.startTime} : {part.endTime}</p>
                }
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default Event;