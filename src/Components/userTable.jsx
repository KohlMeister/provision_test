import React from 'react';
import trash from '../assets/trash.svg';
import edit from '../assets/edit.svg';
import * as firebase from 'firebase';
import * as _ from "underscore";
import EditUser from './editModal';
import {firebaseDB} from '../firebase.js';

class UserTable extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      users: this.props.users,
    }
  }

  componentDidMount() {
    // var users = [];
    // firebase.firestore().collection('users').get().then(
    //   snapshot => {
    //     snapshot.forEach(doc => {
    //       var data = doc.data();
    //       console.log(snapshot);
    //       users.push({
    //         id: doc.id,
    //         first_name: data.first_name,
    //         last_name: data.last_name,
    //         email: data.email
    //       });
    //     });
    //     this.setState({
    //       users: users
    //     })
    //   }
    // );
  }

  getRows = () => {
    const userRows = this.state.users.map((user) =>
      <tr>
        <td>{user.first_name}</td>
        <td>{user.last_name}</td>
        <td>{user.email}</td>
        <td><EditUser user={user}/><button className="btn" type="button" onClick={() => this.removeUser(user.id)}><img src={trash} alt="Delete" /></button></td>
      </tr>
    );
    return userRows;
  }

  removeUser = (id) => {
    firebase.firestore().collection('users').doc(id).delete();
    var newList = _.filter(this.state.users, function(user) {
      return user.id !== id
    });
    
    this.setState({
      users: newList
    });
  }

  render() {
    return (
      <div>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {this.getRows()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default UserTable;