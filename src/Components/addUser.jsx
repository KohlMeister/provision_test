import React from 'react';
import * as firebase from 'firebase';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { Formik, ErrorMessage } from 'formik';

function AddUserModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add User
      </Button>
      <Formik
        initialValues={{ firstName: "", lastName: "", email: ""}}
        validate={ values => {
          const errors = {};
          if (!values.firstName) {
            errors.firstName = 'Required';
          } else if (values.firstName.length < 3 || values.firstName.length > 25) {
            errors.firstName = 'Must be between 3 and 25 characters'
          } else if (values.lastName.length !== 0 && (values.lastName.length < 2 || values.lastName.length > 30)) {
            errors.lastName = 'Must be between 2 and 30 characters'
          } else if (!values.email) {
            errors.email = 'Required';
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
          } else if (false) { //TODO
            errors.email = 'Email already exists in contacts';
          }

          return errors;
        }}
        onSubmit={(values, {setSubmitting}) => {
          var user = {
            id: 'abcd-iamaguid',
            first_name: values.firstName,
            last_name: values.lastName,
            email: values.email
          }
          firebase.firestore().collection('users').add(user).catch(function(error) {
            console.error('Error writing new message to database', error);
          });

          setSubmitting(false);
          setShow(false);
          // this.props.callback(user);
          // setTimeout(() => {
          //   alert(JSON.stringify(values, null, 2));
          //   setSubmitting(false);
          // }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form id="add-user" onSubmit={handleSubmit}>
              <label for="firstName">First Name</label>
              <input className="form-control" type="name" name="firstName" onChange={handleChange} onBlur={handleBlur} value={values.firstName}></input>
              <div><ErrorMessage name="firstName" component="small" className="text-danger" /></div>
              <label for="lastName">Last Name</label>
              <input className="form-control" type="name" name="lastName" onChange={handleChange} onBlur={handleBlur} value={values.lastName}></input>
              <div><ErrorMessage name="lastName" component="small" className="text-danger" /></div>
              <label for="email">Email</label>
              <input className="form-control" type="email" name="email" onChange={handleChange} onBlur={handleBlur} value={values.email}></input>
              <div><ErrorMessage name="email" component="small" className="text-danger" /></div>
            </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit" form="add-user">
                Add User
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </Formik>
      
    </>
  );
}

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
        <AddUserModal />
      </div>
    )
  }
}

export default AddUser;