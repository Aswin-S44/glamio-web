import React, { useState, useMemo } from "react";
import "./AppointmentScreen.css";
import { Calendar, Clock, User } from "lucide-react";

function AppointmentScreen() {
    const appointments = [
        {
            id: 1,
            name: "Rahul Nair",
            date: "2026-02-01",
            time: "09:30",
            service: "🧔 Beard Trim",
            expert: "Akhil (Senior Stylist)"
        },
        {
            id: 2,
            name: "Arun Kumar",
            date: "2026-02-02",
            time: "10:30",
            service: "✂️ Haircut & Styling",
            expert: "Nikhil (Creative Director)"
        },
        {
            id: 3,
            name: "Priya Sharma",
            date: "2026-02-02",
            time: "12:00",
            service: "💆 Facial Treatment",
            expert: "Meera (Skin Expert)"
        },
        {
            id: 4,
            name: "Sneha Menon",
            date: "2026-02-04",
            time: "11:00",
            service: "💇 Hair Spa",
            expert: "Anjali (Therapist)"
        }
    ];

    const [search, setSearch] = useState("");

    const sortedAppointments = useMemo(() => {
        return appointments
            .filter(a =>
                a.name.toLowerCase().includes(search.toLowerCase())
            )
            .sort(
                (a, b) =>
                    new Date(`${a.date}T${a.time}`) -
                    new Date(`${b.date}T${b.time}`)
            );
    }, [search]);

    return (
        <div className="appointment-container">

            {/* Search */}
            <div className="search-box">
                🔍
                <input
                    placeholder="Search client name… 👤"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                ✨
            </div>

            {/* List */}
            <div className="appointment-list">
                {sortedAppointments.map((item, i) => (
                   <div className="appointment-item">
  {/* LEFT */}
  <div className="left">
    <div className="time-pill">
      📅 {item.date} ⏰ {item.time}
    </div>

    <div className="info">
      <h4>{item.name}</h4>
      <p className="service">{item.service}</p>
      <div className="expert">
        👤 Expert: <span>{item.expert}</span>
      </div>
    </div>
  </div>

  {/* RIGHT */}
  <div className="right">
    <span className="status confirmed">Confirmed</span>
    <span className="meta">⏳ 45 mins</span>
    <span className="meta">💰 ₹899</span>
  
  </div>
</div>

                ))}
            </div>

        </div>
    );
}

export default AppointmentScreen;
