import React from 'react';
import * as firebase from 'firebase';
import ProvisionNavBar from './navbar';
import UserTable from './userTable';
import AddUser from './addUser';

class Root extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: this.getUsers(),
      editable: false,
      creating: true
    }
  }

  getUsers() {
    var firebaseUsers = [];
    firebase.firestore().collection('users').get().then(
      snapshot => {
        snapshot.forEach(doc => {
          var data = doc.data();
          firebaseUsers.push({
            id: doc.id,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email
          });
        });
        this.setState({
          users: firebaseUsers.sort((a, b) => (a.last_name > b.last_name ? 1 : -1))
        })
      }
    );
    return firebaseUsers;
  }

  addUserCallback = (user) => {
    this.setState({
      users: user
    });
  }

  editabilityCallback = (editable) => {
    this.setState({
      editable: editable
    });
  }

  //TODO resize trash / row, refresh table

  render() {
    return (
      <React.Fragment>
        <ProvisionNavBar />
        <AddUser 
          callback={this.addUserCallback}
        />
        <UserTable 
          users={this.getUsers()}
          editable={this.state.editable}
        />
      </React.Fragment>
    );
  }
}

export default Root;