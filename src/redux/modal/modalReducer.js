// @flow
import { MODAL_ACTIONS } from "../actionTypes";

type State = {
  modalType: ?string,
  modalProps: {}
};

const initialState: State = {
  modalType: null,
  modalProps: {}
};

export default function reducer(
  state: State = initialState,
  action: Action
): State {
  if (action.type === MODAL_ACTIONS.SHOW_MODAL) {
    return {
      modalType: action.payload.modalType,
      modalProps: action.payload.modalProps
    };
  }
  if (action.type === MODAL_ACTIONS.HIDE_MODAL) {
    return initialState;
  }

  return state;
}
