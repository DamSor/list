// @flow
import axios from "axios";
import qs from "qs";
import { notify } from "reapop";

import { API_ACTIONS } from "../actionTypes";
import { getErrorNotification, host } from "../../service/utils";

export function fetchPostsStarted(): Action {
  return {
    type: API_ACTIONS.FETCH_POSTS_STARTED
  };
}

export function fetchPostsFailed(): Action {
  return {
    type: API_ACTIONS.FETCH_POSTS_FAILED
  };
}

export function fetchPostsSucceeded(result: Object): Action {
  return {
    type: API_ACTIONS.FETCH_POSTS_SUCCEEDED,
    payload: result
  };
}

export function fetchPosts(
  categoryId: string,
  page: number,
  perPage: number,
  onSuccess: Function
) {
  return function(dispatch: Dispatch) {
    dispatch(fetchPostsStarted());
    return axios({
      url: `${host}/categories/${categoryId}/posts?page=${page}&per-page=${perPage}`,
      timeout: 20000,
      method: "get",
      responseType: "json"
    })
      .then(response => {
        dispatch(fetchPostsSucceeded(response.data));
        onSuccess(response);
      })
      .catch(error => {
        const notification = getErrorNotification("Request posts error", error);

        dispatch(notify(notification));
        dispatch(fetchPostsFailed());
      });
  };
}

export function fetchPostStarted(): Action {
  return {
    type: API_ACTIONS.FETCH_POST_STARTED
  };
}

export function fetchPostFailed(): Action {
  return {
    type: API_ACTIONS.FETCH_POST_FAILED
  };
}

export function fetchPostSucceeded(result: Object): Action {
  return {
    type: API_ACTIONS.FETCH_POST_SUCCEEDED,
    payload: result
  };
}

export function fetchPost(id: string) {
  return function(dispatch: Dispatch) {
    dispatch(fetchPostStarted());
    return axios
      .get(`${host}/posts/${id}?expand=author`)
      .then(response => {
        dispatch(fetchPostSucceeded(response.data));
      })
      .catch(error => {
        const notification = getErrorNotification("Request post error", error);

        dispatch(notify(notification));
        dispatch(fetchPostFailed());
      });
  };
}

export function createPostStarted(): Action {
  return {
    type: API_ACTIONS.CREATE_POST_STARTED
  };
}

export function createPostFailed(): Action {
  return {
    type: API_ACTIONS.CREATE_POST_FAILED
  };
}

export function createPostSucceeded(result: Object): Action {
  return {
    type: API_ACTIONS.CREATE_POST_SUCCEEDED,
    payload: result
  };
}

export function createPost(post: Object, onSuccess: Function) {
  return function(dispatch: Dispatch) {
    dispatch(createPostStarted());
    return axios
      .post(host + "/posts", qs.stringify(post))
      .then(response => {
        dispatch(createPostSucceeded(response.data));
        onSuccess(response.data.id);
      })
      .catch(error => {
        const notification = getErrorNotification(
          "Request create post error",
          error
        );

        dispatch(notify(notification));
        dispatch(createPostFailed());
      });
  };
}

export function editPostStarted(): Action {
  return {
    type: API_ACTIONS.EDIT_POST_STARTED
  };
}

export function editPostFailed(): Action {
  return {
    type: API_ACTIONS.EDIT_POST_FAILED
  };
}

export function editPostSucceeded(result: Object): Action {
  return {
    type: API_ACTIONS.EDIT_POST_SUCCEEDED,
    payload: result
  };
}

export function editPost(post: Object, postId: string, onSuccess: Function) {
  return function(dispatch: Dispatch) {
    dispatch(editPostStarted());
    return axios
      .patch(`${host}/posts/${postId}`, qs.stringify(post))
      .then(response => {
        dispatch(editPostSucceeded(response.data));
        onSuccess(response.data.id);
      })
      .catch(error => {
        const notification = getErrorNotification(
          "Request edit post error",
          error
        );

        dispatch(notify(notification));
        dispatch(editPostFailed());
      });
  };
}

export function deletePostStarted(): Action {
  return {
    type: API_ACTIONS.DELETE_POST_STARTED
  };
}

export function deletePostFailed(): Action {
  return {
    type: API_ACTIONS.DELETE_POST_FAILED
  };
}

export function deletePostSucceeded(result: Object): Action {
  return {
    type: API_ACTIONS.DELETE_POST_SUCCEEDED,
    payload: result
  };
}

export function deletePost(id: string, onSuccess: Function) {
  return function(dispatch: Dispatch) {
    dispatch(deletePostStarted());
    return axios
      .delete(`${host}/posts/${id}`)
      .then(response => {
        dispatch(deletePostSucceeded(response.data));
        onSuccess();
      })
      .catch(error => {
        const notification = getErrorNotification(
          "Request delete post error",
          error
        );

        dispatch(notify(notification));
        dispatch(deletePostFailed());
      });
  };
}
