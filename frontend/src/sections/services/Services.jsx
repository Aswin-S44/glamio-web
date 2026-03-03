import React, { useEffect, useState } from "react";
import "./Services.css";
import { DEFAULT_NO_IMAGE } from "../../constants/urls";

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchServics = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:5000/api/v1/customer/services`
        );
        setLoading(false);
        const data = await res.json();
        if (data && data.length > 0) {
          setServices(data);
        }
      } catch (error) {}
    };
    fetchServics();
  }, []);

  return (
    <section className="services" id="services">
      {loading ? (
        <div className="status-message">Loading....</div>
      ) : services.length === 0 ? (
        <div className="status-message">No services available</div>
      ) : (
        <div className="services-container">
          <div className="services-header">
            <span className="subtitle">Our Expertise</span>
            <h2 className="title">Luxury Services</h2>
          </div>

          <div className="services-grid">
            {services.map((service) => (
              <div
                key={service.id}
                className="service-card"
                onClick={() => (window.location.href = `/parlour/`)}
              >
                <div className="service-img-wrapper">
                  <img
                    src={service?.imageUrl ?? DEFAULT_NO_IMAGE}
                    alt={service?.categoryName ?? ""}
                  />
                  <div className="price-tag">{service?.rate ?? ""}</div>
                </div>
                <div className="service-info">
                  <h3>{service?.name ?? ""}</h3>
                  <p>{service.description}</p>
                  <button className="service-btn">Book Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default Services;
