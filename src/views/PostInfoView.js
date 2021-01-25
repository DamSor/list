//@flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { Paper, TextField, Button } from "@material-ui/core";
import styled from "styled-components";
import { notify } from "reapop";

import { deletePost, fetchPost } from "../redux/posts/postsActions";
import { showModal } from "../redux/modal/modalActions";
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
`;

const ActionButton = styled(Button)`
  && {
    margin-bottom: 10px;
    margin-right: 10px;
  }
`;
const StyledTextField = styled(TextField)`
  && {
    margin-top: 10px;
    & div {
      //NOTE: default styles overridden to make disabled elements look better
      color: rgba(0, 0, 0, 0.87);
      &::before {
        border-bottom: 1px solid rgba(0, 0, 0, 0.42);
      }
    }
  }
`;

class PostInfoView extends Component<Props> {
  loadPost = () => {
    const postId = this.props.match.params.postId;
    this.props.dispatch(fetchPost(postId));
  };

  componentDidMount() {
    this.props.dispatch(setTitle("Post Details"));
    this.loadPost();
  }

  editPost = () => {
    this.props.history.push(`/editpost/${this.props.match.params.postId}`);
  };

  deletePost = () => {
    const modalProps = {
      title: "Confirm Delete",
      text: "Are you sure you want to delete post?",
      onSuccess: () => {
        this.props.dispatch(
          deletePost(this.props.match.params.postId, () => {
            this.props.history.push(`/postsincategory/0`);
            const notification: Notification = {
              title: `Post (id: ${
                this.props.match.params.postId
              }) deleted successfully`,
              message: "",
              status: "success",
              dismissible: true,
              dismissAfter: 5000
            };
            this.props.dispatch(notify(notification));
          })
        );
      }
    };
    this.props.dispatch(showModal("CONFIRM", modalProps));
  };

  render() {
    const post = this.props.posts[this.props.match.params.postId];
    const disabled = true;
    return (
      <div>
        <ActionButton
          variant="outlined"
          color="primary"
          onClick={this.editPost}
        >
          Edit post
        </ActionButton>
        <ActionButton variant="outlined" onClick={this.deletePost}>
          Delete post
        </ActionButton>
        <StyledPaper>
          {post && (
            <div>
              <StyledTextField
                id="id"
                label="ID"
                disabled={true}
                value={post.id}
                fullWidth={true}
              />
              <StyledTextField
                id="author_id"
                label="Author ID"
                disabled={disabled}
                value={post.author_id}
                fullWidth={true}
              />
              {post.author && (
                <div>
                  <StyledTextField
                    id="author_name"
                    label="Author Name"
                    disabled={disabled}
                    value={post.author.full_name}
                    fullWidth={true}
                  />
                  <StyledTextField
                    id="author_gender"
                    label="Author Gender"
                    disabled={disabled}
                    value={post.author.gender}
                    fullWidth={true}
                  />
                  <StyledTextField
                    id="author_role"
                    label="Author Role"
                    disabled={disabled}
                    value={post.author.role}
                    fullWidth={true}
                  />
                </div>
              )}
              <StyledTextField
                id="categoryId"
                label="Category ID"
                disabled={disabled}
                value={post.category_id}
                fullWidth={true}
              />
              <StyledTextField
                id="title"
                label="Title"
                disabled={disabled}
                value={post.title}
                fullWidth={true}
              />
              <StyledTextField
                id="lead"
                label="Lead"
                disabled={disabled}
                value={post.lead}
                fullWidth={true}
              />
              <StyledTextField
                id="content"
                label="Content"
                disabled={disabled}
                multiline={true}
                value={post.content}
                fullWidth={true}
              />
            </div>
          )}
        </StyledPaper>
      </div>
    );
  }
}

export default connect(
  store => {
    return {
      posts: store.posts.posts
    };
  },
  (dispatch: Dispatch) => {
    return { dispatch };
  }
)(PostInfoView);
