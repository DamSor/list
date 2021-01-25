//@flow
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import { EventNote, List, ViewList } from "@material-ui/icons";

import type { Location, RouterHistory } from "react-router-dom";

type Props = {
  history: RouterHistory,
  location: Location
};
type State = {
  value: number
};

class Navigation extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.props.history.listen((location: Location) => {
      console.log("on route change", location);
      this.setState({ value: this.getCurrentNavItem(location) });
    });
  }

  getCurrentNavItem = (location: Location) => {
    if (location.pathname.includes("/categories")) {
      return 0;
    } else if (location.pathname.includes("/postsincategory")) {
      return 1;
    } else {
      return 2;
    }
  };

  state = {
    value: this.getCurrentNavItem(this.props.location)
  };

  handleChange = (event: SyntheticMouseEvent<*>, value: number) => {
    this.setState({ value });
    if (value === 0) {
      this.props.history.push(`/categories`);
    }
    if (value === 1) {
      this.props.history.push(`/postsincategory/0`);
    }
    if (value === 2) {
      this.props.history.push(`/post`);
    }
  };

  render() {
    return (
      <div>
        <BottomNavigation
          value={this.state.value}
          onChange={this.handleChange}
          showLabels
        >
          <BottomNavigationAction label="Categories" icon={<List />} />
          <BottomNavigationAction label="Posts" icon={<ViewList />} />
          <BottomNavigationAction label="Post" icon={<EventNote />} />
        </BottomNavigation>
      </div>
    );
  }
}

export default withRouter(Navigation);
