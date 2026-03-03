import React, { useEffect, useState, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import { DEFAULT_NO_IMAGE } from "../../../constants/urls";
import "./ParlorDetailsScreen.css";

const DUMMY_DATA = {
  shop: {
    parlourName: "Aura Ladies and Kids Beauty Parlour and Bridal Studio",
    rating: 4.8,
    address:
      "First Floor, City Tower, PO, Kondotty Bypass Rd, Kondotty, Kerala 673638",
    about:
      "We believe beauty is about confidence, care, and self-expression. Our team of experienced professionals is dedicated to delivering high-quality beauty services using premium products and the latest techniques.",
    images: [DEFAULT_NO_IMAGE],
  },
  services: [
    { id: 1, name: "Signature Haircut", duration: "45 mins", rate: "₹799" },
    { id: 2, name: "Hydrating Facial", duration: "60 mins", rate: "₹1,499" },
    { id: 3, name: "Hair Spa Therapy", duration: "90 mins", rate: "₹2,299" },
    { id: 4, name: "Bridal Makeup", duration: "120 mins", rate: "₹9,999" },
  ],
};

const ParlorDetailsScreen = () => {
  const { id } = useParams();
  const [parlour, setParlour] = useState(null);
  const [images, setImages] = useState([DEFAULT_NO_IMAGE]);
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState("services");
  const [selectedImg, setSelectedImg] = useState(null);
  const [loading, setLoading] = useState(false);

  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const [hasMoreReviews, setHasMoreReviews] = useState(true);
  const [page, setPage] = useState(1);
  const observer = useRef();

  const fetchParlourDetails = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:5000/api/v1/customer/shop/${id}`
      );
      setLoading(false);
      if (!res.ok) throw new Error("Shop fetch failed");
      const data = await res.json();
      setParlour(data);
    } catch (err) {
      console.error(err);
    }
  }, [id]);

  const fetchReviewsAndImages = useCallback(
    async (placeId, isInitial = false) => {
      if (isLoadingReviews || (!hasMoreReviews && !isInitial)) return;

      setIsLoadingReviews(true);
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:5000/api/v1/customer/reviews/${placeId}?page=${
            isInitial ? 1 : page
          }`
        );
        setLoading(false);
        if (!res.ok) throw new Error("Reviews fetch failed");
        const data = await res.json();

        if (isInitial) {
          if (data?.images?.length > 0) setImages(data.images);
          setReviews(data?.reviews || []);
        } else {
          setReviews((prev) => [...prev, ...(data?.reviews || [])]);
        }

        if (!data?.reviews || data.reviews.length < 5) {
          setHasMoreReviews(false);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoadingReviews(false);
      }
    },
    [page, isLoadingReviews, hasMoreReviews]
  );

  useEffect(() => {
    fetchParlourDetails();
  }, [fetchParlourDetails]);

  useEffect(() => {
    if (parlour?.shop?.placeId) {
      fetchReviewsAndImages(parlour.shop.placeId, true);
    }
  }, [parlour?.shop?.placeId]);

  const lastReviewElementRef = useCallback(
    (node) => {
      if (isLoadingReviews) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMoreReviews) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoadingReviews, hasMoreReviews]
  );

  useEffect(() => {
    if (page > 1 && parlour?.shop?.placeId) {
      fetchReviewsAndImages(parlour.shop.placeId);
    }
  }, [page]);

  const displayData = parlour || DUMMY_DATA;
  const displayImages = images.length > 0 ? images : displayData.shop.images;

  return (
    <>
      <Header />
      <div className="parlor-page">
        {loading ? (
          <>Loading....</>
        ) : (
          <>
            <section className="top-section">
              <div className="gallery-container">
                <div
                  className="gallery-main"
                  onClick={() => setSelectedImg(displayImages[0])}
                >
                  <img src={displayImages[0] || DEFAULT_NO_IMAGE} alt="Main" />
                </div>
                <div className="gallery-thumbs">
                  {displayImages.slice(1, 9).map((img, i) => (
                    <div
                      key={i}
                      className="thumb-wrapper"
                      onClick={() => setSelectedImg(img)}
                    >
                      <img src={img} alt={`Thumbnail ${i}`} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="details-container">
                <h1 className="parlor-title">{displayData.shop.parlourName}</h1>
                <div className="rating-info">
                  <span className="star-icon">⭐</span>
                  <span className="rating-val">{displayData.shop.rating}</span>
                  <span className="review-count">
                    ({reviews.length}+ reviews)
                  </span>
                </div>
                <p className="address-text">{displayData.shop.address}</p>
                <div className="highlight-pills">
                  <span>🕒 Open: 10 AM – 9 PM</span>
                  <span>💰 Price: ₹₹</span>
                  <span>📍 City Center</span>
                </div>
                <p className="description-text">{displayData.shop.about}</p>
                <button className="cta-button primary-bg">
                  Book Appointment
                </button>
              </div>
            </section>

            <section className="content-tabs-section">
              <div className="tab-pill-container">
                {["services", "reviews", "about"].map((tab) => (
                  <button
                    key={tab}
                    className={`tab-pill ${activeTab === tab ? "active" : ""}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab === "services" && "💇 Services"}
                    {tab === "reviews" && "⭐ Reviews"}
                    {tab === "about" && "ℹ About"}
                  </button>
                ))}
              </div>

              <div className="active-tab-content">
                {activeTab === "services" && (
                  <div className="grid-list">
                    {displayData.services.map((service) => (
                      <div key={service.id} className="item-card shadow-sm">
                        <div className="icon-box">✨</div>
                        <div className="item-details">
                          <h3>{service.name}</h3>
                          <p>{service.duration}</p>
                        </div>
                        <div className="item-action">
                          <span className="price-tag">{service.rate}</span>
                          <button
                            className="action-btn"
                            onClick={() => {
                              window.location.href = `/parlor/${service?.shopId}/service/${service?.id}`;
                            }}
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="grid-list">
                    {reviews.map((r, i) => (
                      <div
                        key={i}
                        ref={
                          i === reviews.length - 1 ? lastReviewElementRef : null
                        }
                        className="item-card shadow-sm"
                      >
                        <div className="avatar-circle">
                          {r.profile_photo_url ? (
                            <img
                              src={r.profile_photo_url}
                              alt={r.author_name}
                              className="avatar-img"
                            />
                          ) : (
                            r.author_name[0]
                          )}
                        </div>
                        <div className="review-content">
                          <p className="author-name">{r.author_name}</p>
                          <div className="star-rating">
                            {"⭐".repeat(r.rating)}
                          </div>
                          <p className="review-text">{r.text}</p>
                          {r.relative_time_description && (
                            <span className="review-time">
                              {r.relative_time_description}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                    {isLoadingReviews && (
                      <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Loading reviews...</p>
                      </div>
                    )}
                    {!hasMoreReviews && reviews.length > 0 && (
                      <p className="end-message">No more reviews to show.</p>
                    )}
                  </div>
                )}

                {activeTab === "about" && (
                  <div className="about-grid">
                    <div className="about-info">
                      <h3>Why Choose Us</h3>
                      <p>{displayData.shop.about}</p>
                      <ul className="feature-list">
                        <li>✔ Certified & experienced professionals</li>
                        <li>✔ Premium international products</li>
                        <li>✔ Hygienic & relaxing ambience</li>
                      </ul>
                    </div>
                    <div className="stats-column">
                      <div className="stat-card">
                        <strong>10+</strong>
                        <span>Years Experience</span>
                      </div>
                      <div className="stat-card">
                        <strong>5K+</strong>
                        <span>Happy Clients</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>

            <section className="location-section">
              <h2>Location</h2>
              <div className="map-frame-wrapper">
                <iframe
                  title="map"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    displayData.shop.address
                  )}&output=embed`}
                  loading="lazy"
                />
              </div>
            </section>

            {selectedImg && (
              <div
                className="image-lightbox"
                onClick={() => setSelectedImg(null)}
              >
                <div className="lightbox-content">
                  <img src={selectedImg} alt="Enlarged view" />
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ParlorDetailsScreen;
