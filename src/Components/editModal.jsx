import React from 'react';
import ReactDOM from 'react-dom';
import Modal from "react-bootstrap/Modal";
import edit from '../assets/edit.svg';
import { useState } from 'react';
import { Formik, ErrorMessage } from 'formik';
import * as firebase from 'firebase';
import Button from 'react-bootstrap/Button';

function EditUserModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="btn" type="button" onClick={handleShow}><img src={edit} alt="Edit" /></button>
      <Formik
        initialValues={{ firstName: props.user.first_name, lastName: props.user.last_name}}
        validate={ values => {
          const errors = {};
          if (!values.firstName) {
            errors.firstName = 'Required';
          } else if (values.firstName.length < 3 || values.firstName.length > 25) {
            errors.firstName = 'Must be between 3 and 25 characters'
          } else if (values.lastName.length !== 0 && (values.lastName.length < 2 || values.lastName.length > 30)) {
            errors.lastName = 'Must be between 2 and 30 characters'
          }

          return errors;
        }}
        onSubmit={(values, {setSubmitting}) => {
          var user = {
            id: props.user.id,
            first_name: values.firstName,
            last_name: values.lastName,
            email: props.user.email
          }
          firebase.firestore().collection('users').doc(props.user.id).set(user).catch(function(error) {
            console.error('Error writing new message to database', error);
          });

          props.callback(user);
          setShow(false);
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
              <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form id="add-user" onSubmit={handleSubmit}>
              <label for="firstName">First Name</label>
              <input className="form-control" type="name" name="firstName" onChange={handleChange} onBlur={handleBlur} value={values.firstName}></input>
              <div><ErrorMessage name="firstName" component="small" className="text-danger" /></div>
              <label for="lastName">Last Name</label>
              <input className="form-control" type="name" name="lastName" onChange={handleChange} onBlur={handleBlur} value={values.lastName}></input>
              <div><ErrorMessage name="lastName" component="small" className="text-danger" /></div>
            </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit" form="add-user">
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </Formik>
    </>
  );
}

class EditUser extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <EditUserModal 
        user={this.props.user} 
        callback={this.props.callback}
      />
    );
  }
}

export default EditUser;