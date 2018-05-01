import React from 'react';
import axios from 'axios';

class Department extends React.Component {

  componentDidMount() {
    axios.get('/cme/oneDep/' + this.props.match.params.depId)
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log('Error', error);
      })
  }

  render() {

    return (
      <div>
        <h1>Department's Page</h1>
      </div>
    )
  }
}
export default Department;