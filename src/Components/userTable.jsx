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
  }

  getRows = () => {
    const userRows = this.props.users.map((user) =>
      <tr key={user.id}>
        <td>{user.first_name}</td>
        <td>{user.last_name}</td>
        <td>{user.email}</td>
        <td><EditUser callback={this.props.editCallback} user={user}/><button className="btn btn-sm" style={{padding: "0px"}} type="button" onClick={() => this.props.removeCallback(user)}><img src={trash} alt="Delete" /></button></td>
      </tr>
    );
    return userRows;
  }

  render() {
    return (
      <div>
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr className="thead-dark">
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