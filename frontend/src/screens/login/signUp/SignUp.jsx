import React, { useState } from "react";
import "./SignUp.css";
import vid from "../../../components/Media/Video/New1.mp4";

function SignUp() {
    const [mode, setMode] = useState(null); // null | 'salon' | 'customer'

    return (
        <div id="home-page-add-new">
            <div className="container-fluid intro-container">
                <video id="landing-vid" autoPlay loop muted playsInline src={vid} />

                {/* DEFAULT SPLIT VIEW */}
                {!mode && (
                    <div className="row text-center">
                        <div className="col-md-6 height100vh split-card salon">
                            <div className="split-overlay"></div>
                            <div className="split-content">
                                <span className="section-number">01</span>
                                <h1 className="section-practice">Luxury Salon</h1>
                                <p className="split-desc">
                                    Manage your salon effortlessly with smart scheduling, seamless
                                    client management, and tools designed for high-end beauty businesses.
                                </p>
                                <button className="dental-btn" onClick={() => setMode("salon")}>
                                    Salon Login
                                </button>
                            </div>
                        </div>

                        <div className="col-md-6 height100vh split-card customer">
                            <div className="split-overlay light"></div>
                            <div className="split-content">
                                <span className="section-number">02</span>
                                <h1 className="section-practice">Customers</h1>
                                <p className="split-desc">
                                    Discover, book, and enjoy premium beauty services from trusted
                                    luxury salons—crafted for comfort and convenience.
                                </p>
                                <button className="dental-btn-1" onClick={() => setMode("customer")}>
                                    Customer Login
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* FORM VIEW */}
               {/* FORM VIEW */}
{mode && (
  <div className="row form-layout">
    {/* LEFT INFO */}
    <div className="col-md-6 form-info">
      <h1>{mode === "salon" ? "Salon Portal" : "Customer Access"}</h1>
      <p>
        {mode === "salon"
          ? "Access powerful tools to manage appointments, staff, services, and grow your luxury salon brand."
          : "Sign in to book premium salon services, manage appointments, and enjoy a seamless beauty experience."}
      </p>

      <ul>
        <li>✔ Secure & private access</li>
        <li>✔ Premium experience</li>
        <li>✔ Smart scheduling</li>
      </ul>

      <button className="back-btn" onClick={() => setMode(null)}>
        ← Back
      </button>
    </div>

    {/* RIGHT GLASS FORM */}
    <div className="col-md-6 glass-form-wrapper">
      <div className="glass-card">
        <h2>{mode === "salon" ? "Salon Login" : "Customer Login"}</h2>
        <p className="glass-subtitle">
          Enter your credentials to continue
        </p>

        <input type="email" placeholder="Email address" />
        <input type="password" placeholder="Password" />

        <button className="glass-btn">
          {mode === "salon" ? "Login as Salon" : "Login as Customer"}
        </button>

        <span className="form-link">
          Don’t have an account? Sign up
        </span>
      </div>
    </div>
  </div>
)}

            </div>
        </div>
    );
}

export default SignUp;
