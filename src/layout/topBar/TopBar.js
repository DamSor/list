//@flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  CircularProgress
} from "@material-ui/core";
import styled from "styled-components";

type Props = {
  title: string,
  isAuthorsFetching: boolean,
  isPostsFetching: boolean,
  isCategoriesFetching: boolean
};

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`;

export class TopBar extends Component<Props> {
  render() {
    const progress = (this.props.isAuthorsFetching ||
      this.props.isPostsFetching ||
      this.props.isCategoriesFetching) && ( //$FlowFixMe
      <CircularProgress color="secondary" />
    );

    return (
      <AppBar position="static">
        <StyledToolbar>
          <Typography variant="title" color="inherit">
            {this.props.title}
          </Typography>
          {progress}
        </StyledToolbar>
      </AppBar>
    );
  }
}

export default withRouter(
  connect(store => {
    return {
      isAuthorsFetching: store.authors.isFetching,
      isPostsFetching: store.posts.isFetching,
      isCategoriesFetching: store.categories.isFetching
    };
  })(TopBar)
);
