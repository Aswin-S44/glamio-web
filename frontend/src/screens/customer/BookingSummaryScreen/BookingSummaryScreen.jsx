import React from "react";
import "./BookingSummaryScreen.css";

function BookingSummaryScreen() {
  const bookingData = {
    service: "Bridal Makeup & Styling",
    price: 120.0,
    expert: {
      name: "Sophia",
      role: "Hair Stylist",
      img: "https://i.pravatar.cc/150?u=1",
    },
    date: "Wednesday, Oct 25, 2023",
    time: "10:30 AM",
    location: "Main Street Branch, Suite 4",
  };

  const tax = bookingData.price * 0.1;
  const total = bookingData.price + tax;

  return (
    <div className="summary-container">
      <div className="summary-card">
        <div className="summary-header">
          <h1>Booking Summary</h1>
          <p>Please review your appointment details</p>
        </div>

        <div className="summary-section main-service">
          <div className="service-icon">✨</div>
          <div className="service-info">
            <h3>{bookingData.service}</h3>
            <span>{bookingData.location}</span>
          </div>
          <div className="service-price">${bookingData.price.toFixed(2)}</div>
        </div>

        <div className="details-grid">
          <div className="detail-item">
            <label>Expert</label>
            <div className="expert-mini-profile">
              <img src={bookingData.expert.img} alt={bookingData.expert.name} />
              <div>
                <strong>{bookingData.expert.name}</strong>
                <p>{bookingData.expert.role}</p>
              </div>
            </div>
          </div>

          <div className="detail-item">
            <label>Date & Time</label>
            <div className="time-info">
              <div className="info-row">
                <span className="icon">📅</span>
                <strong>{bookingData.date}</strong>
              </div>
              <div className="info-row">
                <span className="icon">⏰</span>
                <strong>{bookingData.time}</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="payment-breakdown">
          <div className="breakdown-row">
            <span>Subtotal</span>
            <span>${bookingData.price.toFixed(2)}</span>
          </div>
          <div className="breakdown-row">
            <span>Service Fee (10%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="breakdown-row total">
            <span>Total Amount</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="policy-note">
          <p>
            By confirming, you agree to our <span>Cancellation Policy</span>.
            Please arrive 10 minutes before your scheduled time.
          </p>
        </div>

        <div className="summary-actions">
          <button className="btn-confirm">Confirm Appointment</button>
          <button className="btn-back">Modify Booking</button>
        </div>
      </div>
    </div>
  );
}

export default BookingSummaryScreen;
