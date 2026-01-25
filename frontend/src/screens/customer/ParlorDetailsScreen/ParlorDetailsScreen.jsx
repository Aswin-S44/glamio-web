import React, { useEffect, useState } from "react";
import "./ParlorDetailsScreen.css";
import { useParams } from "react-router-dom";
import { getReviews } from "../../../services/google.services";

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
      const res = await fetch(
        `http://localhost:5000/api/v1/customer/shop/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);
      if (!res.ok) {
        throw new Error("Failed to fetch parlour details");
      }

      const data = await res.json();
      if (data) {
        setParlour(data);
      }
    };
    fetchParlour();
  }, [id]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        let res = await getReviews(parlour?.shop?.placeId);
        console.log("reviewa------------", res);
      } catch (error) {
        console.log("Error fetching reviews : ", error);
      }
    };
    fetchReviews();
  }, [parlour]);

  const parlorData = {
    name: "Glow & Grace Studio",
    description:
      "Experience premium beauty treatments in a serene environment. Our expert stylists and therapists use high-end organic products to ensure you look and feel your best. From contemporary haircuts to rejuvenating facials, we offer a comprehensive range of services tailored to your needs.",
    rating: 4.8,
    reviewsCount: 124,
    images: [
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80",
    ],
    services: [
      { id: 1, name: "Signature Haircut", price: "$45", duration: "45 mins" },
      { id: 2, name: "Hydrating Facial", price: "$80", duration: "60 mins" },
      { id: 3, name: "Gel Manicure", price: "$35", duration: "40 mins" },
      { id: 4, name: "Balayage Coloring", price: "$120", duration: "120 mins" },
    ],
    reviews: [
      {
        id: 1,
        user: "Sarah J.",
        rating: 5,
        comment:
          "Best service I've had in years! The staff is so professional.",
      },
      {
        id: 2,
        user: "Mike R.",
        rating: 4,
        comment: "Great atmosphere and very clean. My haircut was perfect.",
      },
    ],
    offers: [
      {
        id: 1,
        title: "First-time Client",
        discount: "20% OFF",
        code: "WELCOME20",
      },
      {
        id: 2,
        title: "Mid-week Special",
        discount: "Free Head Massage with any Facial",
        code: "WEDVIBE",
      },
    ],
  };

  return (
    <div className="screens">
      <div className="details-container">
        <>
          {loading ? (
            <>Loading....</>
          ) : (
            <>
              {console.log("parlour--------------", parlour)}
              <nav className="breadcrumbs">
                <a href="/">Home</a> <span>/</span>
                <a href="/parlors">Parlors</a> <span>/</span>
                <span className="current">{parlorData.name}</span>
              </nav>

              <section className="hero-section">
                <div className="gallery-grid">
                  <div
                    className="main-image"
                    onClick={() => setSelectedImg(parlorData.images[0])}
                  >
                    <img src={parlorData.images[0]} alt="Parlor Main" />
                  </div>
                  <div className="side-images">
                    {parlorData.images.slice(1).map((img, idx) => (
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
                  <h1>{parlour?.shop?.parlourName}</h1>
                  <div className="rating">
                    <span className="stars">★★★★★</span>
                    <span className="count">
                      ({parlorData.reviewsCount} Reviews)
                    </span>
                  </div>
                  <p className="description">{parlour?.shop?.about}</p>
                  <button className="btn-primary main-book">
                    Book Appointment Now
                  </button>
                </div>
              </section>

              <div className="tabs-container">
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
                    <div className="services-list">
                      {parlour?.services?.length == 0 ? (
                        <>No services available</>
                      ) : (
                        parlour?.services?.map((service) => (
                          <div key={service.id} className="service-item">
                            <div className="service-info">
                              <h3>{service.name}</h3>
                              <span>
                                {service.duration} • {service.price}
                              </span>
                            </div>
                            <button
                              className="btn-outline"
                              onClick={() => {
                                window.location.href =
                                  "/parlour/service?category=hair_cut";
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
                    <div className="reviews-list">
                      {parlorData.reviews.map((review) => (
                        <div key={review.id} className="review-item">
                          <strong>{review.user}</strong>
                          <div className="review-stars">
                            {"★".repeat(review.rating)}
                          </div>
                          <p>{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === "offers" && (
                    <div className="offers-list">
                      {parlorData.offers.map((offer) => (
                        <div key={offer.id} className="offer-card">
                          <h4>{offer.title}</h4>
                          <div className="discount">{offer.discount}</div>
                          <code>Code: {offer.code}</code>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {selectedImg && (
                <div className="lightbox" onClick={() => setSelectedImg(null)}>
                  <img src={selectedImg} alt="Enlarged view" />
                  <span className="close">&times;</span>
                </div>
              )}
            </>
          )}
        </>
      </div>
    </div>
  );
};

export default ParlorDetailsScreen;
