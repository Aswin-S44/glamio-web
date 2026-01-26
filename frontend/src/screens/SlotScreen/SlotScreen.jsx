import React, { useState, useEffect } from "react";
import {
  Calendar as CalendarIcon,
  Plus,
  Trash2,
  Edit2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Umbrella,
  RefreshCw,
  X,
} from "lucide-react";
import {
  format,
  parseISO,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  addDays,
  isAfter,
} from "date-fns";
import "./SlotScreen.css";

function SlotScreen() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [slots, setSlots] = useState({});
  const [holidays, setHolidays] = useState({});
  const [loading, setLoading] = useState(false);
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
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/v1/slots", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      const data = await res.json();
      if (data.slots) {
        const grouped = data.slots.reduce((acc, slot) => {
          const d = format(parseISO(slot.slotDate), "yyyy-MM-dd");
          if (!acc[d]) acc[d] = [];
          acc[d].push({
            ...slot,
            startTime: slot.startTime.substring(0, 5),
            endTime: slot.endTime.substring(0, 5),
          });
          return acc;
        }, {});
        setSlots(grouped);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleHoliday = () => {
    setHolidays((prev) => ({
      ...prev,
      [dateKey]: !prev[dateKey],
    }));
  };

  const handleSaveSlot = async () => {
    const newSlotData = {
      slotDate: slotDate,
      startTime: startTime.length === 5 ? `${startTime}:00` : startTime,
      endTime: endTime.length === 5 ? `${endTime}:00` : endTime,
      isAvailable: !isBooked,
      bookedCount: isBooked ? 1 : 0,
      maxCapacity: 1,
    };

    try {
      const url = editingSlot
        ? `http://localhost:5000/api/v1/slots/${editingSlot.id}`
        : "http://localhost:5000/api/v1/slots";

      const res = await fetch(url, {
        method: editingSlot ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(newSlotData),
      });

      if (res.ok) {
        fetchSlots();
        alert(editingSlot ? "Slot updated" : "Slot created");
        closeModal();
      }
    } catch (error) {
      alert("Error saving slot");
    }
  };

  const handleDeleteSlot = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        const res = await fetch(`http://localhost:5000/api/v1/slots/${id}`, {
          method: "DELETE",
          headers: { Authorization: `${token}` },
        });
        if (res.ok) {
          setSlots((prev) => ({
            ...prev,
            [dateKey]: prev[dateKey].filter((s) => s.id !== id),
          }));
        }
      } catch (error) {
        alert("Delete failed");
      }
    }
  };

  const handleRepeatSync = async () => {
    if (!repeatUntilDate) {
      alert("Please select an end date");
      return;
    }

    const currentDaySlots = slots[dateKey] || [];
    if (currentDaySlots.length === 0) {
      alert("No slots found on the selected day to repeat.");
      return;
    }

    const endDate = parseISO(repeatUntilDate);
    if (!isAfter(endDate, selectedDate)) {
      alert("End date must be after the current selected date");
      return;
    }

    setLoading(true);
    try {
      let tempDate = addDays(selectedDate, 1);
      while (!isAfter(tempDate, endDate)) {
        const targetDateStr = format(tempDate, "yyyy-MM-dd");

        for (const slot of currentDaySlots) {
          const syncData = {
            slotDate: targetDateStr,
            startTime: `${slot.startTime}:00`,
            endTime: `${slot.endTime}:00`,
            isAvailable: slot.isAvailable,
            bookedCount: 0,
            maxCapacity: 1,
          };

          await fetch("http://localhost:5000/api/v1/slots", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
            body: JSON.stringify(syncData),
          });
        }
        tempDate = addDays(tempDate, 1);
      }
      alert("Schedule synced successfully");
      setRepeatModalOpen(false);
      fetchSlots();
    } catch (error) {
      alert("Error during sync process");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (slot = null) => {
    if (slot) {
      setEditingSlot(slot);
      setSlotDate(format(parseISO(slot.slotDate), "yyyy-MM-dd"));
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

  const renderCalendar = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const calendarDays = eachDayOfInterval({
      start: startDate,
      end: endDate,
    });

    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
      <div className="custom-calendar">
        <div className="calendar-nav">
          <button style={{ borderRadius: "10px" }} onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
            <ChevronLeft size={18} />
          </button>
          <h3>{format(currentMonth, "MMMM yyyy")}</h3>
          <button style={{ borderRadius: "10px" }} onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
            <ChevronRight size={18} />
          </button>
        </div>
        <div className="calendar-grid">
          {weekDays.map((day) => (
            <div key={day} className="weekday-label">
              {day}
            </div>
          ))}
          {calendarDays.map((day, idx) => {
            const dayKey = format(day, "yyyy-MM-dd");
            const hasSlots = slots[dayKey] && slots[dayKey].length > 0;
            const isSelected = isSameDay(day, selectedDate);
            const isCurrentMonth = isSameMonth(day, monthStart);

            return (
              <div
                key={idx}
                className={`calendar-day ${!isCurrentMonth ? "prev-month" : ""
                  } ${isSelected ? "selected-day" : ""}`}
                onClick={() => setSelectedDate(day)}
              >
                <span>{format(day, "d")}</span>
                {hasSlots && <div className="slot-dot"></div>}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const currentDaySlots = holidays[dateKey] ? [] : slots[dateKey] || [];

  return (
    <div className="slot-wrapper">
      {/* <header className="slot-navbar">
        <button className="nav-icon-btn">
          <ChevronLeft size={22} />
        </button>
        <h1 className="nav-title">Booking Schedule</h1>
        <div className="nav-spacer"></div>
      </header> */}

      <main className="slot-main-container">
        <div className="slot-grid-layout">
          <div className="row">


            <div className="col-md-5">
              <aside className="slot-sidebar">
                <div className="glass-card calendar-wrapper">
                  {renderCalendar()}
                </div>

                <div className="control-stack">
                  <div
                    className={`mode-card ${holidays[dateKey] ? "holiday-active" : ""
                      }`}
                  >
                    <div className="mode-info">
                      <div className="mode-icon">
                        <Umbrella size={20} />
                      </div>
                      <div>
                        <h4>Holiday Mode</h4>
                        <p>{holidays[dateKey] ? "Closed" : "Open"}</p>
                      </div>
                    </div>
                    <label className="ios-switch">
                      <input
                        type="checkbox"
                        checked={!!holidays[dateKey]}
                        onChange={handleToggleHoliday}
                      />
                      <span className="ios-slider"></span>
                    </label>
                  </div>

                  <button
                    className="mode-card repeat-trigger"
                    onClick={() => setRepeatModalOpen(true)}
                  >
                    <div className="mode-info">
                      <div className="mode-icon">
                        <RefreshCw size={20} />
                      </div>
                      <div>
                        <h4>Daily Sync</h4>
                        <p>Repeat Schedule</p>
                      </div>
                    </div>
                  </button>
                </div>
              </aside>
            </div><div className="col-md-7">
              <section className="slot-content-area">
                <div className="content-header">
                  <div className="date-display">
                    <h2>{format(selectedDate, "MMMM d, yyyy")}</h2>
                    <p>{currentDaySlots.length} Slots Available</p>
                  </div>
                  {!holidays[dateKey] && (
                    <button className="prime-add-btn" onClick={() => openModal()}>
                      <Plus size={18} /> New Slot
                    </button>
                  )}
                </div>

                {loading ? (
                  <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Updating Schedule...</p>
                  </div>
                ) : holidays[dateKey] ? (
                  <div className="empty-state-card holiday-state">
                    <Umbrella size={48} className="floating-icon" />
                    <h3>Holiday Mode Active</h3>
                    <p>This day is marked as a holiday.</p>
                  </div>
                ) : currentDaySlots.length > 0 ? (
                  <div className="slots-masonry">
                    {currentDaySlots.map((slot) => (
                      <div
                        key={slot.id}
                        className={`modern-slot-card ${!slot.isAvailable ? "is-booked" : ""
                          }`}
                      >
                        <div className="slot-time-info">
                          <Clock size={16} />
                          <span>
                            {slot.startTime} - {slot.endTime}
                          </span>
                        </div>
                        <div className="slot-footer">
                          <span
                            className={`status-pill ${slot.isAvailable ? "pill-avail" : "pill-booked"
                              }`}
                          >
                            {slot.isAvailable ? "Available" : "Booked"}
                          </span>
                          <div className="slot-actions">
                            <button
                              className="action-btn edit"
                              onClick={() => openModal(slot)}
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              className="action-btn delete"
                              onClick={() => handleDeleteSlot(slot.id)}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state-card">
                    <Clock size={48} className="floating-icon" />
                    <h3>Empty Schedule</h3>
                    <p>No slots created for this date.</p>
                    <button className="ghost-btn" onClick={() => openModal()}>
                      Add Slot
                    </button>
                  </div>
                )}
              </section> </div>
          </div>
        </div>
      </main>

      {modalOpen && (
        <div className="modal-backdrop">
          <div className="modal-pane">
            <div className="modal-top">
              <h3>{editingSlot ? "Edit Slot" : "New Slot"}</h3>
              <button className="close-circle" onClick={closeModal}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-field">
                <label>Date</label>
                <input
                  type="date"
                  value={slotDate}
                  onChange={(e) => setSlotDate(e.target.value)}
                />
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label>Start</label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label>End</label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-toggle">
                <span>Force Booked</span>
                <label className="ios-switch">
                  <input
                    type="checkbox"
                    checked={isBooked}
                    onChange={(e) => setIsBooked(e.target.checked)}
                  />
                  <span className="ios-slider"></span>
                </label>
              </div>
            </div>
            <div className="modal-footer">
              <button className="sec-btn" onClick={closeModal}>
                Cancel
              </button>
              <button className="pri-btn" onClick={handleSaveSlot}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {repeatModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-pane sm">
            <div className="modal-top">
              <h3>Daily Schedule Sync</h3>
              <button
                className="close-circle"
                onClick={() => setRepeatModalOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="sync-help-text">
                This will copy all slots from{" "}
                <strong>{format(selectedDate, "MMM do")}</strong> to every day
                up until the date selected below.
              </div>
              <div className="form-field">
                <label>Sync Until Date</label>
                <input
                  type="date"
                  min={format(addDays(selectedDate, 1), "yyyy-MM-dd")}
                  value={repeatUntilDate}
                  onChange={(e) => setRepeatUntilDate(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="sec-btn"
                onClick={() => setRepeatModalOpen(false)}
              >
                Cancel
              </button>
              <button className="pri-btn" onClick={handleRepeatSync}>
                Start Sync
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SlotScreen;
