import { Component, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

interface Props {
  children: ReactNode;
  locationKey?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
  componentStack: string | null;
}

class ErrorBoundaryInner extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, componentStack: null };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidUpdate(prevProps: Props) {
    if (this.state.hasError && prevProps.locationKey !== this.props.locationKey) {
      this.setState({ hasError: false, error: null, componentStack: null });
    }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info.componentStack);
    this.setState({ componentStack: info.componentStack || null });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="pt-32 pb-20 text-center px-6">
          <h1 className="text-[48px] font-rajdhani font-bold text-[#1B1B1B] mb-4">
            Erreur de chargement
          </h1>
          <p className="text-[#1B1B1B]/70 mb-6 max-w-lg mx-auto">
            {this.state.error?.message || "Une erreur inattendue s'est produite."}
          </p>
          {this.state.componentStack && (
            <pre className="text-left text-[11px] bg-gray-100 rounded-xl p-4 max-w-2xl mx-auto mb-6 overflow-x-auto max-h-48 overflow-y-auto text-gray-600">
              {this.state.componentStack}
            </pre>
          )}
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-[#E40714] text-white rounded-xl font-bold hover:bg-[#C00612] transition-colors"
            onClick={() => this.setState({ hasError: false, error: null, componentStack: null })}
          >
            Retour à l'accueil
          </Link>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function ErrorBoundary({ children }: { children: ReactNode }) {
  const location = useLocation();
  return (
    <ErrorBoundaryInner locationKey={location.pathname}>
      {children}
    </ErrorBoundaryInner>
  );
}
