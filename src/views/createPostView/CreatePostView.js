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

import { fetchCategories } from "../../redux/categories/categoriesActions";
import { setTitle } from "../../redux/layout/layoutActions";
import { fetchAuthors } from "../../redux/authors/authorsActions";
import { createPost } from "../../redux/posts/postsActions";
import { showModal } from "../../redux/modal/modalActions";

import type { RouterHistory } from "react-router-dom";

type Props = {
  dispatch: Dispatch,
  history: RouterHistory,
  categories: { [key: string]: Category },
  authors: { [key: string]: Author }
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

const StyledTextField = styled(TextField)`
  && {
    margin-top: 10px;
  }
`;

const StyledFormControl = styled(FormControl)`
  && {
    margin-top: 10px;
  }
`;

class CreatePostView extends Component<Props, State> {
  state = {
    author_id: "0",
    category_id: "0",
    title: "",
    lead: "",
    content: ""
  };

  loadCategories = () => {
    this.props.dispatch(fetchCategories());
  };
  loadAuthors = () => {
    this.props.dispatch(fetchAuthors());
  };
  goToPost = (id: string) => {
    this.props.history.push(`/posts/${id}`);
  };

  onCancelClick = () => {
    const modalProps = {
      title: "Confirm Cancel",
      text: "Are you sure you want to abort creation process?",
      onSuccess: () => {
        this.props.history.push(`/postsincategory/0`);
      }
    };
    this.props.dispatch(showModal("CONFIRM", modalProps));
  };

  onCreateClick = () => {
    if (
      this.state.author_id !== 0 &&
      this.state.category_id !== 0 &&
      this.state.title &&
      this.state.lead &&
      this.state.content
    ) {
      const post = { ...this.state };
      this.props.dispatch(
        createPost(post, (postId: string) => {
          const notification: Notification = {
            title: `Post (id: ${postId}) created successfully`,
            message: "",
            status: "success",
            dismissible: true,
            dismissAfter: 5000
          };
          this.props.dispatch(notify(notification));
          //go to post in view mode
          this.goToPost(postId);
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
    this.props.dispatch(setTitle("Create Post"));
  }

  render() {
    let categories = [];
    if (this.props.categories) {
      categories = Object.keys(this.props.categories).map(key => {
        const category: Category = this.props.categories[key];
        return (
          <MenuItem key={category.id} value={category.id}>
            {category.id} ({category.name})
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
            {author.id} ({author.full_name})
          </MenuItem>
        );
      });
    }

    return (
      <StyledPaper>
        <div>
          {this.props.authors && (
            <StyledFormControl fullWidth={true} required={true}>
              <InputLabel htmlFor="authorId">Author ID</InputLabel>
              <Select
                value={this.state.author_id}
                onChange={event =>
                  this.handleChange(event.target.value, "author_id")
                }
              >
                <MenuItem value={"0"}>
                  <em>Not Selected</em>
                </MenuItem>
                {authors}
              </Select>
            </StyledFormControl>
          )}
          {this.props.categories && (
            <StyledFormControl fullWidth={true} required={true}>
              <InputLabel htmlFor="categoryId">Category ID</InputLabel>
              <Select
                value={this.state.category_id}
                onChange={event =>
                  this.handleChange(event.target.value, "category_id")
                }
              >
                <MenuItem value={"0"}>
                  <em>Not Selected</em>
                </MenuItem>
                {categories}
              </Select>
            </StyledFormControl>
          )}
          <StyledTextField
            id="title"
            label="Title"
            value={this.state.title}
            fullWidth={true}
            required={true}
            onChange={event => this.handleChange(event.target.value, "title")}
          />
          <StyledTextField
            id="lead"
            label="Lead"
            value={this.state.lead}
            fullWidth={true}
            required={true}
            onChange={event => this.handleChange(event.target.value, "lead")}
          />
          <StyledTextField
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
            CANCEL
          </StyledButton>
          <StyledButton
            variant="outlined"
            color="primary"
            onClick={this.onCreateClick}
          >
            CREATE
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
        authors: store.authors.authors
      };
    },
    (dispatch: Dispatch) => {
      return { dispatch };
    }
  )(CreatePostView)
);
