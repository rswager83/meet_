import React, { Component } from "react";

class Event extends Component {
  state = {
    buttonExpanded: false, // 9
  };

  handleShowDetails() {
    this.setState({ buttonExpanded: !this.state.buttonExpanded }); // 10a & 11a
  }

  render() {
    return (
      // 1-7
      <div className="event">
        <div className="summary">{this.props.summary}</div>
        <div className="description">{this.props.description}</div>
        <div className="creator">{this.props.creator}</div>
        <div className="location">{this.props.location}</div>
        <div className="start">{this.props.start}</div>
        <div className="end">{this.props.end}</div>
        <button
          onClick={() => this.handleShowDetails()} // 10b & 11b
          className="btn-details" // 8
        >
          Details
        </button>
      </div>
    );
  }
}

export default Event;
