//@flow
import React, { Component } from "react";
import { Paper, Button, Typography } from "@material-ui/core";
import styled from "styled-components";
import { connect } from "react-redux";
import { setTitle } from "../redux/layout/layoutActions";

import type { RouterHistory } from "react-router-dom";

type Props = {
  dispatch: Dispatch,
  posts: { [key: string]: Post },
  match: { params: { postId: string } },
  history: RouterHistory
};

const StyledPaper = styled(Paper)`
  padding: 8px;
  min-height: 400px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;

const ActionButton = styled(Button)`
  && {
    margin-bottom: 10px;
    margin-right: 10px;
  }
`;

class PostView extends Component<Props> {
  createPost = () => {
    this.props.history.push(`/createpost`);
  };

  componentDidMount() {
    this.props.dispatch(setTitle("Post"));
  }

  render() {
    return (
      <StyledPaper>
        <Typography variant="subheading" align="center">
          Choose specific post in Posts view to display post details
        </Typography>
        <ButtonContainer>
          <ActionButton
            variant="outlined"
            color="primary"
            onClick={this.createPost}
          >
            Create post
          </ActionButton>
        </ButtonContainer>
      </StyledPaper>
    );
  }
}

export default connect(
  store => {
    return {};
  },
  (dispatch: Dispatch) => {
    return { dispatch };
  }
)(PostView);
