//@flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import styled from "styled-components/";

import { fetchCategories } from "../../redux/categories/categoriesActions";
import { setTitle } from "../../redux/layout/layoutActions";
import PostsTable from "./components/postsTable/PostsTable";
import { fetchPosts } from "../../redux/posts/postsActions";

import type { RouterHistory } from "react-router-dom";

type Props = {
  dispatch: Dispatch,
  history: RouterHistory,
  categories: { [key: string]: Category },
  posts: { [key: string]: Post },
  match: { params: { categoryId: string } }
};

type State = {
  page: number,
  perPage: number,
  totalCount: number
};

const StyledFormControl = styled(FormControl)`
  && {
    margin-bottom: 10px;
  }
`;
const FabButton = styled(Button)`
  && {
    position: absolute;
    right: 10px;
    bottom: 10px;
  }
`;

class PostsView extends Component<Props, State> {
  state = {
    page: 0,
    perPage: 5,
    totalCount: 0
  };

  loadCategories = () => {
    this.props.dispatch(fetchCategories());
  };

  loadPosts = (categoryId: string) => {
    if (categoryId !== "0") {
      this.props.dispatch(
        fetchPosts(
          categoryId,
          this.state.page + 1, //NOTE: +1 is required because TablePagination component has 0-based page index
          this.state.perPage,
          response => {
            this.setState({ totalCount: response.data._meta.totalCount });
          }
        )
      );
    }
  };

  goToPosts = (id: string) => {
    this.props.history.push(`/postsincategory/${id}`);
  };

  goToPost = (id: string) => {
    this.props.history.push(`/posts/${id}`);
  };

  createPost = () => {
    this.props.history.push(`/createpost`);
  };

  setPage = (page: number) => {
    this.setState({ page });
  };

  setPerPage = (perPage: number) => {
    this.setState({ perPage, page: 0 });
  };

  componentDidUpdate(prevProps: Props, prevState: State) {
    //realod posts if categoryId changed
    if (
      prevProps.match.params.categoryId !== this.props.match.params.categoryId
    ) {
      this.loadPosts(this.props.match.params.categoryId);
    }

    //reload posts if pagination params changed
    if (
      prevState.page !== this.state.page ||
      prevState.perPage !== this.state.perPage
    ) {
      this.loadPosts(this.props.match.params.categoryId);
    }

    //Select automatically first loaded category if none selected
    if (
      this.props.match.params.categoryId === "0" &&
      Object.keys(this.props.categories).length > 0
    ) {
      const firstCategoryId = this.props.categories[
        Object.keys(this.props.categories)[0]
      ].id;
      this.goToPosts(firstCategoryId);
    }
  }

  componentDidMount() {
    this.props.dispatch(setTitle("Posts in Category"));
    this.loadCategories();
    this.loadPosts(this.props.match.params.categoryId);
  }

  handleChange = event => {
    this.goToPosts(event.target.value);
  };

  render() {
    let categories = [];
    if (this.props.categories) {
      categories = Object.keys(this.props.categories).map(key => {
        const category: Category = this.props.categories[key];
        return (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        );
      });
    }

    return (
      <div>
        {this.props.categories && (
          <StyledFormControl>
            <InputLabel htmlFor="category">Category</InputLabel>
            <Select
              value={this.props.match.params.categoryId}
              onChange={this.handleChange}
              inputProps={{
                name: "Category",
                id: "category"
              }}
            >
              <MenuItem value={"0"}>
                <em>Not Selected</em>
              </MenuItem>
              {categories}
            </Select>
          </StyledFormControl>
        )}
        {this.props.match.params.categoryId !== "0" && (
          <PostsTable
            posts={this.props.posts}
            page={this.state.page}
            perPage={this.state.perPage}
            totalCount={this.state.totalCount}
            setPage={this.setPage}
            setPerPage={this.setPerPage}
            loadPost={this.goToPost}
          />
        )}
        <FabButton
          className="fab-button"
          variant="fab"
          color="secondary"
          aria-label="add"
          onClick={this.createPost}
        >
          <Add />
        </FabButton>
      </div>
    );
  }
}

export default withRouter(
  connect(
    store => {
      return {
        posts: store.posts.posts,
        categories: store.categories.categories
      };
    },
    (dispatch: Dispatch) => {
      return { dispatch };
    }
  )(PostsView)
);
