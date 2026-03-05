import React, { useEffect, useState, useMemo } from "react";
import Swal from "sweetalert2";
import {
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Eye,
  Calendar,
  Clock,
  User,
  Scissors,
  MoreVertical,
  ChevronRight,
  ArrowUpDown,
} from "lucide-react";
import "./UserRequests.css";
import NotFound from "../../components/NotFound/NotFound";

const STATUS = {
  1: { label: "Pending", class: "status-pending" },
  2: { label: "Approved", class: "status-approved" },
  3: { label: "Rejected", class: "status-rejected" },
};

function UserRequests() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const [selected, setSelected] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUserRequests();
  }, [token]);

  const fetchUserRequests = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/v1/appointments`, {
        headers: { Authorization: `${token}` },
      });
      const data = await res.json();
      if (data.appointments) {
        setAppointments(data.appointments);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAndSortedData = useMemo(() => {
    let result = [...appointments];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (item) =>
          item.customer.username.toLowerCase().includes(term) ||
          item.appointment.id.toString().includes(term) ||
          item.expert.name.toLowerCase().includes(term)
      );
    }

    if (statusFilter !== "all") {
      result = result.filter(
        (item) => item.appointment.statusId.toString() === statusFilter
      );
    }

    result.sort((a, b) => {
      if (sortBy === "newest")
        return (
          new Date(b.appointment.createdAt) - new Date(a.appointment.createdAt)
        );
      if (sortBy === "oldest")
        return (
          new Date(a.appointment.createdAt) - new Date(b.appointment.createdAt)
        );
      if (sortBy === "price") return b.appointment.rate - a.appointment.rate;
      return 0;
    });

    return result;
  }, [appointments, searchTerm, statusFilter, sortBy]);

  const handleApprove = (id) => {
    Swal.fire({
      title: "Confirm Approval",
      text: "Do you want to approve this appointment request?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#d4a373", // Matching your Glamio gold
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Approve it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // 1. Show loading state in Swal
          Swal.showLoading();

          // 2. Make the API Call
          const res = await fetch(
            `http://localhost:5000/api/v1/appointments/${id}/approve`,
            {
              method: "PATCH",
              headers: {
                Authorization: `${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          const data = await res.json();

          if (res.ok) {
            // 3. Update local state
            updateStatusOnServer(id, 2); // 2 is Approved based on your STATUS object

            Swal.fire({
              title: "Approved!",
              text: "Appointment has been confirmed successfully.",
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
            });
          } else {
            // Handle error from backend (e.g., Unauthorized or Not Found)
            Swal.fire(
              "Error",
              data.message || "Failed to approve appointment",
              "error"
            );
          }
        } catch (error) {
          console.error("Approval Error:", error);
          Swal.fire("Error", "Server connection failed", "error");
        }
      }
    });
  };

  const openRejectModal = (item) => {
    setSelected(item);
    setShowRejectModal(true);
  };

  const handleRejectSubmit = () => {
    if (!rejectReason.trim()) {
      return Swal.fire(
        "Error",
        "Please provide a reason for rejection",
        "error"
      );
    }
    updateStatusOnServer(selected.appointment.id, 3, rejectReason);
    setShowRejectModal(false);
    setRejectReason("");
    Swal.fire("Rejected", "The request has been declined.", "info");
  };

  const updateStatusOnServer = (id, statusId, reason = "") => {
    setAppointments((prev) =>
      prev.map((item) =>
        item.appointment.id === id
          ? { ...item, appointment: { ...item.appointment, statusId, reason } }
          : item
      )
    );
    setSelected(null);
  };

  const formatDateTime = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="admin-requests-container">
      <header className="content-header">
        <div className="header-text">
          <h1>Appointment Bookings</h1>
          <p>Manage and track your customer service requests</p>
        </div>
        <div className="header-stats">
          <div className="stat-pill">
            <span className="label">Total</span>
            <span className="value">{appointments.length}</span>
          </div>
        </div>
      </header>

      <div className="control-panel">
        <div className="search-wrapper">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            placeholder="Search by customer, expert or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filters-wrapper">
          <div className="filter-item">
            <Filter size={16} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="1">Pending</option>
              <option value="2">Approved</option>
              <option value="3">Rejected</option>
            </select>
          </div>

          <div className="filter-item">
            <ArrowUpDown size={16} />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price">Highest Price</option>
            </select>
          </div>
        </div>
      </div>

      <div className="requests-grid">
        {loading ? (
          <div className="loader-container">Loading requests...</div>
        ) : filteredAndSortedData.length === 0 ? (
          <NotFound />
        ) : (
          filteredAndSortedData.map((item) => (
            <div className="request-card" key={item.appointment.id}>
              <div className="card-top">
                <div className="customer-brief">
                  <img
                    src={item.customer.profileImage}
                    alt=""
                    className="customer-avatar"
                  />
                  <div>
                    <h4>{item.customer.username}</h4>
                    <span className="order-tag">
                      #ORD-{item.appointment.id}
                    </span>
                  </div>
                </div>
                <span
                  className={`status-badge ${
                    STATUS[item.appointment.statusId].class
                  }`}
                >
                  {STATUS[item.appointment.statusId].label}
                </span>
              </div>

              <div className="card-middle">
                <div className="info-box">
                  <Calendar size={14} />
                  <span>{formatDateTime(item.slot.slotDate)}</span>
                </div>
                <div className="info-box">
                  <Clock size={14} />
                  <span>
                    {item.slot.startTime} - {item.slot.endTime}
                  </span>
                </div>
                <div className="info-box">
                  <Scissors size={14} />
                  <span>{item.expert.name}</span>
                </div>
              </div>

              <div className="card-bottom">
                <div className="price-tag">₹{item.appointment.rate}</div>
                <div className="card-actions">
                  <button
                    className="btn-icon view"
                    onClick={() => setSelected(item)}
                  >
                    <Eye size={18} />
                  </button>
                  {item.appointment.statusId === 1 && (
                    <>
                      <button
                        className="btn-icon approve"
                        onClick={() => handleApprove(item.appointment.id)}
                      >
                        <CheckCircle size={18} />
                      </button>
                      <button
                        className="btn-icon reject"
                        onClick={() => openRejectModal(item)}
                      >
                        <XCircle size={18} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* DETAIL DRAWER / MODAL */}
      {selected && !showRejectModal && (
        <div className="side-drawer-overlay" onClick={() => setSelected(null)}>
          <div className="side-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <h2>Request Details</h2>
              <button className="close-btn" onClick={() => setSelected(null)}>
                ✕
              </button>
            </div>

            <div className="drawer-body">
              <section className="detail-section">
                <label>Customer Information</label>
                <div className="user-profile">
                  <img src={selected.customer.profileImage} alt="" />
                  <div>
                    <h3>{selected.customer.username}</h3>
                    <p>{selected.customer.email}</p>
                    <p>{selected.customer.phone || "No phone provided"}</p>
                  </div>
                </div>
              </section>

              <section className="detail-section">
                <label>Service Details</label>
                <div className="detail-row">
                  <span>Selected Expert</span>
                  <strong>{selected.expert.name}</strong>
                </div>
                <div className="detail-row">
                  <span>Service IDs</span>
                  <div className="tags">
                    {selected.appointment.serviceIds.map((id) => (
                      <span key={id} className="tag">
                        Service {id}
                      </span>
                    ))}
                  </div>
                </div>
              </section>

              <section className="detail-section">
                <label>Appointment Slot</label>
                <div className="detail-row">
                  <span>Date</span>
                  <strong>
                    {new Date(selected.slot.slotDate).toDateString()}
                  </strong>
                </div>
                <div className="detail-row">
                  <span>Time</span>
                  <strong>
                    {selected.slot.startTime} to {selected.slot.endTime}
                  </strong>
                </div>
              </section>

              <div className="drawer-price">
                <span>Total Amount</span>
                <strong>₹{selected.appointment.rate}</strong>
              </div>
            </div>

            <div className="drawer-footer">
              {selected.appointment.statusId === 1 ? (
                <>
                  <button
                    className="footer-btn reject"
                    onClick={() => openRejectModal(selected)}
                  >
                    Reject Request
                  </button>
                  <button
                    className="footer-btn approve"
                    onClick={() => handleApprove(selected.appointment.id)}
                  >
                    Approve Booking
                  </button>
                </>
              ) : (
                <button
                  className="footer-btn close"
                  onClick={() => setSelected(null)}
                >
                  Close View
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* REJECTION MODAL */}
      {showRejectModal && (
        <div className="modal-overlay">
          <div className="reject-modal">
            <h3>Reject Appointment</h3>
            <p>
              Please provide a reason for rejecting #ORD-
              {selected.appointment.id}
            </p>
            <textarea
              placeholder="E.g. Slot no longer available, Stylist on leave..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
            <div className="modal-btns">
              <button
                className="btn-cancel"
                onClick={() => setShowRejectModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn-confirm-reject"
                onClick={handleRejectSubmit}
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserRequests;
