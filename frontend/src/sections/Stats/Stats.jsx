import React from "react";
import "./Stats.css";

function Stats() {
    return (
        <section className="stats-section">
            <div className="stats-overlay"></div>
            <div className="stats-container">
                
                <div className="stat">
                    <h3>10+</h3>
                    <p>Years Experience</p>
                </div>
                <div className="stat">
                    <h3>20K+</h3>
                    <p>Happy Clients</p>
                </div>
                <div className="stat">
                    <h3>50+</h3>
                    <p>Expert Stylists</p>
                </div>
                <div className="stat">
                    <h3>4.9★</h3>
                    <p>Customer Rating</p>
                </div>
            </div>
        </section>
    );
}

export default Stats;
