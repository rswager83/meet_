import { loadFeature, defineFeature } from "jest-cucumber";
import { mount } from "enzyme";
import React from "react";
import App from "../App";

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

defineFeature(feature, (test) => {
  <></>;
  let AppWrapper;

  // Scenario 1
  test("An event element is collapsed by default.", ({ given, when, then }) => {
    given("that the user opens the main page", () => {
      AppWrapper = mount(<App />);
    });

    when("the user views the event element of a city", () => {});

    then(
      "the event element from each city will initially be collapsed/hidden from the user",
      () => {
        AppWrapper.update();
        expect(AppWrapper.find(".event-details")).toHaveLength(0);
      }
    );
  });

  // Scenario 2
  test("The user can expand an event to see its details.", ({
    given,
    when,
    then,
  }) => {
    <></>;

    given("the user is viewing a specific event", async () => {
      AppWrapper = await mount(<App />);
    });

    when("the user selects the event", () => {
      AppWrapper.update();
      AppWrapper.find(".btn-details").at(0).simulate("click");
    });

    then(
      "the details of that event will be listed for the user to view",
      () => {
        expect(AppWrapper.find(".event-details")).toHaveLength(1);
      }
    );
  });

  // Scenario 3
  test("The user can collapse an event to hide its details.", ({
    given,
    when,
    then,
  }) => {
    <></>;
    given("the event element is opened", () => {
      expect(AppWrapper.find(".event-details")).toHaveLength(1);
    });

    when("the user closes the event element", () => {
      AppWrapper.find(".btn-details").at(0).simulate("click");
    });

    then("the details are hidden", () => {
      expect(AppWrapper.find(".event-details")).toHaveLength(0);
    });
  });
});
