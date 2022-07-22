import React from "react";
import { shallow, mount } from "enzyme";
import App from "../App";
import EventList from "../EventList";
import CitySearch from "../CitySearch";
import NumberOfEvents from "../NumberOfEvents";
import { mockData } from "../mock-data";
import { extractLocations, getEvents } from "../api"; // i-3

describe("<App /> component", () => {
  let AppWrapper;
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });

  test("render list of events", () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  test("render CitySearch", () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });

  test("render number of events", () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });
});

// integration testing: Creating a new scope to seperate unit tests and integration tests
describe("<App /> integration", () => {
  // Making sure that EventList gets events as a prop from App, where it will be defined by state
  // The test will fail because this.props.events in the EventList.js file is undefined(not passed yet)
  // To pass test: create events state in the App component and pass events state to the EventList component as a prop of events
  // Test: i-1
  test('App passes "events" state as a prop to EventList', () => {
    const AppWrapper = mount(<App />);
    const AppEventsState = AppWrapper.state("events");
    expect(AppEventsState).not.toEqual(undefined);
    expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
    AppWrapper.unmount();
  });

  // The test is almost identical to test i-1; to pass, go thru the same route as i-1
  // Test: i-2
  test('App passes "locations" state as a prop to CitySearch', () => {
    const AppWrapper = mount(<App />);
    const AppLocationsState = AppWrapper.state("locations");
    expect(AppLocationsState).not.toEqual(undefined);
    expect(AppWrapper.find(CitySearch).props().locations).toEqual(
      AppLocationsState
    );
    AppWrapper.unmount();
  });

  // Test involves checking whether clicking on one of the suggestions will display the correct list of events for the selected city
  // Problem divided into two pieces: if a user clicked on a specific city, only events from that city should be listed and second, if a user clicked on "see all cities," all events should be listed
  // Before adding the test, make sure to import both extractLocations and mockData into your “App.test.js” file
  // After fail: It fails because there’s no such thing as getEvents anywhere in your code ~ Open your “api.js” file and import mockData from the “mock-data.js” file and then export const getEvents = async () => {return mockData;};
  // Next import { extractLocations, getEvents } from '../api' on this file;
  // Click takes place in CitySearch component, not in the App component. To change the state of events in the App component: Create a method in App that changes the events state, Pass this new method to CitySearch and then Call the new method when an item is clicked, in other words, inside handleItemClicked in CitySearch.js
  // Then define a new method in “App.js” and name it updateEvents
  // And simply pass an empty function (updateEvents={() => { }}) into it by way of the shallow rendering API (more specifically, in the line where you declared CitySearchWrapper in the beforeAll section in “CitySearch.test.js”)
  // Test: i-3
  test("get list of events matching the city selected by the user", async () => {
    const AppWrapper = mount(<App />);
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    const locations = extractLocations(mockData);
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents); //
    const allEvents = await getEvents(); //
    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions = CitySearchWrapper.state("suggestions");
    const selectedIndex = Math.floor(Math.random() * suggestions.length);
    const selectedCity = suggestions[selectedIndex];
    await CitySearchWrapper.instance().handleItemClicked(selectedCity);
    // const allEvents = await getEvents();
    // const eventsToShow = allEvents.filter(
    //   (event) => event.location === selectedCity
    // );
    const eventsToShow = allEvents
      .filter((event) => event.location === selectedCity)
      .slice(0, 32);
    NumberOfEventsWrapper.setState({ eventsNumber: 32 });
    AppWrapper.setState({ locationSelected: selectedCity, eventsLength: 32 });
    expect(AppWrapper.state("events")).toEqual(eventsToShow);
    AppWrapper.unmount();
  });

  // Test: i-4
  test('get list of all events when user selects "see all cities"', async () => {
    const AppWrapper = mount(<App />);
    const suggestionItems = AppWrapper.find(CitySearch).find(".suggestions li");
    await suggestionItems.at(suggestionItems.length - 1).simulate("click");
    const allEvents = await getEvents();
    expect(AppWrapper.state("events")).toEqual(allEvents);
    AppWrapper.unmount();
  });

  // Test: i-5
  test("list of 32 events by default", async () => {
    const AppWrapper = mount(<App />);
    const allEvents = await getEvents();
    expect(AppWrapper.state("numberOfEvents")).not.toEqual(undefined);
    const sliceNumber = AppWrapper.state("numberOfEvents");
    expect(AppWrapper.state("events")).toEqual(allEvents.slice(0, sliceNumber));
    AppWrapper.unmount();
  });

  // Test: i-6
  test("App changes number of events when the NumberOfEvents component changes", async () => {
    const AppWrapper = mount(<App />);
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    const locations = extractLocations(mockData);
    NumberOfEventsWrapper.setState({
      events: locations,
      maxNumberOfEvents: 10,
    });
    NumberOfEventsWrapper.find(".default").simulate("change");
    expect(NumberOfEventsWrapper.state("maxNumberOfEvents")).toEqual(10);
    AppWrapper.unmount();
  });
});
