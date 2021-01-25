// @flow
import produce from "immer";

import { API_ACTIONS } from "../actionTypes";

type State = {
  categories: { [key: string]: Category },
  isFetching: boolean
};

const initialState: State = {
  categories: {},
  isFetching: false
};

export default function reducer(
  state: State = initialState,
  action: Action
): State {
  return produce(state, (draft: State) => {
    if (action.type === API_ACTIONS.FETCH_CATEGORIES_STARTED) {
      draft.isFetching = true;
    } else if (action.type === API_ACTIONS.FETCH_CATEGORIES_FAILED) {
      draft.isFetching = false;
    } else if (action.type === API_ACTIONS.FETCH_CATEGORIES_SUCCEEDED) {
      draft.isFetching = false;
      draft.categories = action.payload.data.reduce((map, category) => {
        map[category.id] = category;
        return map;
      }, {});
    }
  });
}
