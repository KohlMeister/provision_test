import React from 'react';
import * as firebase from 'firebase';

class AddUser extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      users: []
    }
  }

  addUser() {
    var user = {
      id: 'abcd-iamaguid',
      first_name: 'Johnny',
      last_name: 'Goodman',
      email: 't@m.ca'
    }
    firebase.firestore().collection('users').add(user).catch(function(error) {
      console.error('Error writing new message to database', error);
    });
    this.props.callback(user);
  }

  render() {
    return (
      <div style={{padding: "5px"}}>
        <button type="button" className="btn btn-primary" onClick={() => this.addUser()}>Add User</button>
      </div>
    )
  }
}

export default AddUser;