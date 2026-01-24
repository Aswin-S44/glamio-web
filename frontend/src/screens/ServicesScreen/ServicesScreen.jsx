import React, { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import Upload from "antd/es/upload";
import {
  Plus,
  Search,
  Scissors,
  Sparkles,
  Trash2,
  Edit2,
  Clock,
  X,
  ChevronLeft,
  Wind,
  Flower2,
  Heart,
  Camera,
  Check,
  Trash,
} from "lucide-react";
import { format } from "date-fns";
import "./ServicesScreen.css";

const CATEGORY_OPTIONS = [
  { value: "Hair", label: "Hair Cut" },
  { value: "Skin", label: "Skin Care" },
  { value: "Nails", label: "Nail Art" },
  { value: "Makeup", label: "Makeup" },
];

const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const customSelectStyles = {
  control: (base, state) => ({
    ...base,
    padding: "8px",
    borderRadius: "15px",
    background: "#fdfaf7",
    border: state.isFocused ? "2px solid #d4a373" : "1px solid #faedcd",
    boxShadow: "none",
    "&:hover": { borderColor: "#d4a373" },
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#d4a373"
      : state.isFocused
      ? "#faedcd"
      : "transparent",
    color: state.isSelected ? "#fff" : "#1a1a1a",
    "&:active": { backgroundColor: "#d4a373" },
  }),
};

function ServicesScreen() {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const [serviceName, setServiceName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [image, setImage] = useState(null);
  const [duration, setDuration] = useState("30");
  const [description, setDescription] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/v1/services", {
        headers: { Authorization: `${token}` },
      });
      const data = await res.json();
      if (data.services) setServices(data.services);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async ({ fileList }) => {
    if (fileList.length > 0) {
      const base64 = await convertToBase64(
        fileList[fileList.length - 1].originFileObj
      );
      setImage(base64);
    } else {
      setImage(null);
    }
  };

  const handleSaveService = async (e) => {
    e.preventDefault();

    const submitData = {
      name: serviceName,
      imageUrl: image,
      rate: price,
      category: category?.value,
      duration: duration,
      description: description,
    };

    try {
      const url = editingService
        ? `http://localhost:5000/api/v1/services/${editingService.id}`
        : "http://localhost:5000/api/v1/services";

      const res = await fetch(url, {
        method: editingService ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(submitData),
      });

      if (res.ok) {
        fetchServices();
        closeModal();
      }
    } catch (error) {
      alert("Error saving service");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this service?")) {
      try {
        await fetch(`http://localhost:5000/api/v1/shop/service/${id}`, {
          method: "DELETE",
          headers: { Authorization: `${token}` },
        });
        fetchServices();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const openModal = (service = null) => {
    if (service) {
      setEditingService(service);
      setServiceName(service.name);
      setPrice(service.rate || service.price);
      setCategory({ value: service.category, label: service.category });
      setImage(service.imageUrl);
      setDuration(service.duration || "30");
      setDescription(service.description || "");
    } else {
      setEditingService(null);
      setServiceName("");
      setPrice("");
      setCategory(null);
      setImage(null);
      setDuration("30");
      setDescription("");
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingService(null);
  };

  const filteredServices = services.filter((s) => {
    const matchesSearch = s.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === "All" || s.category === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="sv-page">
      <header className="sv-header">
        <div className="sv-nav-brand">
          <button className="sv-back-circle">
            <ChevronLeft size={20} />
          </button>
          <div>
            <h1>Service Menu</h1>
            <p>Define your shop's premium offerings</p>
          </div>
        </div>
        <button className="sv-add-btn" onClick={() => openModal()}>
          <Plus size={20} />
          <span>New Service</span>
        </button>
      </header>

      <main className="sv-content">
        <div className="sv-filter-bar">
          <div className="sv-search">
            <Search className="sv-search-icon" size={18} />
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="sv-tabs">
            {["All", "Hair", "Skin", "Nails", "Makeup"].map((cat) => (
              <button
                key={cat}
                className={`sv-tab-item ${activeTab === cat ? "active" : ""}`}
                onClick={() => setActiveTab(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="sv-loader">
            <div className="sv-spinner"></div>
          </div>
        ) : (
          <div className="sv-grid">
            {filteredServices.map((service) => (
              <div key={service.id} className="sv-card">
                <div className="sv-card-img-wrapper">
                  {service.imageUrl ? (
                    <img
                      src={service.imageUrl}
                      alt={service.name}
                      className="sv-main-img"
                    />
                  ) : (
                    <div className="sv-img-placeholder">
                      <Scissors size={40} />
                    </div>
                  )}
                  <div className="sv-price-tag">
                    ${service.rate || service.price}
                  </div>
                </div>

                <div className="sv-card-body">
                  <span className="sv-category-label">{service.category}</span>
                  <h3>{service.name}</h3>
                  <p>{service.description || "Luxury treatment experience."}</p>
                </div>

                <div className="sv-card-foot">
                  <div className="sv-meta">
                    <Clock size={14} />
                    <span>{service.duration || "30"} mins</span>
                  </div>
                  <div className="sv-actions">
                    <button
                      className="sv-circle-btn edit"
                      onClick={() => openModal(service)}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      className="sv-circle-btn delete"
                      onClick={() => handleDelete(service.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="sv-add-placeholder" onClick={() => openModal()}>
              <div className="sv-plus-ring">
                <Plus size={32} />
              </div>
              <p>Add Service</p>
            </div>
          </div>
        )}
      </main>

      {modalOpen && (
        <div className="sv-modal-backdrop">
          <div className="sv-modal-pane">
            <div className="sv-modal-header">
              <h2>{editingService ? "Edit Service" : "New Service"}</h2>
              <button className="sv-close-btn" onClick={closeModal}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="sv-form">
              <div className="sv-form-scroll">
                <div className="sv-upload-section">
                  <label>Service Cover Image</label>
                  <Upload
                    listType="picture-card"
                    beforeUpload={() => false}
                    onChange={handleImageUpload}
                    maxCount={1}
                    showUploadList={false}
                  >
                    {image ? (
                      <div className="sv-preview-container">
                        <img
                          src={image}
                          alt="preview"
                          className="sv-img-preview"
                        />
                        <div className="sv-img-overlay">
                          <Camera size={20} />
                        </div>
                      </div>
                    ) : (
                      <div className="sv-upload-trigger">
                        <Camera size={24} />
                        <span>Upload Photo</span>
                      </div>
                    )}
                  </Upload>
                </div>

                <div className="sv-input-group">
                  <label>Category</label>
                  <CreatableSelect
                    isClearable
                    options={CATEGORY_OPTIONS}
                    styles={customSelectStyles}
                    placeholder="Select or type new..."
                    value={category}
                    onChange={(val) => setCategory(val)}
                    required
                  />
                </div>

                <div className="sv-input-group">
                  <label>Service Name</label>
                  <input
                    type="text"
                    placeholder="e.g. French Balayage"
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    required
                  />
                </div>

                <div className="sv-form-row">
                  <div className="sv-input-group">
                    <label>Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>
                  <div className="sv-input-group">
                    <label>Duration (min)</label>
                    <input
                      type="number"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                    />
                  </div>
                </div>

                <div className="sv-input-group">
                  <label>Description</label>
                  <textarea
                    placeholder="Describe the service experience..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="3"
                  />
                </div>
              </div>

              <div className="sv-modal-footer">
                <button
                  type="button"
                  className="sv-btn-cancel"
                  onClick={closeModal}
                >
                  Discard
                </button>
                <button type="submit" className="sv-btn-save">
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ServicesScreen;
