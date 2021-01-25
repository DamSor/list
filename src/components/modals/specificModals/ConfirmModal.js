// @flow
import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from "@material-ui/core";
import _ from "underscore";

type ModalOptions = {
  title: string,
  text: string,
  onSuccess?: () => void,
  onCancel?: () => void,
  hideModal: () => void
};

const ConfirmModal = ({
  title,
  text,
  onSuccess = _.noop,
  onCancel = _.noop,
  hideModal
}: ModalOptions) => {
  const okHandler = () => {
    onSuccess();
    hideModal();
  };

  const cancelHandler = () => {
    onCancel();
    hideModal();
  };

  const onKeyPress = e => {
    if (e.key === "Enter") {
      okHandler();
    }
  };

  return (
    <Dialog
      open
      onClose={hideModal}
      aria-labelledby="form-dialog-title"
      onKeyPress={onKeyPress}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancelHandler} color="primary">
          Cancel
        </Button>
        <Button onClick={okHandler} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmModal;
