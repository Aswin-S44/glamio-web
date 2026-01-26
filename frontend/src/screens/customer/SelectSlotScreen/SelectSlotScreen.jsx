import React, { useState, useEffect, useCallback } from "react";
import Calendar from "react-calendar";
import { format, parseISO, isSameDay } from "date-fns";
import { User, Clock, CheckCircle2, ChevronRight, Loader2 } from "lucide-react";
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

function SelectSlotScreen() {
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [slotsByDate, setSlotsByDate] = useState({});
  const [loading, setLoading] = useState(true);
  const [experts, setExperts] = useState([]);

  const queryParams = new URLSearchParams(window.location.search);
  // const shopId = queryParams.get("shop") || "3";
  const shopId = "3";

  const fetchExpers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:5000/api/v1/customer/experts/${shopId}`
      );
      const data = await res.json();
      console.log("data-------------", data);
      if (data.experts) {
        setExperts(data.experts);
      }
    } catch (error) {
      console.error("Failed to fetch experts", error);
    } finally {
      setLoading(false);
    }
  }, [shopId]);

  useEffect(() => {
    fetchExpers();
  }, [fetchExpers]);

  const fetchSlots = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:5000/api/v1/customer/slots/${shopId}`
      );
      const data = await res.json();

      if (data.slots) {
        const grouped = data.slots.reduce((acc, slot) => {
          const dateKey = format(parseISO(slot.slotDate), "yyyy-MM-dd");
          if (!acc[dateKey]) acc[dateKey] = [];
          acc[dateKey].push(slot);
          return acc;
        }, {});
        setSlotsByDate(grouped);
      }
    } catch (error) {
      console.error("Failed to fetch slots", error);
    } finally {
      setLoading(false);
    }
  }, [shopId]);

  useEffect(() => {
    fetchSlots();
  }, [fetchSlots]);

  const dateKey = format(selectedDate, "yyyy-MM-dd");
  const currentDaySlots = slotsByDate[dateKey] || [];

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const dKey = format(date, "yyyy-MM-dd");
      if (slotsByDate[dKey] && slotsByDate[dKey].some((s) => s.isAvailable)) {
        return "has-slots-indicator";
      }
    }
    return null;
  };

  const handleConfirm = () => {
    if (selectedExpert && selectedSlot) {
      const params = new URLSearchParams(window.location.search);
      params.append("slotId", selectedSlot.id);
      params.append("expertId", selectedExpert);
      window.location.href = `/summary?${params.toString()}`;
    }
  };

  if (loading) {
    return (
      <div className="loader-overlay">
        <Loader2 className="spinner-icon" />
        <p>Loading available slots...</p>
      </div>
    );
  }

  return (
    <div className="slot-screen-container">
      <div className="slot-header">
        <h1>Book Appointment</h1>
        <p>Select your preferred expert and time</p>
      </div>

      <section className="expert-section">
        <div className="section-title-area">
          <User size={20} />
          <h2>Choose Expert</h2>
        </div>
        <div className="experts-grid">
          {experts.map((expert) => (
            <div
              key={expert.id}
              className={`expert-card ${
                selectedExpert === expert.id ? "active" : ""
              }`}
              onClick={() => setSelectedExpert(expert.id)}
            >
              <div className="expert-img-wrapper">
                <img src={expert.image} alt={expert.name} />
                {selectedExpert === expert.id && (
                  <CheckCircle2 className="check-badge" />
                )}
              </div>
              <div className="expert-info">
                <h3>{expert.name}</h3>
                <p>{expert.specialist}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="booking-main-grid">
        <section className="calendar-card">
          <div className="section-title-area">
            <Clock size={20} />
            <h2>Select Date</h2>
          </div>
          <div className="calendar-ui-wrapper">
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              minDate={new Date()}
              tileClassName={tileClassName}
              prev2Label={null}
              next2Label={null}
            />
          </div>
        </section>

        <section className="slots-card">
          <div className="section-title-area">
            <Clock size={20} />
            <h2>Available Time</h2>
          </div>
          {currentDaySlots.length > 0 ? (
            <div className="slots-flex">
              {currentDaySlots.map((slot) => (
                <button
                  key={slot.id}
                  disabled={!slot.isAvailable}
                  className={`slot-item ${
                    selectedSlot?.id === slot.id ? "selected" : ""
                  } ${!slot.isAvailable ? "booked" : ""}`}
                  onClick={() => setSelectedSlot(slot)}
                >
                  {slot.startTime.substring(0, 5)}
                </button>
              ))}
            </div>
          ) : (
            <div className="no-slots-msg">
              <p>No slots available for this date.</p>
            </div>
          )}
        </section>
      </div>

      <div className="sticky-footer">
        <div className="selection-preview">
          {selectedSlot && (
            <p>
              {format(selectedDate, "MMM dd")} @{" "}
              {selectedSlot.startTime.substring(0, 5)}
            </p>
          )}
        </div>
        <button
          className="confirm-btn"
          disabled={!selectedExpert || !selectedSlot}
          onClick={handleConfirm}
        >
          <span>Continue</span>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

export default SelectSlotScreen;
