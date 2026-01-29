import React from "react";
import "./WhyChooseUs.css";

function WhyChooseUs() {
    return (
        <section className="why-section">
            <div className="why-container">
                <h2 className="title">Why Choose Us</h2>

                <div className="why-grid">
                    <div className="why-card">
                        <div className="why-icon premium"></div>
                        <h3>Premium Products</h3>
                        <p>We use only high-end organic and dermatologist-approved products.</p>
                    </div>

                    <div className="why-card">
                        <div className="why-icon expert"></div>
                        <h3>Expert Stylists</h3>
                        <p>Certified professionals with years of luxury salon experience.</p>
                    </div>

                    <div className="why-card">
                        <div className="why-icon ambience"></div>
                        <h3>Luxury Ambience</h3>
                        <p>Relax in a calm, hygienic, and beautifully designed environment.</p>
                    </div>

                    <div className="why-card">
                        <div className="why-icon care"></div>
                        <h3>Personal Care</h3>
                        <p>Every treatment is customized for your skin & hair type.</p>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default WhyChooseUs;
