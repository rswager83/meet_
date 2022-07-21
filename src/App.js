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
    numberOfEvents: 12,
    locationSelected: "all",
  };

  // loads events when the app loads
  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        let sliceNumber = this.state.numberOfEvents;
        this.setState({
          locations: extractLocations(events),
          events: events.slice(0, sliceNumber),
        });
      }
    });
  }

  // You’ll use this boolean to update the state only if this.mounted is true
  componentWillUnmount() {
    this.mounted = false;
  }

  /* updateEvents = (location) => {
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
  }; */

  updateEvents = (location, maxNumberEvents) => {
    if (maxNumberEvents === undefined) {
      maxNumberEvents = this.state.numberOfEvents;
    } else this.setState({ numberOfEvents: maxNumberEvents });
    if (location === undefined) {
      location = this.state.locationSelected;
    }
    getEvents().then((events) => {
      let locationEvents =
        location === "all"
          ? events
          : events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents.slice(0, maxNumberEvents),
        numberOfEvents: maxNumberEvents,
        locationSelected: location,
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
        <NumberOfEvents
          events={this.state.events}
          updateEvents={this.updateEvents}
        />
      </div>
    );
  }
}

export default App;
