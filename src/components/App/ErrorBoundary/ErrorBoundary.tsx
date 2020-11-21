import React, { ReactNode, PureComponent } from "react";

import StyleWrapper from "./errorBoundary.style";

interface Props {
  children?: ReactNode;
}
interface State {
  error: Error | null;
  errorInfo: { componentStack: string } | null;
}

export default class ErrorBoundary extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: { componentStack: string }): void {
    this.setState({ error, errorInfo });

    console.error("Error Boundry", error);
  }

  render(): ReactNode {
    const { children } = this.props;
    const { errorInfo, error } = this.state;

    return errorInfo ? (
      <StyleWrapper>
        <h2>Error happened!</h2>
        <details style={{ whiteSpace: "pre-wrap" }}>
          {error && error.toString()}
          <br />
          {errorInfo.componentStack}
        </details>
      </StyleWrapper>
    ) : (
      children || null
    );
  }
}
