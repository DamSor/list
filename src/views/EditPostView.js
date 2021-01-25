//@flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { notify } from "reapop";
import {
  TextField,
  Paper,
  Button,
  InputLabel,
  FormControl,
  Select,
  MenuItem
} from "@material-ui/core";

import { fetchCategories } from "../redux/categories/categoriesActions";
import { setTitle } from "../redux/layout/layoutActions";
import { fetchAuthors } from "../redux/authors/authorsActions";
import { editPost, fetchPost } from "../redux/posts/postsActions";
import { showModal } from "../redux/modal/modalActions";

import type { RouterHistory } from "react-router-dom";

type Props = {
  dispatch: Dispatch,
  history: RouterHistory,
  categories: { [key: string]: Category },
  authors: { [key: string]: Author },
  posts: { [key: string]: Post },
  match: { params: { postId: string } }
};

type State = {
  author_id: string,
  category_id: string,
  title: string,
  lead: string,
  content: string
};

const StyledPaper = styled(Paper)`
  padding: 8px;
`;

const Buttons = styled.div`
  padding: 8px;
  display: flex;
  justify-content: center;
`;

const StyledButton = styled(Button)`
  && {
    margin: 8px;
  }
`;

class EditPostView extends Component<Props, State> {
  state = {
    author_id: "0",
    category_id: "0",
    title: "",
    lead: "",
    content: ""
  };

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (
      prevProps.posts[this.props.match.params.postId] !==
      this.props.posts[this.props.match.params.postId]
    ) {
      const post = this.props.posts[this.props.match.params.postId];
      if (post) {
        this.setState({
          author_id: post.author_id,
          category_id: post.category_id,
          title: post.title,
          lead: post.lead,
          content: post.content
        });
      }
    }
  }

  loadCategories = () => {
    this.props.dispatch(fetchCategories());
  };
  loadAuthors = () => {
    this.props.dispatch(fetchAuthors());
  };
  loadPost = () => {
    this.props.dispatch(fetchPost(this.props.match.params.postId));
  };
  goToPost = (id: string) => {
    this.props.history.push(`/posts/${id}`);
  };

  onCancelClick = () => {
    const modalProps = {
      title: "Confirm Cancel",
      text: "Are you sure you want to cancel edit process?",
      onSuccess: () => {
        this.goToPost(this.props.match.params.postId);
      }
    };
    this.props.dispatch(showModal("CONFIRM", modalProps));
  };

  onEditClick = () => {
    if (
      this.state.author_id !== 0 &&
      this.state.category_id !== 0 &&
      this.state.title &&
      this.state.lead &&
      this.state.content
    ) {
      const post = { ...this.state };
      this.props.dispatch(
        editPost(post, this.props.match.params.postId, (postId: string) => {
          const notification: Notification = {
            title: `Post (id: ${postId}) edited successfully`,
            message: "",
            status: "success",
            dismissible: true,
            dismissAfter: 5000
          };
          this.props.dispatch(notify(notification));
          this.props.history.push(`/posts/${postId}`);
        })
      );
    } else {
      const notification: Notification = {
        title: `Cannot create`,
        message: "Fill all required information first",
        status: "success",
        dismissible: true,
        dismissAfter: 5000
      };
      this.props.dispatch(notify(notification));
    }
  };

  handleChange = (value: string, field: string) => {
    this.setState({ [field]: value });
  };

  componentDidMount() {
    this.loadCategories();
    this.loadAuthors();
    this.loadPost();
    this.props.dispatch(setTitle("Edit Post"));
  }

  render() {
    let categories = [];
    if (this.props.categories) {
      categories = Object.keys(this.props.categories).map(key => {
        const category: Category = this.props.categories[key];
        return (
          <MenuItem key={category.id} value={category.id}>
            {category.id}
          </MenuItem>
        );
      });
    }
    let authors = [];
    if (this.props.authors) {
      authors = Object.keys(this.props.authors).map(key => {
        const author: Author = this.props.authors[key];
        return (
          <MenuItem key={author.id} value={author.id}>
            {author.id}
          </MenuItem>
        );
      });
    }

    return (
      <StyledPaper>
        <div>
          {this.props.authors && (
            <FormControl fullWidth={true} required={true}>
              <InputLabel htmlFor="authorId">Author ID</InputLabel>
              <Select
                value={this.state.author_id}
                onChange={event =>
                  this.handleChange(event.target.value, "author_id")
                }
              >
                {authors}
              </Select>
            </FormControl>
          )}
          {this.props.categories && (
            <FormControl fullWidth={true} required={true}>
              <InputLabel htmlFor="categoryId">Category ID</InputLabel>
              <Select
                value={this.state.category_id}
                onChange={event =>
                  this.handleChange(event.target.value, "category_id")
                }
              >
                {categories}
              </Select>
            </FormControl>
          )}
          <TextField
            id="title"
            label="Title"
            value={this.state.title}
            fullWidth={true}
            required={true}
            onChange={event => this.handleChange(event.target.value, "title")}
          />
          <TextField
            id="lead"
            label="Lead"
            value={this.state.lead}
            fullWidth={true}
            required={true}
            onChange={event => this.handleChange(event.target.value, "lead")}
          />
          <TextField
            id="content"
            label="Content"
            multiline={true}
            value={this.state.content}
            fullWidth={true}
            required={true}
            onChange={event => this.handleChange(event.target.value, "content")}
          />
        </div>

        <Buttons>
          <StyledButton variant="outlined" onClick={this.onCancelClick}>
            Cancel
          </StyledButton>
          <StyledButton
            variant="outlined"
            color="primary"
            onClick={this.onEditClick}
          >
            Save
          </StyledButton>
        </Buttons>
      </StyledPaper>
    );
  }
}

export default withRouter(
  connect(
    store => {
      return {
        categories: store.categories.categories,
        authors: store.authors.authors,
        posts: store.posts.posts
      };
    },
    (dispatch: Dispatch) => {
      return { dispatch };
    }
  )(EditPostView)
);
