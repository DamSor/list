// @flow
import produce from "immer";

import { API_ACTIONS } from "../actionTypes";

type State = {
  authors: { [key: string]: Author },
  isFetching: boolean
};

const initialState: State = {
  authors: {},
  isFetching: false
};

export default function reducer(
  state: State = initialState,
  action: Action
): State {
  return produce(state, (draft: State) => {
    if (action.type === API_ACTIONS.FETCH_AUTHORS_STARTED) {
      draft.isFetching = true;
    } else if (action.type === API_ACTIONS.FETCH_AUTHORS_FAILED) {
      draft.isFetching = false;
    } else if (action.type === API_ACTIONS.FETCH_AUTHORS_SUCCEEDED) {
      draft.isFetching = false;
      draft.authors = action.payload.data.reduce((map, author) => {
        map[author.id] = author;
        return map;
      }, {});
    }
  });
}
