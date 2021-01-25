import React from "react";
import ReactDOM from "react-dom";
import { mount } from "enzyme";

import { TopBar } from "./TopBar";

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <TopBar
      title=""
      isAuthorsFetching={true}
      isCategoriesFetching={false}
      isPostsFetching={false}
    />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

test("TopBar title test", () => {
  const title = "Test title";

  const wrapper = mount(
    <TopBar
      title={title}
      isAuthorsFetching={true}
      isCategoriesFetching={false}
      isPostsFetching={false}
    />
  );

  expect(wrapper.find("h2").text()).toBe(title);
});

test("TopBar loader 1 test", () => {
  const wrapper = mount(
    <TopBar
      title=""
      isAuthorsFetching={true}
      isCategoriesFetching={false}
      isPostsFetching={false}
    />
  );

  expect(wrapper.find("svg").length).toBe(1);
});

test("TopBar loader 2 test", () => {
  const wrapper = mount(
    <TopBar
      title=""
      isAuthorsFetching={true}
      isCategoriesFetching={true}
      isPostsFetching={true}
    />
  );

  expect(wrapper.find("svg").length).toBe(1);
});

test("TopBar loader not present test", () => {
  const wrapper = mount(
    <TopBar
      title=""
      isAuthorsFetching={false}
      isCategoriesFetching={false}
      isPostsFetching={false}
    />
  );

  expect(wrapper.find("svg").length).toBe(0);
});
