import React, { type ReactNode } from 'react';

export interface ErrorBoundaryProps {
    children: ReactNode | ReactNode[];
}

export interface ErrorBoundaryState {
    hasError: boolean;
    errorMessage: string;
}

class ErrorBoundary extends React.Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            errorMessage: '',
        };
    }

    static getDerivedStateFromError(error: Error) {
        return {
            hasError: true,
            errorMessage: error.message,
        };
    }

    componentDidCatch(error: Error, errorInfo: object | Error | string) {
        console.error(error, errorInfo);
    }

    render() {
        const { hasError, errorMessage } = this.state;
        const { children } = this.props;

        if (hasError) {
            return <p className="text-red text-2xl">Error: {errorMessage}</p>;
        }

        return children;
    }
}

export default ErrorBoundary;
