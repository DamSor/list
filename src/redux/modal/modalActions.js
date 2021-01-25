// @flow
import { MODAL_ACTIONS } from "../actionTypes";

export function showModal(type: string, props: {}): Action {
  return {
    type: MODAL_ACTIONS.SHOW_MODAL,
    payload: {
      modalType: type,
      modalProps: props
    }
  };
}

export function hideModal(): Action {
  return {
    type: MODAL_ACTIONS.HIDE_MODAL
  };
}
