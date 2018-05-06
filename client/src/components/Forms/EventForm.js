import React from 'react';
import axios from 'axios';

class EventForm extends React.Component {

  state = {
    orgId: '',
    depId: '',
    title: '',
    address: {
      institute: '',
      area: '',
      city: '',
      state: '',
      country: ''
    },
    departmentName: '',
    organisationName: '',
    fromDate: '',
    toDate: '',
    poc: [{
      name: '',
      phoneNumber: [
        ],
      emailId: [
        ]
      }],
    credits: '',
    fees: '',
    limitedSeats: false,
    seatCount: 0,
    timeTable: [{
      startTime: '',
      endTime: '',
      topic: '',
      speaker: '',
      break: false
    }]
  }

  componentDidMount() {
    this.setState(() => {
      return {
        orgId: this.props.match.params.orgId,
        depId: this.props.match.params.depId
      }
    })

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


    axios.get('/cme/nameDep/' + this.props.match.params.depId)
    .then(data => {
      this.setState(() => {
          return {
            departmentName: data.data.data
          }
        })
      })
      .catch(error => {
        console.log(error);
      })
  }

  updateEventData = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    this.setState((prevState) => {
      return {
          [name]: value
      }
    })
  }

  updateEventAdd = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState((prevState) => {
      return prevState.address[name] = value
    })    
  }

  updateEventPOC = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    this.setState((prevState) => {
      if (name === 'name') {
        return prevState.poc[0][name] = value
      }else {
        return prevState.poc[0][name] = [value]
      }

    })    
  }

  addLesson = () => {
    this.setState((prevState) => {
      prevState.timeTable.push({
        startTime: '',
        endTime: '',
        topic: '',
        speaker: '',
        break: false
      })

      return prevState;
    })
  }

  updateTimeTable = (i, name, value) => {
    this.setState((prevState) => {
      prevState.timeTable[i][name] = value
      
      return prevState;
    })
  }

  saveEvent = (event) => {
    event.preventDefault();
    delete this.state['0'];

    let config = {
      headers: {
        'x-auth': localStorage.getItem('cme_token')
      }
    }
    axios.post('/da/newEvent', this.state, config)
      .then(data => {
        console.log(data);
        this.props.history.push('/dep/' + this.props.match.params.depId);
      })
      .catch(error => {
        console.log('Error', error);
      })
  }

  render() {
    return (
      <div>
        <h1>Event Form</h1>
        <form onSubmit={this.saveEvent}>
          <input name="title" type="text" placeholder="Event Title" onChange={this.updateEventData} />
          <br />
          <input name="institute" type="text" placeholder="Institute" onChange={this.updateEventAdd} />
          <br />
          <input name="area" type="text" placeholder="Address" onChange={this.updateEventAdd} />
          <br />
          <input name="city" type="text" placeholder="city" onChange={this.updateEventAdd} />
          <br />
          <input name="state" type="text" placeholder="state" onChange={this.updateEventAdd} />
          <br />
          <input name="country" type="text" placeholder="Country" onChange={this.updateEventAdd} />
          <br />
          <input name="departmentName" type="text" placeholder="Department" value={this.state.departmentName} />
          <br />
          <input name="organisationName" type="text" placeholder="Organisation" value={this.state.organisationName} />
          <br />
          <label>From Date:</label>
          <input name="fromDate" type="date" onChange={this.updateEventData} />
          <br />
          <label>To Date:</label>
          <input name="toDate" type="date" onChange={this.updateEventData} />
          <br />
          <p>POC</p>
          <input name="name" type="text" placeholder="Name" onChange={this.updateEventPOC} />
          <br />
          <input name="phoneNumber" type="tel" placeholder="telephone" onChange={this.updateEventPOC} />
          <br />
          <input name="emailId" type="email" placeholder="email" onChange={this.updateEventPOC} />
          <br />
          <input name="credits" type="number" placeholder="credits" onChange={this.updateEventData} />
          <br />
          <input name="fees" type="number" placeholder="fees" onChange={this.updateEventData} />
          <br />
          <input name="seatCount" type="number" placeholder="Seat Count" onChange={this.updateEventData} />
          <br />
          <p>Time Table</p>
          {
            this.state.timeTable.map((lesson, i) => {
              return (
                <div key={i}>
                  <br />
                  <input name="startTime" type="text" placeholder="Start time" onChange={(event) => {this.updateTimeTable(i, event.target.name, event.target.value)}} />
                  <br />
                  <input name="endTime" type="text" placeholder="End time" onChange={(event) => {this.updateTimeTable(i, event.target.name, event.target.value)}} />
                  <br />
                  <input name="speaker" type="text" placeholder="Speaker" onChange={(event) => {this.updateTimeTable(i, event.target.name, event.target.value)}} />
                  <br />
                  <input name="topic" type="text" placeholder="Topic" onChange={(event) => {this.updateTimeTable(i, event.target.name, event.target.value)}} />
                </div>
              )
            })
          }
          <p onClick={this.addLesson}>Add Lesson</p>
          <br />
          <button type="submit">Submit Event</button>
        </form>
      </div>
    )
  }
}

export default EventForm;