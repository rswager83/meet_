import React, { Component } from "react";

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32,
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    if (value > 0 && value <= 32) {
      return this.setState({ numberOfEvents: value });
    } else {
      return this.setState({ numberOfEvents: 32 });
    }
  };

  render() {
    return (
      <div className="numberOfEvents">
        <input
          type="number"
          id="default"
          className="default"
          value={this.state.numberOfEvents}
          onChange={this.handleInputChanged}
        />
      </div>
    );
  }
}

export default NumberOfEvents;
