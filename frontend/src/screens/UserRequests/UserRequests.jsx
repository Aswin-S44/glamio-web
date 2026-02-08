import React, { useState } from "react";
import "./UserRequests.css";

const STATUS = {
  1: "Pending",
  2: "Approved",
  3: "Rejected",
};

function UserRequests() {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      serviceIds: [6, 9],
      rate: 200,
      statusId: 1,
      createdAt: "2026-01-26T11:27:33.000Z",
    },
  ]);

  const [selected, setSelected] = useState(null);

  const formatDate = (date) =>
    new Date(date).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const updateStatus = (id, statusId) => {
    setAppointments((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, statusId } : a
      )
    );
    setSelected(null);
  };

  return (
    <>
      <div className="requests-page">
        <div className="page-header">
          <h2>Booking Requests</h2>
          <span>{appointments.length} Total</span>
        </div>

        <div className="table-box ">
          <table className="user-table-new ">
            <thead>
              <tr>
                <th>Order</th>
                <th>Date</th>
                <th>Services</th>
                <th>Amount</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {appointments.map((item) => (
                <tr key={item.id}>
                  <td className="order-id">#ORD-{item.id}</td>
                  <td>{formatDate(item.createdAt)}</td>

                  <td>
                    <div className="service-tags">
                      {item.serviceIds.map((s) => (
                        <span key={s}>S-{s}</span>
                      ))}
                    </div>
                  </td>

                  <td className="price">₹{item.rate}</td>

                  <td>
                    <span className={`status-pill s-${item.statusId}`}>
                      {STATUS[item.statusId]}
                    </span>
                  </td>

                  <td>
                    <button
                      className="view-btn"
                      onClick={() => setSelected(item)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {selected && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <div className="modal-header">
              <h3>Booking #{selected.id}</h3>
              <button onClick={() => setSelected(null)}>✕</button>
            </div>

            <div className="modal-body">
              <div className="info-row">
                <span>Created</span>
                <strong>{formatDate(selected.createdAt)}</strong>
              </div>

              <div className="info-row">
                <span>Services</span>
                <strong>
                  {selected.serviceIds.join(", ")}
                </strong>
              </div>

              <div className="info-row">
                <span>Amount</span>
                <strong>₹{selected.rate}</strong>
              </div>

              <div className="info-row">
                <span>Status</span>
                <strong>{STATUS[selected.statusId]}</strong>
              </div>
            </div>

            <div className="modal-actions">
              <button
                className="approve"
                onClick={() => updateStatus(selected.id, 2)}
              >
                Approve
              </button>

              <button
                className="pending"
                onClick={() => updateStatus(selected.id, 1)}
              >
                Set Pending
              </button>

              <button
                className="reject"
                onClick={() => updateStatus(selected.id, 3)}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UserRequests;
