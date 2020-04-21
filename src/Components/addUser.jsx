import React from 'react';
import * as firebase from 'firebase';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { Formik, ErrorMessage } from 'formik';
import { v4 as uuidv4 } from 'uuid';

function AddUserModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Contact
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
          } else if (props.emails.includes(values.email)) {
            errors.email = 'Email already exists in contacts';
          }

          return errors;
        }}
        onSubmit={(values, {setSubmitting, resetForm, setStatus}) => {
          var user = {
            id: uuidv4(),
            first_name: values.firstName,
            last_name: values.lastName,
            email: values.email
          }
          firebase.firestore().collection('users').doc(user.id).set(user).catch(function(error) {
            console.error('Error writing new message to database', error);
          });

          props.callback(user);

          resetForm({});
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
              <Modal.Title>Add Contact</Modal.Title>
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
                Add Contact
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
  }

  render() {
    return (
      <div style={{padding: "5px 0px"}}>
        <AddUserModal 
          emails={this.props.emails}
          callback={this.props.callback}
        />
      </div>
    )
  }
}

export default AddUser;