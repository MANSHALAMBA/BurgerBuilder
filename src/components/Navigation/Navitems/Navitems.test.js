import { configure, shallow } from "enzyme";

import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { Navitems } from "./Navitems";
import Navitem from "./Navitem/Navitem";
import Button from "../../UI/Button/Button";
configure({ adapter: new Adapter() });

describe("Testing Navitems", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Navitems />);
  });

  it("should render 3 nav items when not authenticated", () => {
    expect(wrapper.find(Navitem)).toHaveLength(3);
  });

  it("should render 2 nav items when  authenticated", () => {
    wrapper.setProps({ isAuth: true });
    expect(wrapper.find(Navitem)).toHaveLength(2);
  });

  //it("should have logout button when  authenticated", () => {
  // wrapper.setProps({ isAuth: true });
  // const logoutHandler = () => {};
  // expect(
  //   wrapper.contains(
  //     <Button type="Success" clicked={logoutHandler}>
  //       Logout
  //     </Button>
  //   )
  // ).toEqual(true);
  //});
});
