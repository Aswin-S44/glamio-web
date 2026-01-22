import React from "react";
import "./Services.css";

const servicesData = [
  {
    id: 1,
    title: "Hair Design",
    description:
      "Expert cuts, coloring, and styling tailored to your unique face shape and personality.",
    price: "Starts from $45",
    image:
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=2069&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Skin Rejuvenation",
    description:
      "Indulge in deep-cleansing facials and premium skin treatments for a natural, healthy glow.",
    price: "Starts from $60",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Bridal Couture",
    description:
      "Complete bridal makeup and hairstyling to make your special day absolutely unforgettable.",
    price: "Starts from $150",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=2071&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Nail Artistry",
    description:
      "Luxury manicures, gel extensions, and creative nail art using high-end organic polishes.",
    price: "Starts from $30",
    image:
      "https://images.unsplash.com/photo-1604654894610-df4906821603?q=80&w=1974&auto=format&fit=crop",
  },
];

function Services() {
  return (
    <section className="services" id="services">
      <div className="services-container">
        <div className="services-header">
          <span className="subtitle">Our Expertise</span>
          <h2 className="title">Luxury Services</h2>
          <div className="divider"></div>
        </div>

        <div className="services-grid">
          {servicesData.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-img-wrapper">
                <img src={service.image} alt={service.title} />
                <div className="price-tag">{service.price}</div>
              </div>
              <div className="service-info">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <button className="service-btn">Book Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
