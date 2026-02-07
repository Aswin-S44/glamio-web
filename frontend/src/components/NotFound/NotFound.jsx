import React from "react";
import { Search, Home, ArrowLeft } from "lucide-react";
import "./NotFound.css";

function NotFound() {
  const handleGoBack = () => {
    window.history.back();
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="lux-nf-wrapper">
      <div className="lux-nf-card">
        <div className="lux-nf-visual">
          <div className="lux-nf-circle">
            <Search
              size={80}
              strokeWidth={1.5}
              className="lux-nf-search-icon"
            />
            <div className="lux-nf-dot"></div>
          </div>
          <h1 className="lux-nf-title">404</h1>
        </div>

        <div className="lux-nf-info">
          <h2>Page Not Found</h2>
          <p>
            The treatment or page you are looking for doesn't exist or has been
            moved to a new location.
          </p>
        </div>

        <div className="lux-nf-actions">
          <button onClick={handleGoHome} className="lux-nf-btn primary">
            <Home size={20} />
            Back to Dashboard
          </button>
          <button onClick={handleGoBack} className="lux-nf-btn secondary">
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>
      </div>

      <div className="lux-nf-bg-elements">
        <div className="bg-blob"></div>
        <div className="bg-blob-2"></div>
      </div>
    </div>
  );
}

export default NotFound;
