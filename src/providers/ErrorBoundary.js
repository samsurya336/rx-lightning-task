import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // logErrorToMyService(error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return <h1>oops!! something went wrong</h1>;
    }

    return this.props.children;
  }
}
