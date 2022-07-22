import React, { Component } from "react";

class Event extends Component {
  state = {
    buttonExpanded: false, // 9
  };

  handleShowDetails() {
    this.setState({ buttonExpanded: !this.state.buttonExpanded }); // 10a & 11a
  }

  render() {
    console.log(this.props.event);
    return (
      // 1-7
      <div className="event">
        <div className="summary">{this.props.event.summary}</div>
        <div className="description">{this.props.event.description}</div>
        <div className="creator">{this.props.event.creator.email}</div>
        <div className="location">{this.props.event.location}</div>
        <div className="start">{this.props.event.start.dateTime}</div>
        <div className="end">{this.props.event.end.dateTime}</div>
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
