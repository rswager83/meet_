import { mount } from "enzyme";
import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import { extractLocations } from "../api";
import App from "../App";
import { mockData } from "../mock-data";
import NumberOfEvents from "../NumberOfEvents";

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");
const locations = extractLocations(mockData);

defineFeature(feature, (test) => {
  <></>;

  let AppWrapper;
  let NumberOfEventsWrapper;

  // Scenario 1
  test("When the user hasn’t specified a number, 32 is the default number.", ({
    given,
    when,
    then,
  }) => {
    given("the user at the home page", async () => {
      AppWrapper = await mount(<App />);
    });

    when("the user chooses no specific amount of search results", () => {
      AppWrapper.update();
    });

    then(
      "the default amount of visible search results per city will be 32",
      () => {
        expect(AppWrapper.find(".event-visible")).toHaveLength(2);
      }
    );
  });

  // Scenario 2
  test("The user can change the number of events they want to see.", ({
    given,
    when,
    then,
  }) => {
    given("the user opened the search results query", () => {
      AppWrapper.update();
      expect(AppWrapper.find(".event-visible")).toHaveLength(2);
    });

    when("the user changes the default number", () => {
      const eventNumber = { target: { value: 1 } };
      NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
      NumberOfEventsWrapper.setState({ events: locations, eventCount: 1 });
      NumberOfEventsWrapper.find(".default").simulate("change", eventNumber);
      expect(AppWrapper.find(".default").props().value).toEqual(1);
      AppWrapper.update();
    });

    then(
      "the default number of results will be changed to what the users select",
      () => {
        expect(NumberOfEventsWrapper.state("numberOfEvents")).toBe(1);
        AppWrapper.unmount();
      }
    );
  });
});
