import React from 'react';
import * as firebase from 'firebase';

class EditButton extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      editable: false
    }
  }

  toggleEditability() {
    if (this.state.editable === false) {
      this.setState({ 
        editable: true
      });
    }

    this.setState({ 
      editable: false
    });

    this.props.callback(this.state.editable);
  }

  render() {
    return (
      <div>
        <button type="button" className="btn btn-secondary" onClick={() => this.toggleEditability()}>Edit</button>
      </div>
    )
  }
}

export default EditButton;