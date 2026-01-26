import React, { useState } from "react";
import "./AppointmentScreen.css";
import { Pencil, Trash2, Plus } from "lucide-react";

function AppointmentScreen() {
    const dummyAppointments = [
        { id: 1, name: "Arun Kumar", date: "2026-02-02", time: "10:30", service: "Haircut & Styling" },
        { id: 2, name: "Priya Sharma", date: "2026-02-02", time: "12:00", service: "Facial Treatment" },
        { id: 3, name: "Rahul Nair", date: "2026-02-03", time: "15:30", service: "Beard Trim" },
        { id: 4, name: "Sneha Menon", date: "2026-02-04", time: "11:00", service: "Hair Spa" }
    ];

    const [appointments, setAppointments] = useState(dummyAppointments);
    const [search, setSearch] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const [form, setForm] = useState({
        id: null,
        name: "",
        date: "",
        time: "",
        service: ""
    });
    
    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const openAddModal = () => {
        setForm({ id: null, name: "", date: "", time: "", service: "" });
        setIsEditing(false);
    };

    const openEditModal = (item) => {
        setForm(item);
        setIsEditing(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEditing) {
            setAppointments(appointments.map(a => (a.id === form.id ? form : a)));
        } else {
            setAppointments([...appointments, { ...form, id: Date.now() }]);
        }

        document.getElementById("closeModal").click();
    };

    const handleDelete = (id) =>
        setAppointments(appointments.filter(item => item.id !== id));

    const filteredAppointments = appointments.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="appointment-container">

            {/* Top Bar */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <input
                    type="text"
                    className="form-control added-input"
                    placeholder="🔍 Search Appointments..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <button
                    className="btn btn-dark d-flex align-items-center gap-2"
                    data-bs-toggle="modal"
                    data-bs-target="#appointmentModal"
                    onClick={openAddModal}
                    style={{ borderRadius: "10px" }}
                >
                    <Plus size={18} />
                    Add Appointment
                </button>
            </div>

            {/* Appointment List */}
            <div className="appointment-list">
                {filteredAppointments.map(item => (
                    <div className="appointment-card" key={item.id}>
                        <div>
                            <h4>{item.name}</h4>
                            <p>{item.service}</p>
                            <span>{item.date} | {item.time}</span>
                        </div>

                        <div className="actions">
                            <button
                                className="btn-approve"
                                data-bs-toggle="modal"
                                data-bs-target="#appointmentModal"
                                onClick={() => openEditModal(item)}
                            >
                                <Pencil size={18} />
                            </button>

                            <button className="btn-reject" onClick={() => handleDelete(item.id)}>
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bootstrap Modal */}
            <div className="modal fade" id="appointmentModal" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <form onSubmit={handleSubmit}>
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {isEditing ? "Edit Appointment" : "Add Appointment"}
                                </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                            </div>

                            <div className="modal-body">
                                <input
                                    className="form-control mb-3"
                                    name="name"
                                    placeholder="Customer Name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    className="form-control mb-3"
                                    type="date"
                                    name="date"
                                    value={form.date}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    className="form-control mb-3"
                                    type="time"
                                    name="time"
                                    value={form.time}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    className="form-control"
                                    name="service"
                                    placeholder="Service"
                                    value={form.service}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                    id="closeModal"
                                    style={{ border: "black 1px solid", color: "black" }}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-dark" style={{ borderRadius: "10px" }}>
                                    {isEditing ? "Update" : "Add"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default AppointmentScreen;
