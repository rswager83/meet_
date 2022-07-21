import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from "../NumberOfEvents";

describe("<NumberofEvents /> component", () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  });

  test("render number of events", () => {
    expect(NumberOfEventsWrapper.find(".numberOfEvents")).toHaveLength(1);
  });

  test("default number set at 32", () => {
    expect(NumberOfEventsWrapper.find("#default").get(0).props.value).toEqual(
      32
    );
  });

  test("input value above 0", () => {
    NumberOfEventsWrapper.setState({ numberOfEvents: 32 });
    NumberOfEventsWrapper.find(".default").simulate("change", {
      target: { value: -10 },
    });
    expect(NumberOfEventsWrapper.state("numberOfEvents")).toEqual(32);
  });

  test("render input form", () => {
    expect(NumberOfEventsWrapper.find("#default")).toHaveLength(1);
  });

  test("allow user to edit list total", () => {
    NumberOfEventsWrapper.setState({ numberOfEvents: 32 });
    NumberOfEventsWrapper.find(".default").simulate("change", {
      target: { value: 12 },
    });
    expect(NumberOfEventsWrapper.state("numberOfEvents")).toEqual(12);
  });

  test("allow only numbers", () => {
    NumberOfEventsWrapper.setState({ numberOfEvents: 32 });
    NumberOfEventsWrapper.find("#default").simulate("change", {
      target: { value: "" },
    });
    expect(NumberOfEventsWrapper.state("numberOfEvents")).toEqual(32);
  });
});
