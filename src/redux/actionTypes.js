// @flow

export const API_ACTIONS = {
  FETCH_CATEGORIES_STARTED: "FETCH_CATEGORIES_STARTED",
  FETCH_CATEGORIES_FAILED: "FETCH_CATEGORIES_FAILED",
  FETCH_CATEGORIES_SUCCEEDED: "FETCH_CATEGORIES_SUCCEEDED",
  FETCH_POSTS_STARTED: "FETCH_POSTS_STARTED",
  FETCH_POSTS_FAILED: "FETCH_POSTS_FAILED",
  FETCH_POSTS_SUCCEEDED: "FETCH_POSTS_SUCCEEDED",
  FETCH_POST_STARTED: "FETCH_POST_STARTED",
  FETCH_POST_FAILED: "FETCH_POST_FAILED",
  FETCH_POST_SUCCEEDED: "FETCH_POST_SUCCEEDED",
  CREATE_POST_STARTED: "CREATE_POST_STARTED",
  CREATE_POST_FAILED: "CREATE_POST_FAILED",
  CREATE_POST_SUCCEEDED: "CREATE_POST_SUCCEEDED",
  EDIT_POST_STARTED: "EDIT_POST_STARTED",
  EDIT_POST_FAILED: "EDIT_POST_FAILED",
  EDIT_POST_SUCCEEDED: "EDIT_POST_SUCCEEDED",
  DELETE_POST_STARTED: "DELETE_POST_STARTED",
  DELETE_POST_FAILED: "DELETE_POST_FAILED",
  DELETE_POST_SUCCEEDED: "DELETE_POST_SUCCEEDED",
  FETCH_AUTHORS_STARTED: "FETCH_AUTHORS_STARTED",
  FETCH_AUTHORS_FAILED: "FETCH_AUTHORS_FAILED",
  FETCH_AUTHORS_SUCCEEDED: "FETCH_AUTHORS_SUCCEEDED"
};

export const LAYOUT_ACTIONS = {
  SET_TITLE: "SET_TITLE"
};

export const MODAL_ACTIONS = {
  SHOW_MODAL: "SHOW_MODAL",
  HIDE_MODAL: "HIDE_MODAL"
};

//NOTE: It is not possible to use constants in type definitions so unfortunately we have to copy our strings (https://github.com/facebook/flow/issues/2377)

/*********************************               Categories Actions               *************************************/
type FETCH_CATEGORIES_STARTED = {
  type: "FETCH_CATEGORIES_STARTED"
};

type FETCH_CATEGORIES_FAILED = {
  type: "FETCH_CATEGORIES_FAILED"
};

type FETCH_CATEGORIES_SUCCEEDED = {
  type: "FETCH_CATEGORIES_SUCCEEDED",
  payload: Object
};

type FetchCategoriesActions =
  | FETCH_CATEGORIES_STARTED
  | FETCH_CATEGORIES_FAILED
  | FETCH_CATEGORIES_SUCCEEDED;

/**********************************************************************************************************************/

/*********************************                  Posts Actions                 *************************************/
type FETCH_POSTS_STARTED = {
  type: "FETCH_POSTS_STARTED"
};

type FETCH_POSTS_FAILED = {
  type: "FETCH_POSTS_FAILED"
};

type FETCH_POSTS_SUCCEEDED = {
  type: "FETCH_POSTS_SUCCEEDED",
  payload: Object
};
type FETCH_POST_STARTED = {
  type: "FETCH_POST_STARTED"
};

type FETCH_POST_FAILED = {
  type: "FETCH_POST_FAILED"
};

type FETCH_POST_SUCCEEDED = {
  type: "FETCH_POST_SUCCEEDED",
  payload: Post
};
type CREATE_POST_STARTED = {
  type: "CREATE_POST_STARTED"
};

type CREATE_POST_FAILED = {
  type: "CREATE_POST_FAILED"
};

type CREATE_POST_SUCCEEDED = {
  type: "CREATE_POST_SUCCEEDED",
  payload: Post
};
type EDIT_POST_STARTED = {
  type: "EDIT_POST_STARTED"
};

type EDIT_POST_FAILED = {
  type: "EDIT_POST_FAILED"
};

type EDIT_POST_SUCCEEDED = {
  type: "EDIT_POST_SUCCEEDED",
  payload: Post
};
type DELETE_POST_STARTED = {
  type: "DELETE_POST_STARTED"
};

type DELETE_POST_FAILED = {
  type: "DELETE_POST_FAILED"
};

type DELETE_POST_SUCCEEDED = {
  type: "DELETE_POST_SUCCEEDED",
  payload: Post
};

type FetchPostsActions =
  | FETCH_POSTS_STARTED
  | FETCH_POSTS_FAILED
  | FETCH_POSTS_SUCCEEDED
  | FETCH_POST_STARTED
  | FETCH_POST_FAILED
  | FETCH_POST_SUCCEEDED
  | CREATE_POST_STARTED
  | CREATE_POST_FAILED
  | CREATE_POST_SUCCEEDED
  | EDIT_POST_STARTED
  | EDIT_POST_FAILED
  | EDIT_POST_SUCCEEDED
  | DELETE_POST_STARTED
  | DELETE_POST_FAILED
  | DELETE_POST_SUCCEEDED;

/**********************************************************************************************************************/

/*********************************               Authors Actions               *************************************/
type FETCH_AUTHORS_STARTED = {
  type: "FETCH_AUTHORS_STARTED"
};

type FETCH_AUTHORS_FAILED = {
  type: "FETCH_AUTHORS_FAILED"
};

type FETCH_AUTHORS_SUCCEEDED = {
  type: "FETCH_AUTHORS_SUCCEEDED",
  payload: Object
};

type FetchAuthorsActions =
  | FETCH_AUTHORS_STARTED
  | FETCH_AUTHORS_FAILED
  | FETCH_AUTHORS_SUCCEEDED;

/**********************************************************************************************************************/

/*********************************                  Layout Actions                 ************************************/
type SET_TITLE = {
  type: "SET_TITLE",
  payload: string
};

type LayoutActions = SET_TITLE;

/**********************************************************************************************************************/

/*********************************                  Modal Actions                 *************************************/
type ShowModal = {
  type: "SHOW_MODAL",
  payload: {
    modalType: string,
    modalProps: {}
  }
};

type HideModal = {
  type: "HIDE_MODAL"
};

type ModalActions = ShowModal | HideModal;

/**********************************************************************************************************************/

export type Action =
  | FetchCategoriesActions
  | FetchPostsActions
  | FetchAuthorsActions
  | LayoutActions
  | ModalActions;
