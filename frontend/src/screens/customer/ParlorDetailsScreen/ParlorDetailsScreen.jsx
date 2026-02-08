import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ParlorDetailsScreen.css";
import { getReviews } from "../../../services/google.services";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";

const DUMMY_DATA = {
  shop: {
    parlourName: "Glow & Grace Beauty Studio",
    rating: 4.8,
    address: "12, MG Road, Indiranagar, Bengaluru",
    about:
      "Glow & Grace is a premium beauty studio offering expert hair, skin, and wellness services in a calm and luxurious environment. Our professionals use top-quality products to ensure the best experience.Glow & Grace is a premium beauty studio offering expert hair, skin, and wellness services in a calm and luxurious environment. Our professionals use top-quality products to ensure the best experience. Join us for a relaxing and rejuvenating experience. Welcome to Glow & Grace Beauty Studio! ",
    images: [
      "https://images.unsplash.com/photo-1560066984-138dadb4c035",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
      "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6",
      "https://images.unsplash.com/photo-1562322140-8baeececf3df",
      "https://images.unsplash.com/photo-1600948836101-f9ffda59d250"
    ]
  },
  services: [
    { id: 1, name: "Signature Haircut", duration: "45 mins", rate: "₹799" },
    { id: 2, name: "Hydrating Facial", duration: "60 mins", rate: "₹1,499" },
    { id: 3, name: "Hair Spa Therapy", duration: "90 mins", rate: "₹2,299" },
    { id: 4, name: "Bridal Makeup", duration: "120 mins", rate: "₹9,999" }
  ]
};

const ParlorDetailsScreen = () => {
  const { id } = useParams();

  const [parlour, setParlour] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState("services");
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    const fetchParlour = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/v1/customer/shop/${id}`
        );
        const data = await res.json();
        setParlour(data);
      } catch (err) {
        console.log("API failed, using dummy data");
      }
    };
    fetchParlour();
  }, [id]);

  useEffect(() => {
    if (!parlour?.shop?.placeId) return;
    getReviews(parlour.shop.placeId)
      .then(res => setReviews(res || []))
      .catch(() => {});
  }, [parlour]);

  const data = parlour || DUMMY_DATA;

  return (<>
  <Header />
    <div className="parlor-page">
      {/* TOP */}
      <section className="top-section">
        {/* LEFT - GALLERY */}
        <div className="gallery">
          <div
            className="gallery-main"
            onClick={() => setSelectedImg(data.shop.images[0])}
          >
            <img src={data.shop.images[0]} alt="" />
          </div>

          <div className="gallery-thumbs">
            {data.shop.images.slice(1).map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                onClick={() => setSelectedImg(img)}
              />
            ))}
          </div>
        </div>

        {/* RIGHT - DETAILS */}
        <div className="details">
          <h1>{data.shop.parlourName}</h1>

          <div className="rating-row">
            ⭐ {data.shop.rating}
            <span>({reviews.length || 124} reviews)</span>
          </div>

          <p className="address">{data.shop.address}</p>

          <div className="highlights">
            <span>🕒 Open: 10 AM – 9 PM</span>
            <span>💰 Price: ₹₹</span>
            <span>📍 City Center</span>
          </div>

          <p className="about">{data.shop.about}</p>

          <button className="book-btn">Book Appointment</button>
        </div>
      </section>

      {/* TABS */}
  <section className="tabs premium-tabs">
  <div className="tab-header pill-tabs">
    {["services", "reviews", "about"].map(tab => (
      <button
        key={tab}
        className={activeTab === tab ? "active" : ""}
        onClick={() => setActiveTab(tab)}
      >
        {tab === "services" && "💇 Services"}
        {tab === "reviews" && "⭐ Reviews"}
        {tab === "about" && "ℹ About"}
      </button>
    ))}
  </div>

  <div className="tab-content premium-content">
    {/* SERVICES */}
    {activeTab === "services" && (
      <div className="service-cards">
        {data.services.map(service => (
          <div key={service.id} className="service-card premium">
            <div className="service-icon">✨</div>

            <div className="service-info">
              <h3>{service.name}</h3>
              <p>{service.duration}</p>
            </div>

            <div className="service-action">
              <span style={{marginRight:"20px"}}>{service.rate}</span>
              <button>Book Now</button>
            </div>
          </div>
        ))}
      </div>
    )}

    {/* REVIEWS */}
    {activeTab === "reviews" && (
      <div className="review-cards">
        {(reviews.length ? reviews : [
          { author_name: "Ananya", rating: 5, text: "Amazing service and super hygienic!" },
          { author_name: "Rahul", rating: 4, text: "Stylists are very professional." },
          { author_name: "Meera", rating: 5, text: "Loved the ambience and quality." }
        ]).map((r, i) => (
          <div key={i} className="review-card premium">
            <div className="review-avatar">
              {r.author_name[0]}
            </div>

            <div className="review-body">
              <strong>{r.author_name}</strong>
              <div className="stars">{"⭐".repeat(r.rating)}</div>
              <p>{r.text}</p>
            </div>
          </div>
        ))}
      </div>
    )}

    {/* ABOUT */}
    {activeTab === "about" && (
      <div className="about-premium">
        <div className="about-left">
          <h3>Why Choose Us</h3>
          <p>{data.shop.about}</p>

          <ul>
            <li>✔ Certified & experienced professionals</li>
            <li>✔ Premium international products</li>
            <li>✔ Hygienic & relaxing ambience</li>
            <li>✔ Personalized consultation</li>
          </ul>
        </div>

        <div className="about-right">
          <div className="stat">
            <strong>10+</strong>
            <span>Years Experience</span>
          </div>
          <div className="stat">
            <strong>5K+</strong>
            <span>Happy Clients</span>
          </div>
          <div className="stat">
            <strong>50+</strong>
            <span>Expert Stylists</span>
          </div>
        </div>
      </div>
    )}
  </div>
</section>


      {/* MAP */}
      <section className="map">
        <h2>Location</h2>
        <iframe
          title="map"
          src={`https://www.google.com/maps?q=${encodeURIComponent(
            data.shop.address
          )}&output=embed`}
          loading="lazy"
        />
      </section>

      {/* LIGHTBOX */}
      {selectedImg && (
        <div className="lightbox" onClick={() => setSelectedImg(null)}>
          <img src={selectedImg} alt="" />
        </div>
      )}
    </div>
    <Footer /></>
  );
};

export default ParlorDetailsScreen;
