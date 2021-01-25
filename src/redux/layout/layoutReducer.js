// @flow
import produce from "immer";

import { LAYOUT_ACTIONS } from "../actionTypes";

type State = {
  title: string
};

const initialState: State = {
  title: ""
};

export default function reducer(
  state: State = initialState,
  action: Action
): State {
  return produce(state, (draft: State) => {
    if (action.type === LAYOUT_ACTIONS.SET_TITLE) {
      draft.title = action.payload;
    }
  });
}
