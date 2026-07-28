import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}
interface ErrorState {
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, ErrorState> {
  state: ErrorState = { error: null };
  static getDerivedStateFromError(_error: Error) {
    return { error: _error };
  }

  render() {
    let content;

    if (this.state.error) {
      content = this.props.fallback ?? (
        <div role="alert">Something went wrong</div>
      );
    } else {
      content = this.props.children;
    }

    return content;
  }
}
