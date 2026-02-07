import React, { useEffect, useState } from "react";
import "./ParlorDetailsScreen.css";
import { useParams } from "react-router-dom";
import { getReviews } from "../../../services/google.services";
import Header from "../../../components/Header/Header";

const ParlorDetailsScreen = () => {
  const [activeTab, setActiveTab] = useState("services");
  const [selectedImg, setSelectedImg] = useState(null);
  const { id } = useParams();

  const [parlour, setParlour] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchParlour = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:5000/api/v1/customer/shop/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        if (data) setParlour(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchParlour();
  }, [id]);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!parlour?.shop?.placeId) return;
      try {
        let res = await getReviews(parlour?.shop?.placeId);
        setReviews(res || []);
      } catch (error) {
        console.log("Error fetching reviews : ", error);
      }
    };
    fetchReviews();
  }, [parlour]);

  const fallbackImages = [
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80",
  ];

  const offers = [
    {
      id: 1,
      title: "First-time Client",
      discount: "20% OFF",
      code: "WELCOME20",
    },
    {
      id: 2,
      title: "Mid-week Special",
      discount: "Free Head Massage",
      code: "WEDVIBE",
    },
  ];

  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="details-page-wrapper">
      <Header />
      <div className="screens">
        <div className="details-container">
          <nav className="breadcrumbs">
            <a href="/">Home</a> <span>/</span>
            <a href="/parlors">Parlors</a> <span>/</span>
            <span className="current">
              {parlour?.shop?.parlourName || "Details"}
            </span>
          </nav>

          <section className="hero-section">
            <div className="gallery-grid">
              <div
                className="main-image"
                onClick={() => setSelectedImg(fallbackImages[0])}
              >
                <img src={fallbackImages[0]} alt="Parlor Main" />
              </div>
              <div className="side-images">
                {fallbackImages.slice(1).map((img, idx) => (
                  <div
                    key={idx}
                    className="thumb"
                    onClick={() => setSelectedImg(img)}
                  >
                    <img src={img} alt={`Thumb ${idx}`} />
                  </div>
                ))}
              </div>
            </div>

            <div className="info-card">
              <div className="info-header">
                <h1>{parlour?.shop?.parlourName}</h1>
                <div className="rating-badge">
                  <span className="star-icon">★</span>
                  <span className="rating-val">4.8</span>
                  <span className="reviews-val">(124 Reviews)</span>
                </div>
              </div>
              <p className="description">{parlour?.shop?.about}</p>
              <div className="info-footer">
                <button className="btn-primary main-book">
                  Book Appointment Now
                </button>
              </div>
            </div>
          </section>

          <div className="tabs-wrapper">
            <div className="tab-header">
              <button
                className={activeTab === "services" ? "active" : ""}
                onClick={() => setActiveTab("services")}
              >
                Services
              </button>
              <button
                className={activeTab === "reviews" ? "active" : ""}
                onClick={() => setActiveTab("reviews")}
              >
                Reviews
              </button>
              <button
                className={activeTab === "offers" ? "active" : ""}
                onClick={() => setActiveTab("offers")}
              >
                Offers
              </button>
            </div>

            <div className="tab-content">
              {activeTab === "services" && (
                <div className="services-grid">
                  {parlour?.services?.length === 0 ? (
                    <div className="empty-state">No services available</div>
                  ) : (
                    parlour?.services?.map((service) => (
                      <div key={service.id} className="service-card">
                        <div className="service-info">
                          <h3>{service.name}</h3>
                          <div className="service-meta">
                            <span className="duration">{service.duration}</span>
                            <span className="dot">•</span>
                            <span className="price">{service.rate}</span>
                          </div>
                        </div>
                        <button
                          className="btn-outline"
                          onClick={() => {
                            window.location.href = `/parlour/service?category=${service.categoryId}&service=${service.id}&shop=${service?.shopId}`;
                          }}
                        >
                          Book
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="reviews-container">
                  {reviews.length === 0 ? (
                    <div className="empty-state">No reviews yet</div>
                  ) : (
                    reviews.map((review, idx) => (
                      <div key={idx} className="review-card">
                        <div className="review-user">
                          <div className="avatar">{review.author_name[0]}</div>
                          <div>
                            <h4>{review.author_name}</h4>
                            <div className="stars">
                              {"★".repeat(review.rating)}
                              {"☆".repeat(5 - review.rating)}
                            </div>
                          </div>
                        </div>
                        <p>{review.text}</p>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === "offers" && (
                <div className="offers-grid">
                  {offers.map((offer) => (
                    <div key={offer.id} className="promo-card">
                      <div className="promo-icon">🎁</div>
                      <h4>{offer.title}</h4>
                      <div className="discount-tag">{offer.discount}</div>
                      <div className="promo-code">
                        <span>CODE:</span>
                        <code>{offer.code}</code>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {selectedImg && (
            <div className="lightbox" onClick={() => setSelectedImg(null)}>
              <div className="lightbox-content">
                <img src={selectedImg} alt="Enlarged" />
                <button className="close-btn">&times;</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParlorDetailsScreen;
