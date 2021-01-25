// @flow
import { LAYOUT_ACTIONS } from "../actionTypes";

export function setTitle(title: string): Action {
  return {
    type: LAYOUT_ACTIONS.SET_TITLE,
    payload: title
  };
}
