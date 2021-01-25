//@flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, withRouter, Switch } from "react-router-dom";
import styled from "styled-components";
import NotificationsSystem from "reapop";
import theme from "reapop-theme-wybo";
import "font-awesome/css/font-awesome.min.css"; //NOTE: required by reapop-theme-wybo

import "./App.css";
import Navigation from "./layout/navigation/Navigation";
import TopBar from "./layout/topBar/TopBar";
import ModalRoot from "./components/modals/ModalRoot";
import CategoriesView from "./views/categoriesView/CategoriesView";
import PostsView from "./views/postsView/PostsView";
import CreatePostView from "./views/createPostView/CreatePostView";
import EditPostView from "./views/EditPostView";
import PostInfoView from "./views/PostInfoView";
import PostView from "./views/PostView";
import PageNotFound from "./components/PageNotFound";

import type { Location, RouterHistory } from "react-router-dom";

type Props = {
  title: string,
  history: RouterHistory,
  location: Location
};

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex-grow: 1;
  overflow: auto;
  padding: 16px;
`;

export class App extends Component<Props> {
  componentDidMount() {
    if (this.props.location && this.props.location.pathname === "/") {
      //redirect to categories if path is empty
      this.props.history.push(`/categories`);
    }
  }

  render() {
    return (
      <Container>
        <NotificationsSystem theme={theme} />
        <ModalRoot />
        <TopBar title={this.props.title} />
        <Content>
          <Switch>
            <Route path="/categories" component={CategoriesView} />
            <Route path="/postsincategory/:categoryId" component={PostsView} />
            <Route path="/post" component={PostView} />
            <Route path="/posts/:postId" component={PostInfoView} />
            <Route path="/createpost/" component={CreatePostView} />
            <Route path="/editpost/:postId" component={EditPostView} />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </Content>
        <Navigation />
      </Container>
    );
  }
}

export default withRouter(
  connect(store => {
    return { title: store.layout.title };
  })(App)
);
