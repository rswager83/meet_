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

describe("<App /> integration", () => {
  test('App passes "events" state as a prop to EventList', () => {
    const AppWrapper = mount(<App />);
    const AppEventsState = AppWrapper.state("events");
    expect(AppEventsState).not.toEqual(undefined);
    expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
    AppWrapper.unmount();
  });

  test('App passes "locations" state as a prop to CitySearch', () => {
    const AppWrapper = mount(<App />);
    const AppLocationsState = AppWrapper.state("locations");
    expect(AppLocationsState).not.toEqual(undefined);
    expect(AppWrapper.find(CitySearch).props().locations).toEqual(
      AppLocationsState
    );
    AppWrapper.unmount();
  });

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
    const eventsToShow = allEvents
      .filter((event) => event.location === selectedCity)
      .slice(0, 32);
    NumberOfEventsWrapper.setState({ eventsNumber: 32 });
    AppWrapper.setState({ locationSelected: selectedCity, eventsLength: 32 });
    expect(AppWrapper.state("events")).toEqual(eventsToShow);
    AppWrapper.unmount();
  });

  test('get list of all events when user selects "see all cities"', async () => {
    const AppWrapper = mount(<App />);
    const suggestionItems = AppWrapper.find(CitySearch).find(".suggestions li");
    await suggestionItems.at(suggestionItems.length - 1).simulate("click");
    const allEvents = await getEvents();
    expect(AppWrapper.state("events")).toEqual(allEvents);
    AppWrapper.unmount();
  });

  test("list of 32 events by default", async () => {
    const AppWrapper = mount(<App />);
    const allEvents = await getEvents();
    expect(AppWrapper.state("numberOfEvents")).not.toEqual(undefined);
    const sliceNumber = AppWrapper.state("numberOfEvents");
    expect(AppWrapper.state("events")).toEqual(allEvents.slice(0, sliceNumber));
    AppWrapper.unmount();
  });

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
