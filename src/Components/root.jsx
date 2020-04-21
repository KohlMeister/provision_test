import React from 'react';
import * as firebase from 'firebase';
import ProvisionNavBar from './navbar';
import UserTable from './userTable';
import AddUser from './addUser';
import * as _ from 'underscore';

class Root extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
    }
  }

  componentDidMount() {
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
  }

  getEmails = () => {
    var emails = [];
    _.forEach(this.state.users, (user) => {
      emails.push(user.email);
    });

    return emails;
  }

  addUserCallback = (user) => {
    this.setState({
      users: this.state.users.concat(user)
    });
  }

  editUserCallback = (editedUser) => {
    var users = this.state.users;
    _.forEach(users, (user) => {
      if (editedUser.id === user.id) {
        user.first_name = editedUser.first_name;
        user.last_name = editedUser.last_name;
      }
    });

    this.setState({
      users: users
    });
  }

  removeUserCallback = (removedUser) => {
    firebase.firestore().collection('users').doc(removedUser.id).delete();
    var newList = _.filter(this.state.users, function(user) {
      return user.id !== removedUser.id
    });
    
    this.setState({
      users: newList
    });
  }

  render() {
    return (
      <React.Fragment>
        <ProvisionNavBar />
        <AddUser
          emails={this.getEmails()}
          callback={this.addUserCallback}
        />
        <UserTable 
          users={this.state.users}
          editCallback={this.editUserCallback}
          removeCallback={this.removeUserCallback}
        />
      </React.Fragment>
    );
  }
}

export default Root;