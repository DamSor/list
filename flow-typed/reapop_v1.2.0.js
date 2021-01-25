//based on: https://github.com/LouisBarranqueiro/reapop/blob/master/docs/api.md#notification
declare type NotificationButton = {
  name: string,
  primary?: boolean,
  onClick: (SyntheticEvent<*>) => any
};

declare type Notification = {
  id?: string | number,
  title?: string,
  message: string,
  image?: string,
  status: string | number,
  position?: "t" | "tc" | "tl" | "tr" | "b" | "bc" | "br" | "bl",
  dismissible?: boolean,
  dismissAfter?: number,
  closeButton?: boolean,
  buttons?: Array<NotificationButton>,
  onAdd?: () => any,
  onRemove?: () => any,
  allowHTML?: boolean
};
