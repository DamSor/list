import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import ErrorBoundary from "./ErrorBoundary";

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <ErrorBoundary>
      <div>test child</div>
    </ErrorBoundary>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

test("Children rendered properly", () => {
  const divContent = "test child";

  const wrapper = shallow(
    <ErrorBoundary>
      <div>{divContent}</div>
    </ErrorBoundary>
  );

  expect(wrapper.find("div").text()).toBe(divContent);
  wrapper.setState({ error: { error: "Error" } });
  expect(wrapper.find("div").text()).not.toBe(divContent);
});
