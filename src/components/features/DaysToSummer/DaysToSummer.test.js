import React from "react";
import { shallow } from "enzyme";
import DaysToSummer from "./DaysToSummer";

beforeAll(() => {
  const utilsModule = jest.requireActual("../../../utils/formatTime.js");
  utilsModule.formatTime = jest.fn((days) => days);
});

describe("Component DaysToSummer", () => {
  it("should render without crashing", () => {
    const component = shallow(<DaysToSummer />);
    expect(component).toBeTruthy();
  });

  it("should have h3 with class summerDays", () => {
    const component = shallow(<DaysToSummer />);
    expect(component.exists(".summerDays")).toEqual(true);
  });

  const trueDay = Date;

  const mockDay = (customDay) =>
    class extends Date {
      constructor(...args) {
        if (args.length) {
          super(...args);
        } else {
          super(customDay);
        }
        return this;
      }
      static now() {
        return new Date(customDay).getUTCDate();
      }
    };

  const checkDescriptionAtDay = (date, expectedDescription) => {
    it(`should show correct at ${date}`, () => {
      global.Date = mockDay(`${date}`);

      const component = shallow(<DaysToSummer title="Test" />);
      const renderedDay = component.find(".summerDays").text();
      expect(renderedDay).toEqual(expectedDescription);

      global.Date = trueDay;
    });
  };

  describe("Component DaysToSummer with mocked Day", () => {
    checkDescriptionAtDay("2021-08-12", "Test");
    checkDescriptionAtDay("2021-09-12", "Test");
    checkDescriptionAtDay("2021-09-23", "Test");
    checkDescriptionAtDay("2021-06-21", "Test");
    checkDescriptionAtDay("2021-06-20", "1 day to summer!");
    checkDescriptionAtDay("2021-09-25", "269 days to summer!");
  });
});
