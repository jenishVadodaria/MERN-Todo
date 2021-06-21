import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import "../index.css";

class Form extends Component {
  initialState = {
    name: "",
    job: "",
  };

  state = this.initialState;

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  submitForm = (event) => {
    event.preventDefault(); // Prevents loading page..

    this.props.handleSubmit(this.state);
    this.setState(this.initialState);
  };

  render() {
    const { name, job } = this.state;

    return (
      <form>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={this.handleChange}
        />
        <label htmlFor="job">Activity</label>
        <input
          type="text"
          name="job"
          id="job"
          value={job}
          onChange={this.handleChange}
        />
        <div className="Submit-btn">
          <Button variant="contained" color="primary" onClick={this.submitForm}>
            Submit
          </Button>
        </div>
      </form>
    );
  }
}

export default Form;
