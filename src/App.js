import React from 'react';
import * as firebase from 'firebase';
import Root from './Components/root';
// import ProvisionNavBar from './Components/navbar';
// import TableTest from './Components/tableTest';
// import AddUser from './Components/addUser';

class App extends React.Component {
  // constructor(props) {
  //   super(props);

  //   // this.state = {
  //   //   users: this.getUsers()
  //   // }
  // }

  // getUsers() {
  //   var firebaseUsers = [];
  //   firebase.firestore().collection('users').get().then(
  //     snapshot => {
  //       snapshot.forEach(doc => {
  //         var data = doc.data();
  //         firebaseUsers.push({
  //           id: doc.id,
  //           first_name: data.first_name,
  //           last_name: data.last_name,
  //           email: data.email
  //         });
  //       });
  //       this.setState({
  //         users: firebaseUsers
  //       })
  //     }
  //   );
  //   return firebaseUsers;
  // }

  // addUserCallback(user) {
  //   this.setState({
  //     users: user
  //   })
  // }

  render() {
    return (
      <div>
        <Root />
        {/* <ProvisionNavBar />
        <AddUser 
          callback={this.addUserCallback}
        />
        <TableTest 
          users={this.state.users}
        /> */}
      </div>
    );
  }
}

export default App;
