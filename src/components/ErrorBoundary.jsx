import { Link } from "react-router-dom";
import { Component } from "react";


export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("🔥 UI Crash:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold mb-4">500</h1>
          <p className="mb-6">Terjadi kesalahan pada aplikasi</p>
          <Link to="/" className="text-main-primary">
            Kembali ke Home
          </Link>
        </div>
      );
    }

    return this.props.children;
  }
}
