import React, { Component } from "react";
import "./App.css";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import { extractLocations, getEvents } from "./api"; // i-3
import "./nprogress.css";

class App extends Component {
  state = {
    events: [], // add state for test: i-1
    locations: [], // add state for test: i-2
  };

  // loads events when the app loads
  componentDidMount() {
    getEvents().then((events) => {
      this.setState({ events, locations: extractLocations(events) });
    });
  }

  // You’ll use this boolean to update the state only if this.mounted is true
  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location) => {
    getEvents().then((events) => {
      // const locationEvents = events.filter(
      //   (event) => event.location === location
      // );
      const locationEvents = // i-4
        location === "all"
          ? events
          : events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents,
      });
    });
  };

  render() {
    return (
      <div className="App">
        <CitySearch
          locations={this.state.locations} // pass state to CitySearch as a prop
          updateEvents={this.updateEvents} // i-3 method passed as a prop to CitySearch so that you can call it inside handleItemClicked
        />
        <EventList
          events={this.state.events} // pass state to EventList as a prop of events
        />
        <NumberOfEvents />
      </div>
    );
  }
}

export default App;
