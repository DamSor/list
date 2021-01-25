// @flow
import produce from "immer";

import { API_ACTIONS } from "../actionTypes";

type State = {
  posts: { [key: string]: Post },
  isFetching: boolean
};

const initialState: State = {
  posts: {},
  isFetching: false
};

export default function reducer(
  state: State = initialState,
  action: Action
): State {
  return produce(state, (draft: State) => {
    if (action.type === API_ACTIONS.FETCH_POSTS_STARTED) {
      draft.isFetching = true;
    } else if (action.type === API_ACTIONS.FETCH_POSTS_FAILED) {
      draft.isFetching = false;
    } else if (action.type === API_ACTIONS.FETCH_POSTS_SUCCEEDED) {
      draft.isFetching = false;
      draft.posts = action.payload.data.reduce((map, post) => {
        map[post.id] = post;
        return map;
      }, {});
    } else if (action.type === API_ACTIONS.FETCH_POST_STARTED) {
      draft.isFetching = true;
    } else if (action.type === API_ACTIONS.FETCH_POST_FAILED) {
      draft.isFetching = false;
    } else if (action.type === API_ACTIONS.FETCH_POST_SUCCEEDED) {
      draft.isFetching = false;
      draft.posts[action.payload.id] = action.payload;
    } else if (action.type === API_ACTIONS.CREATE_POST_STARTED) {
      draft.isFetching = true;
    } else if (action.type === API_ACTIONS.CREATE_POST_FAILED) {
      draft.isFetching = false;
    } else if (action.type === API_ACTIONS.CREATE_POST_SUCCEEDED) {
      draft.isFetching = false;
      console.log("POST CREATED", action.payload);
    } else if (action.type === API_ACTIONS.EDIT_POST_STARTED) {
      draft.isFetching = true;
    } else if (action.type === API_ACTIONS.EDIT_POST_FAILED) {
      draft.isFetching = false;
    } else if (action.type === API_ACTIONS.EDIT_POST_SUCCEEDED) {
      draft.isFetching = false;
      console.log("POST EDITED", action.payload);
    } else if (action.type === API_ACTIONS.DELETE_POST_STARTED) {
      draft.isFetching = true;
    } else if (action.type === API_ACTIONS.DELETE_POST_FAILED) {
      draft.isFetching = false;
    } else if (action.type === API_ACTIONS.DELETE_POST_SUCCEEDED) {
      draft.isFetching = false;
      console.log("POST DELETED", action.payload);
      delete draft.posts[action.payload.id];
    }
  });
}
