import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./SelectSlotScreen.css";

const EXPERTS = [
  {
    id: 1,
    name: "Sophia",
    role: "Hair Stylist",
    img: "https://i.pravatar.cc/150?u=1",
  },
  {
    id: 2,
    name: "Emma",
    role: "Makeup Artist",
    img: "https://i.pravatar.cc/150?u=2",
  },
  {
    id: 3,
    name: "Olivia",
    role: "Skin Expert",
    img: "https://i.pravatar.cc/150?u=3",
  },
  {
    id: 4,
    name: "Ava",
    role: "Nail Artist",
    img: "https://i.pravatar.cc/150?u=4",
  },
];

const TIME_SLOTS = [
  "09:00 AM",
  "10:30 AM",
  "12:00 PM",
  "02:00 PM",
  "03:30 PM",
  "05:00 PM",
  "06:30 PM",
];

function SelectSlotScreen() {
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);

  const isNextEnabled = selectedExpert && selectedSlot && selectedDate;

  return (
    <div className="slot-screen-container">
      <div className="section">
        <h2 className="section-title">Choose Expert</h2>
        <div className="experts-grid">
          {EXPERTS.map((expert) => (
            <div
              key={expert.id}
              className={`expert-card ${
                selectedExpert === expert.id ? "active" : ""
              }`}
              onClick={() => setSelectedExpert(expert.id)}
            >
              <img src={expert.img} alt={expert.name} />
              <div className="expert-info">
                <h3>{expert.name}</h3>
                <p>{expert.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="booking-layout">
        <div className="section calendar-section">
          <h2 className="section-title">Select Date</h2>
          <div className="calendar-wrapper">
            <Calendar
              onChange={(date) => {
                setSelectedDate(date);
                setSelectedSlot(null);
              }}
              value={selectedDate}
              minDate={new Date()}
              view="month"
              prev2Label={null}
              next2Label={null}
            />
          </div>
        </div>

        <div className="section slots-section">
          <h2 className="section-title">Available Slots</h2>
          <div className="slots-grid">
            {TIME_SLOTS.map((slot) => (
              <button
                key={slot}
                className={`slot-pill ${selectedSlot === slot ? "active" : ""}`}
                onClick={() => setSelectedSlot(slot)}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-action">
        <button
          className="btn-next"
          disabled={!isNextEnabled}
          onClick={() => {
            window.location.href = "/summary";
          }}
        >
          Confirm Selection
        </button>
      </div>
    </div>
  );
}

export default SelectSlotScreen;
