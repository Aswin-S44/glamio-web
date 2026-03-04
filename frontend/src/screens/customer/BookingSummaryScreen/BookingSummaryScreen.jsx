import React, { useEffect, useState } from "react";
import "./BookingSummaryScreen.css";
import Header from "../../../components/Header/Header";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import Swal from "sweetalert2";

function BookingSummaryScreen() {
  const [searchParams] = useSearchParams();
  const [summaryData, setSummaryData] = useState(null); // Changed from 'shop' to 'summaryData' for clarity
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Extract URL parameters
  const shopId = Number(searchParams.get("shopId"));
  const slotId = Number(searchParams.get("slotId"));
  const expertId = Number(searchParams.get("expertId"));
  const rawServiceId = searchParams.get("serviceId");

  const token = localStorage.getItem("token");

  // Format service IDs for the API call
  const serviceIds = rawServiceId
    ? rawServiceId.split(",").map(Number).filter(Boolean)
    : [];

  useEffect(() => {
    const fetchOrderSummary = async () => {
      try {
        setLoading(true);
        // Using the rawServiceId string directly in query params is usually safer for APIs
        const res = await fetch(
          `http://localhost:5000/api/v1/customer/order/summary/${shopId}/${slotId}/${expertId}?serviceId=${rawServiceId}`,
          {
            method: "GET",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch booking summary");
        }

        const data = await res.json();
        setSummaryData(data);
      } catch (error) {
        console.error("Error fetching summary:", error);
      } finally {
        setLoading(false);
      }
    };

    if (shopId && slotId && expertId) {
      fetchOrderSummary();
    }
  }, [shopId, slotId, expertId, rawServiceId]);

  // Helper function to format Date (e.g., "Tuesday, Feb 10, 2026")
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Helper function to format Time (e.g., "04:04 AM")
  const formatTime = (timeString) => {
    if (!timeString) return "";
    const [hours, minutes] = timeString.split(":");
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Calculate Taxes based on API totalRate
  const subtotal = summaryData?.totalRate || 0;

  const tax = subtotal;
  const totalAmount = subtotal + tax;

  const submitAppointment = async (e) => {
    e.preventDefault();
    let submitData = {
      shopId,
      slotId,
      expertId,
      serviceIds,
    }; 

    const res = await fetch("http://localhost:5000/api/v1/customer/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(submitData),
    });

    if (res && res.status == 201) {
      Swal.fire({
        title: "Successfully booked!",
        text: "Your booking has been created.",
        icon: "success",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Booking failed",
        text: "You already have an appointment pending with this shop",
      });
    }
  };

  return (
    <div className="screens">
      <Header />
      <div className="summary-container">
        {loading ? (
          <div className="loading-state">Loading booking details...</div>
        ) : !summaryData ? (
          <div className="error-state">No booking details found!</div>
        ) : (
          <div className="summary-card">
            <div className="summary-header">
              <h1>Booking Summary</h1>
              <p>Please review your appointment details</p>
            </div>

            {/* Main Service Info */}
            <div className="summary-section main-service">
              <div className="service-icon">✨</div>
              <div className="service-info">
                {/* Map through all services if there are multiple */}
                <h3>{summaryData.services.map((s) => s.name).join(", ")}</h3>
                <span className="shop-name">
                  {summaryData.shop.parlourName}
                </span>
                <p className="shop-address">{summaryData.shop.address}</p>
              </div>
              <div className="service-price">{subtotal.toFixed(2)}</div>
            </div>

            <div className="details-grid">
              {/* Expert Details */}
              <div className="detail-item">
                <label>Expert</label>
                <div className="expert-mini-profile">
                  <img
                    src={
                      summaryData.expert.image ||
                      "https://via.placeholder.com/150"
                    }
                    alt={summaryData.expert.name}
                  />
                  <div>
                    <strong>{summaryData.expert.name}</strong>
                    <p>{summaryData.expert.specialist} Specialist</p>
                  </div>
                </div>
              </div>

              {/* Date & Time Details */}
              <div className="detail-item">
                <label>Date & Time</label>
                <div className="time-info">
                  <div className="info-row">
                    <span className="icon">📅</span>
                    <strong>{formatDate(summaryData.slot.slotDate)}</strong>
                  </div>
                  <div className="info-row">
                    <span className="icon">⏰</span>
                    <strong>{formatTime(summaryData.slot.startTime)}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Breakdown */}
            <div className="payment-breakdown">
              <div className="breakdown-row">
                <span>Subtotal</span>
                <span>{subtotal.toFixed(2)}</span>
              </div>
              {/* <div className="breakdown-row">
                <span>Service Fee (10%)</span>
                <span>{tax.toFixed(2)}</span>
              </div> */}
              <div className="breakdown-row total">
                <span>Total Amount</span>
                <span>{subtotal}</span>
              </div>
            </div>

            <div className="policy-note">
              <p>
                By confirming, you agree to our <span>Cancellation Policy</span>
                . Please arrive 10 minutes before your scheduled time.
              </p>
            </div>

            <div className="summary-actions">
              <button className="btn-confirm" onClick={submitAppointment}>
                Confirm Appointment
              </button>
              <button
                className="btn-back"
                onClick={() => window.history.back()}
              >
                Modify Booking
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingSummaryScreen;
