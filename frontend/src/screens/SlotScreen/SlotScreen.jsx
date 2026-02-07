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
  CheckCircle2,
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
      toast.error("Failed to fetch slots");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleHoliday = () => {
    setHolidays((prev) => ({
      ...prev,
      [dateKey]: !prev[dateKey],
    }));
    toast.info(
      holidays[dateKey] ? "Shop is now Open" : "Day marked as Holiday"
    );
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
        method: editingSlot ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(newSlotData),
      });

      if (res.ok) {
        fetchSlots();
        toast.success(
          editingSlot ? "Slot updated successfully" : "New slot created"
        );
        closeModal();
      }
    } catch (error) {
      toast.error("Error saving slot");
    }
  };

  const handleDeleteSlot = async (id) => {
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
        toast.success("Slot deleted");
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const handleRepeatSync = async () => {
    if (!repeatUntilDate) {
      toast.warning("Please select an end date");
      return;
    }

    const currentDaySlots = slots[dateKey] || [];
    if (currentDaySlots.length === 0) {
      toast.error("No slots found on selected day to repeat");
      return;
    }

    setLoading(true);
    try {
      let tempDate = addDays(selectedDate, 1);
      const endDate = parseISO(repeatUntilDate);

      while (!isAfter(tempDate, endDate)) {
        const targetDateStr = format(tempDate, "yyyy-MM-dd");
        for (const slot of currentDaySlots) {
          await fetch("http://localhost:5000/api/v1/slots", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
            body: JSON.stringify({
              slotDate: targetDateStr,
              startTime: `${slot.startTime}:00`,
              endTime: `${slot.endTime}:00`,
              isAvailable: slot.isAvailable,
              bookedCount: 0,
              maxCapacity: 1,
            }),
          });
        }
        tempDate = addDays(tempDate, 1);
      }
      toast.success("Schedule synced across dates");
      setRepeatModalOpen(false);
      fetchSlots();
    } catch (error) {
      toast.error("Error during sync");
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
    const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
      <div className="premium-calendar">
        <div className="cal-header">
          <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
            <ChevronLeft size={20} />
          </button>
          <h3>{format(currentMonth, "MMMM yyyy")}</h3>
          <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
            <ChevronRight size={20} />
          </button>
        </div>
        <div className="cal-grid">
          {weekDays.map((d) => (
            <div key={d} className="cal-weekday">
              {d}
            </div>
          ))}
          {calendarDays.map((day, idx) => {
            const dayKey = format(day, "yyyy-MM-dd");
            const hasSlots = slots[dayKey]?.length > 0;
            const isSelected = isSameDay(day, selectedDate);
            const isToday = isSameDay(day, new Date());
            return (
              <div
                key={idx}
                className={`cal-day ${
                  !isSameMonth(day, monthStart) ? "off" : ""
                } ${isSelected ? "active" : ""} ${isToday ? "today" : ""}`}
                onClick={() => setSelectedDate(day)}
              >
                <span className="day-num">{format(day, "d")}</span>
                {hasSlots && <div className="day-indicator" />}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const currentDaySlots = holidays[dateKey] ? [] : slots[dateKey] || [];

  return (
    <div className="beauty-slot-container">
      <ToastContainer position="bottom-right" theme="dark" />

      <div className="main-layout">
        <aside className="sidebar-section">
          <div className="glass-panel calendar-card">{renderCalendar()}</div>

          <div className="action-stack">
            <div
              className={`status-card ${holidays[dateKey] ? "holiday-on" : ""}`}
            >
              <div className="status-icon">
                <Umbrella size={20} />
              </div>
              <div className="status-text">
                <label>Holiday Mode</label>
                <span>
                  {holidays[dateKey] ? "Shop Closed" : "Open for Booking"}
                </span>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={!!holidays[dateKey]}
                  onChange={handleToggleHoliday}
                />
                <span className="slider"></span>
              </label>
            </div>

            <button
              className="sync-btn"
              onClick={() => setRepeatModalOpen(true)}
            >
              <RefreshCw size={18} />
              <span>Daily Schedule Sync</span>
            </button>
          </div>
        </aside>

        <main className="content-section">
          <header className="content-top">
            <div className="title-area">
              <h1>{format(selectedDate, "EEEE, MMMM do")}</h1>
              <p>{currentDaySlots.length} appointment slots configured</p>
            </div>
            {!holidays[dateKey] && (
              <button className="add-slot-btn" onClick={() => openModal()}>
                <Plus size={18} /> Add New Slot
              </button>
            )}
          </header>

          {loading ? (
            <div className="loader-box">
              <div className="beauty-spinner"></div>
            </div>
          ) : holidays[dateKey] ? (
            <div className="empty-state">
              <Umbrella size={60} />
              <h2>Enjoy Your Holiday</h2>
              <p>Booking is disabled for this date.</p>
            </div>
          ) : currentDaySlots.length > 0 ? (
            <div className="slot-grid">
              {currentDaySlots.map((slot) => (
                <div
                  key={slot.id}
                  className={`slot-card ${!slot.isAvailable ? "booked" : ""}`}
                >
                  <div className="slot-header">
                    <div className="time-badge">
                      <Clock size={14} /> {slot.startTime} - {slot.endTime}
                    </div>
                    <div className="slot-ops">
                      <button onClick={() => openModal(slot)}>
                        <Edit2 size={15} />
                      </button>
                      <button
                        onClick={() => handleDeleteSlot(slot.id)}
                        className="del-btn"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                  <div className="slot-body">
                    <span
                      className={`pill ${slot.isAvailable ? "avail" : "taken"}`}
                    >
                      {slot.isAvailable ? "Available" : "Booked"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <CalendarIcon size={60} />
              <h2>No Slots Defined</h2>
              <p>Start by adding a service slot for this day.</p>
              <button
                className="add-slot-btn ghost"
                onClick={() => openModal()}
              >
                Create First Slot
              </button>
            </div>
          )}
        </main>
      </div>

      {(modalOpen || repeatModalOpen) && (
        <div className="modal-overlay" onClick={closeModal} />
      )}

      {modalOpen && (
        <div className="beauty-modal">
          <div className="modal-header">
            <h3>{editingSlot ? "Modify Slot" : "Create Slot"}</h3>
            <button onClick={closeModal}>
              <X size={20} />
            </button>
          </div>
          <div className="modal-body">
            <div className="input-group">
              <label>Service Date</label>
              <input
                type="date"
                value={slotDate}
                onChange={(e) => setSlotDate(e.target.value)}
              />
            </div>
            <div className="input-row">
              <div className="input-group">
                <label>Start Time</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label>End Time</label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
            </div>
            <div className="toggle-row">
              <span>Mark as Booked</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={isBooked}
                  onChange={(e) => setIsBooked(e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn-cancel" onClick={closeModal}>
              Cancel
            </button>
            <button className="btn-save" onClick={handleSaveSlot}>
              Confirm Slot
            </button>
          </div>
        </div>
      )}

      {repeatModalOpen && (
        <div className="beauty-modal small">
          <div className="modal-header">
            <h3>Daily Schedule Sync</h3>
            <button onClick={() => setRepeatModalOpen(false)}>
              <X size={20} />
            </button>
          </div>
          <div className="modal-body">
            <p className="help-text">
              Copy today's schedule to all future dates up until:
            </p>
            <div className="input-group">
              <label>Repeat Until Date</label>
              <input
                type="date"
                min={format(addDays(selectedDate, 1), "yyyy-MM-dd")}
                value={repeatUntilDate}
                onChange={(e) => setRepeatUntilDate(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn-save full" onClick={handleRepeatSync}>
              Process Batch Sync
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SlotScreen;
