import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}
interface ErrorState {
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, ErrorState> {
  state: ErrorState = { error: null };
  componentDidCatch(_error: Error, _info: ErrorInfo) {
    console.log("ErrorBoundary caught an error:", _error);
  }

  static getDerivedStateFromError(_error: Error) {
    return { error: _error };
  }

  render() {
    return this.state.error ? (
      this.props.fallback ? (
        this.props.fallback
      ) : (
        <div role="alert">Something went wrong</div>
      )
    ) : (
      this.props.children
    );
  }
}
