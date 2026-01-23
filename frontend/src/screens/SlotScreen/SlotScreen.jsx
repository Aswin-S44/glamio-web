import React, { useState, useEffect } from "react";
import {
  Calendar as CalendarIcon,
  Plus,
  Trash2,
  Edit2,
  ChevronLeft,
  Clock,
  Umbrella,
  RefreshCw,
  X,
  Check,
} from "lucide-react";
import { format, addDays, isSameDay, parseISO, isBefore } from "date-fns";
import "./SlotScreen.css";

function SlotScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [slots, setSlots] = useState({});
  const [holidays, setHolidays] = useState({});
  const [loading, setLoading] = useState(false);
  const [allSlots, setAllSlots] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [repeatModalOpen, setRepeatModalOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);

  const [slotDate, setSlotDate] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [isBooked, setIsBooked] = useState(false);
  const [repeatUntilDate, setRepeatUntilDate] = useState("");
  const token = localStorage.getItem("token");

  const dateKey = format(selectedDate, "yyyy-MM-dd");

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/shop/slots", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });
        const data = await res.json();
        console.log("DATA-------------", data);

        if (data.slots && slots.length > 0) {
          setAllSlots(slots);
        }
      } catch (error) {
        console.log("Error fetching slots : ", error);
      }
    };
    fetchSlots();
  }, []);

  const handleToggleHoliday = () => {
    const currentStatus = holidays[dateKey];
    setHolidays({
      ...holidays,
      [dateKey]: !currentStatus,
    });
  };

  const handleSaveSlot = async () => {
    const newSlot = {
      slotDate: slotDate,
      startTime,
      endTime,
      isAvailable: !isBooked,
      bookedCount: isBooked ? 1 : 0,
      maxCapacity: 1,
    };

    console.log("newSlot---------", newSlot);

    const res = await fetch("http://localhost:5000/api/v1/shop/slot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(newSlot),
    });

    const result = await res.json();
    console.log("result-----------", result ? result : "no result");

    setSlots((prev) => {
      const newState = { ...prev };

      if (editingSlot && editingSlot.slotDate !== slotDate) {
        newState[editingSlot.slotDate] = newState[editingSlot.slotDate].filter(
          (s) => s.id !== editingSlot.id
        );
      }

      const targetSlots = newState[slotDate] || [];
      if (editingSlot) {
        const index = targetSlots.findIndex((s) => s.id === editingSlot.id);
        if (index > -1) {
          targetSlots[index] = newSlot;
          newState[slotDate] = [...targetSlots];
        } else {
          newState[slotDate] = [...targetSlots, newSlot];
        }
      } else {
        newState[slotDate] = [...targetSlots, newSlot];
      }

      return newState;
    });
    alert("Slot created ");
    closeModal();
  };

  const handleDeleteSlot = (id) => {
    if (window.confirm("Are you sure you want to delete this slot?")) {
      setSlots({
        ...slots,
        [dateKey]: slots[dateKey].filter((s) => s.id !== id),
      });
    }
  };

  const handleRepeatSlots = () => {
    if (!repeatUntilDate) return;
    alert(`Slots from ${dateKey} will be repeated until ${repeatUntilDate}`);
    setRepeatModalOpen(false);
  };

  const openModal = (slot = null) => {
    if (slot) {
      setEditingSlot(slot);
      setSlotDate(slot.slotDate || dateKey);
      setStartTime(slot.startTime);
      setEndTime(slot.endTime);
      setIsBooked(!slot.isAvailable);
    } else {
      setEditingSlot(null);
      setSlotDate(dateKey);
      setStartTime("09:00");
      setEndTime("10:00");
      setIsBooked(false);
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingSlot(null);
  };

  const currentDaySlots = holidays[dateKey] ? [] : slots[dateKey] || [];

  return (
    <div className="slot-container">
      <header className="slot-header">
        <button className="back-btn">
          <ChevronLeft size={24} />
        </button>
        <h1>Manage Slots</h1>
        <div style={{ width: 40 }}></div>
      </header>

      <main className="slot-content">
        <div className="calendar-section">
          <div className="card calendar-card">
            <input
              type="date"
              className="web-calendar-input"
              value={dateKey}
              onChange={(e) => setSelectedDate(parseISO(e.target.value))}
            />
            <div className="calendar-info">
              <p>
                Selected:{" "}
                <strong>{format(selectedDate, "MMMM do, yyyy")}</strong>
              </p>
            </div>
          </div>

          <div className="control-grid">
            <div
              className={`control-box ${
                holidays[dateKey] ? "active-holiday" : ""
              }`}
            >
              <div className="control-header">
                <Umbrella color={holidays[dateKey] ? "#F57C00" : "#78909C"} />
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={!!holidays[dateKey]}
                    onChange={handleToggleHoliday}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              <h3>Holiday Mode</h3>
              <p>
                {holidays[dateKey] ? "Bookings Paused" : "Accepting Clients"}
              </p>
            </div>

            <div className="control-box">
              <div className="control-header">
                <RefreshCw color="#6366f1" />
                <button
                  className="repeat-btn"
                  onClick={() => setRepeatModalOpen(true)}
                >
                  Repeat
                </button>
              </div>
              <h3>Daily Repeat</h3>
              <p>Copy to future</p>
            </div>
          </div>
        </div>

        <div className="slots-list-section">
          <div className="section-title">
            <div>
              <h2>{format(selectedDate, "MMMM do")}</h2>
              <span>{format(selectedDate, "yyyy")}</span>
            </div>
            {!holidays[dateKey] && (
              <button className="add-slot-btn" onClick={() => openModal()}>
                <Plus size={20} /> Add Slot
              </button>
            )}
          </div>

          {holidays[dateKey] ? (
            <div className="empty-state holiday">
              <div className="icon-circle">
                <Umbrella size={48} />
              </div>
              <h3>Holiday Mode Active</h3>
              <p>
                You have marked this day as a holiday. No bookings can be made.
              </p>
            </div>
          ) : currentDaySlots.length > 0 ? (
            <div className="slots-grid">
              {currentDaySlots.map((slot) => (
                <div key={slot.id} className="slot-card">
                  <div
                    className={`status-strip ${
                      slot.isAvailable ? "available" : "booked"
                    }`}
                  ></div>
                  <div className="slot-details">
                    <div>
                      <h4>
                        {slot.startTime} - {slot.endTime}
                      </h4>
                      <span
                        className={`status-label ${
                          slot.isAvailable ? "available" : "booked"
                        }`}
                      >
                        {slot.isAvailable ? "Available" : "Booked"}
                      </span>
                    </div>
                    <div className="actions">
                      <button
                        onClick={() => openModal(slot)}
                        className="edit-icon"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteSlot(slot.id)}
                        className="delete-icon"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="icon-circle">
                <Clock size={48} />
              </div>
              <h3>No Slots Added</h3>
              <p>Click "Add Slot" to create availability for this date.</p>
            </div>
          )}
        </div>
      </main>

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingSlot ? "Edit Time Slot" : "New Time Slot"}</h2>
              <button onClick={closeModal}>
                <X />
              </button>
            </div>
            <div className="input-group">
              <label>Slot Date</label>
              <input
                type="date"
                value={slotDate}
                onChange={(e) => setSlotDate(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Starts At</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Ends At</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
            <div className="toggle-group">
              <label>Mark as Booked</label>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={isBooked}
                  onChange={(e) => setIsBooked(e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={closeModal}>
                Cancel
              </button>
              <button className="btn-save" onClick={handleSaveSlot}>
                Save Slot
              </button>
            </div>
          </div>
        </div>
      )}

      {repeatModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Repeat Until</h2>
              <button onClick={() => setRepeatModalOpen(false)}>
                <X />
              </button>
            </div>
            <p className="modal-desc">Copy current slots to every day until:</p>
            <input
              type="date"
              className="date-input"
              value={repeatUntilDate}
              onChange={(e) => setRepeatUntilDate(e.target.value)}
            />
            <button className="btn-save full-width" onClick={handleRepeatSlots}>
              Confirm Schedule
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SlotScreen;
