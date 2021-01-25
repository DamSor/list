// @flow
import React from "react";
import { connect } from "react-redux";

import ConfirmModal from "./specificModals/ConfirmModal";
import { hideModal } from "../../redux/modal/modalActions";

const MODAL_COMPONENTS = {
  CONFIRM: ConfirmModal
};

const ModalRoot = ({ modalType, modalProps, hideModal }) => {
  if (!modalType) {
    return null;
  }

  const SpecificModal = MODAL_COMPONENTS[modalType];
  return <SpecificModal {...modalProps} hideModal={hideModal} />;
};

export default connect(
  state => state.modal,
  (dispatch: Dispatch) => {
    return { hideModal: () => dispatch(hideModal()) };
  }
)(ModalRoot);
