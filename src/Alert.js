import React, { Component } from "react";

class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null;
  }

  getStyle = () => {
    return {
      color: this.color,
    };
  };

  render() {
    return (
      <div className="Alert">
        <p style={this.getStyle()}>{this.props.text}</p>
      </div>
    );
  }
}

class InfoAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = "white";
  }
}

class ErrorAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = "red";
  }

  getStyle = () => {
    return {
      color: this.color,
      fontStyle: "italic",
    };
  };
}

class OffLineAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = "yellow";
  }
}
export { ErrorAlert };
export { InfoAlert };
export { OffLineAlert };
