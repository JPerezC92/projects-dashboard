import { Component } from "react";
import { Link } from "react-router-dom";

export class ErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean }> {
	state = { hasError: false };

	static getDerivedStateFromError(_: Error) {
		return { hasError: true };
	}

	public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error("Uncaught error:", error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return (
				<>
					<h2>Something went wrong.</h2>
					<Link to="/" onClick={this.resetError.bind(this)}>
						Return to home page
					</Link>
				</>
			);
		}

		return this.props.children;
	}

	private resetError() {
		this.setState({ hasError: false });
	}
}
