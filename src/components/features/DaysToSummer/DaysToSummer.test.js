import React from "react";
import { shallow } from "enzyme";
import DaysToSummer from "./DaysToSummer";

const select = {
  days: "340 days to summer!",
};

const mockProps = {
  title: "21 days to summer!",
};

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
    expect(component.exists(select.title)).toEqual(true);
  });

  it("should have props title", () => {
    const component = shallow(<DaysToSummer {...mockProps} />);
    const expectedTitle = mockProps.days;

    expect(component.find(select.title).text()).toEqual(expectedTitle);
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

  const checkDescriptionAtDay = (day, expectedDescription) => {
    it(`should show correct at ${day}`, () => {
      global.Date = mockDay(`2021-08-${day}`);

      const component = shallow(<DaysToSummer />);
      const renderedDay = component.find("days").text();
      expect(renderedDay).toEqual(expectedDescription);

      global.Date = trueDay;
    });
  };

  describe("Component DaysToSummer with mocked Day", () => {
    checkDescriptionAtDay("2021-08-12", "2021-08-12");
  });
});
