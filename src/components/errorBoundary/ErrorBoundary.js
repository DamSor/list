//@flow
import React from "react";
import { Typography } from "@material-ui/core";
import type { Element } from "react";

type Props = {
  children: Element<*>
};

type State = {
  error: ?Object
};

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: undefined };
  }

  componentDidCatch(error: Object, info: Object) {
    this.setState({ error });
  }

  render() {
    if (this.state.error) {
      return (
        <div>
          <Typography variant="title">
            Something went wrong. Try to refresh application
          </Typography>
          <Typography variant="subtitle">
            Error: {this.state.error.toString()}
          </Typography>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
