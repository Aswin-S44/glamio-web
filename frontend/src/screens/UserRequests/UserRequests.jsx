import React, { useState } from "react";
import "./UserRequests.css";

function UserRequests() {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      statusId: 1,
      confirmedAt: null,
      customerId: 4,
      expertId: 1,
      slotId: 44,
      shopId: 3,
      rate: 200,
      serviceIds: [6],
      createdAt: "2026-01-26T11:27:33.000Z",
      updatedAt: "2026-01-26T19:23:08.000Z",
    },
  ]);

  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const getStatusLabel = (id) => {
    const statuses = { 1: "Pending", 2: "Confirmed", 3: "Rejected" };
    return statuses[id] || "Unknown";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="requests-container">
      <div className="table-header">
        <h2>Booking Requests</h2>
        <span className="count-badge">{appointments.length} Total</span>
      </div>

      <div className="table-responsive">
        <table className="requests-table">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Date Created</th>
              <th>Service IDs</th>
              <th>Rate</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((item) => (
              <tr key={item.id}>
                <td>#ORD-{item.id}</td>
                <td>{formatDate(item.createdAt)}</td>
                <td>
                  <div className="service-tags">
                    {item.serviceIds.map((s) => (
                      <span key={s} className="tag">
                        S-{s}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="price-cell">${item.rate}</td>
                <td>
                  <span className={`status-badge status-${item.statusId}`}>
                    {getStatusLabel(item.statusId)}
                  </span>
                </td>
                <td className="actions-cell">
                  <button
                    className="dots-btn"
                    onClick={() => toggleDropdown(item.id)}
                  >
                    &#8942;
                  </button>

                  {activeDropdown === item.id && (
                    <div className="dropdown-menu">
                      <button onClick={() => console.log("View", item.id)}>
                        View Details
                      </button>
                      <button
                        className="accept-opt"
                        onClick={() => console.log("Accept", item.id)}
                      >
                        Accept Request
                      </button>
                      <button
                        className="reject-opt"
                        onClick={() => console.log("Reject", item.id)}
                      >
                        Reject Request
                      </button>
                      <button
                        className="delete-opt"
                        onClick={() => console.log("Delete", item.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserRequests;
