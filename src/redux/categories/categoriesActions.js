// @flow
import axios from "axios";
import { notify } from "reapop";

import { getErrorNotification, host } from "../../service/utils";
import { API_ACTIONS } from "../actionTypes";

export function fetchCategoriesStarted(): Action {
  return {
    type: API_ACTIONS.FETCH_CATEGORIES_STARTED
  };
}

export function fetchCategoriesFailed(): Action {
  return {
    type: API_ACTIONS.FETCH_CATEGORIES_FAILED
  };
}

export function fetchCategoriesSucceeded(result: Object): Action {
  return {
    type: API_ACTIONS.FETCH_CATEGORIES_SUCCEEDED,
    payload: result
  };
}

export function fetchCategories() {
  return function(dispatch: Dispatch) {
    dispatch(fetchCategoriesStarted());
    return axios({
      url: `${host}/categories`,
      timeout: 20000,
      method: "get",
      responseType: "json"
    })
      .then(response => {
        dispatch(fetchCategoriesSucceeded(response.data));
      })
      .catch(error => {
        const notification = getErrorNotification(
          "Request categories error",
          error
        );

        dispatch(notify(notification));
        dispatch(fetchCategoriesFailed());
      });
  };
}
