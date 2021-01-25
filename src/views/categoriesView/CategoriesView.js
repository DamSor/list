//@flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { fetchCategories } from "../../redux/categories/categoriesActions";
import { setTitle } from "../../redux/layout/layoutActions";
import CategoriesTable from "./components/categoriesTable/CategoriesTable";

import type { RouterHistory } from "react-router-dom";

type Props = {
  dispatch: Dispatch,
  history: RouterHistory,
  categories: { [key: string]: Category }
};

class CategoriesView extends Component<Props> {
  loadCategories = () => {
    this.props.dispatch(fetchCategories());
  };

  loadPosts = (id: string) => {
    this.props.history.push(`/postsincategory/${id}`);
  };

  componentDidMount() {
    this.props.dispatch(setTitle("Categories"));
    this.loadCategories();
  }

  render() {
    return (
      <CategoriesTable
        categories={this.props.categories}
        loadPosts={this.loadPosts}
      />
    );
  }
}

export default withRouter(
  connect(
    store => {
      return {
        categories: store.categories.categories
      };
    },
    (dispatch: Dispatch) => {
      return { dispatch };
    }
  )(CategoriesView)
);
