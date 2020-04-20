import React from 'react';
import * as firebase from 'firebase';
import ProvisionNavBar from './navbar';
import UserTable from './userTable';
import AddUser from './addUser';
import EditButton from './editButton';
import SaveButton from './saveButton';
import Modal from './stupidModal';

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
          users: firebaseUsers
        })
      }
    );
    return firebaseUsers;
  }

  startCreateEventHandler = () => {
    this.setState({ creating: true });
  };

  modalConfirmHandler = () => {
    this.setState({ creating: false });
  };

  modalCancelHandler = () => {
    this.setState({ creating: false });
  };

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

  //TODO sort users, resize trash, refresh table

  render() {
    return (
      <React.Fragment>
        {this.state.creating && (
          <Modal
            title="Add Event"
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.modalConfirmHandler}
          >
            <p>Modal Content</p>
          </Modal>
        )}
        <ProvisionNavBar />
        <div className="events-control">
          <p>Share your own Events!</p>
          <button className="btn" onClick={this.startCreateEventHandler}>
            Create Event
          </button>
        </div>
        <AddUser 
          callback={this.addUserCallback}
        />
        {/* {!this.state.editable ? <EditButton callback={this.editabilityCallback} /> : <SaveButton />} */}
        <UserTable 
          users={this.getUsers()}
          editable={this.state.editable}
        />
      </React.Fragment>
    );
  }
}

export default Root;