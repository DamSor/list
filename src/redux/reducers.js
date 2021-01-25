// @flow
import { combineReducers } from "redux";
import { reducer as notificationsReducer } from "reapop";
import categories from "./categories/categoriesReducer";
import posts from "./posts/postsReducer";
import authors from "./authors/authorsReducer";
import layout from "./layout/layoutReducer";
import modal from "./modal/modalReducer";

export default combineReducers({
  notifications: notificationsReducer(),
  categories,
  posts,
  authors,
  layout,
  modal
});
