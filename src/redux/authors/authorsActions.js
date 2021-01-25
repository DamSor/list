// @flow
import axios from "axios";
import { notify } from "reapop";

import { API_ACTIONS } from "../actionTypes";
import { host, getErrorNotification } from "../../service/utils";

export function fetchAuthorsStarted(): Action {
  return {
    type: API_ACTIONS.FETCH_AUTHORS_STARTED
  };
}

export function fetchAuthorsFailed(): Action {
  return {
    type: API_ACTIONS.FETCH_AUTHORS_FAILED
  };
}

export function fetchAuthorsSucceeded(result: Object): Action {
  return {
    type: API_ACTIONS.FETCH_AUTHORS_SUCCEEDED,
    payload: result
  };
}

export function fetchAuthors() {
  return function(dispatch: Dispatch) {
    dispatch(fetchAuthorsStarted());
    return axios({
      url: `${host}/authors`,
      timeout: 20000,
      method: "get",
      responseType: "json"
    })
      .then(response => {
        dispatch(fetchAuthorsSucceeded(response.data));
      })
      .catch(error => {
        const notification = getErrorNotification(
          "Request authors error",
          error
        );

        dispatch(notify(notification));
        dispatch(fetchAuthorsFailed());
      });
  };
}
