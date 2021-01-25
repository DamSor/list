import React from "react";
import ReactDOM from "react-dom";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";

import CreatePostView from "./CreatePostView";
import store from "../../redux/store";

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <MemoryRouter>
        <CreatePostView />
      </MemoryRouter>
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

test("Buttons present", () => {
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <CreatePostView />
      </MemoryRouter>
    </Provider>
  );

  expect(
    wrapper
      .find("button")
      .first()
      .text()
  ).toBe("CANCEL");

  expect(
    wrapper
      .find("button")
      .at(1)
      .text()
  ).toBe("CREATE");
});
