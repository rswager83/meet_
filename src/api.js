import { mockData } from "./mock-data";

export const extractLocations = (events) => {
  var extractLocations = events.map((event) => event.location);
  var locations = [...new Set(extractLocations)];
  return locations;
};

// Required for test i-3
export const getEvents = async () => {
  return mockData;
};
