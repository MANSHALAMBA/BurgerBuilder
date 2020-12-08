import { configure, shallow } from "enzyme";

import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { BurgerBuilder } from "./BurgerBuilder";
import Burger from "../../components/Burger/Burger";
configure({ adapter: new Adapter() });

describe("Testing Burger Builder", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder onInitingredient={() => {}} />);
  });

  it("should render burger ingredients props are present", () => {
    wrapper.setProps({
      igs: {
        salad: 1
      }
    });
    expect(wrapper.find(Burger)).toHaveLength(1);
  });
});
