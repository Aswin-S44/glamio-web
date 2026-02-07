import React, { useState, useEffect, useRef } from "react";
import CreatableSelect from "react-select/creatable";
import Upload from "antd/es/upload";
import {
  Plus,
  Search,
  Scissors,
  Trash2,
  Edit2,
  Clock,
  X,
  ChevronLeft,
  Camera,
  MoreVertical,
  Eye,
} from "lucide-react";
import "./ServicesScreen.css";
import NotFound from "../../components/NotFound/NotFound";

const CATEGORY_OPTIONS = [
  { value: "Hair", label: "Hair Cut" },
  { value: "Skin", label: "Skin Care" },
  { value: "Nails", label: "Nail Art" },
  { value: "Makeup", label: "Makeup" },
];

const customSelectStyles = {
  control: (base, state) => ({
    ...base,
    padding: "10px",
    borderRadius: "16px",
    background: "#fff",
    border: state.isFocused ? "2px solid #d4a373" : "1px solid #faedcd",
    boxShadow: "none",
    fontSize: "14px",
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
  }),
};

function ServicesScreen() {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [activeMenuId, setActiveMenuId] = useState(null);

  const [serviceName, setServiceName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [image, setImage] = useState(null);
  const [duration, setDuration] = useState("30");
  const [description, setDescription] = useState("");

  const token = localStorage.getItem("token");
  const menuRef = useRef(null);

  useEffect(() => {
    fetchServices();
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
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
        setActiveMenuId(null);
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
    setActiveMenuId(null);
  };

  const openViewModal = (service) => {
    setEditingService(service);
    setViewModalOpen(true);
    setActiveMenuId(null);
  };

  const closeModal = () => {
    setModalOpen(false);
    setViewModalOpen(false);
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
    <div className="lux-app-container">
      <header className="lux-header">
        <div className="lux-header-left">
          <button className="lux-back-btn">
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1>Services</h1>
            <p>{services.length} items total</p>
          </div>
        </div>
        <button className="lux-desktop-add-btn" onClick={() => openModal()}>
          <Plus size={20} /> Add New Service
        </button>
      </header>

      <div className="lux-sticky-toolbar">
        <div className="lux-search-box">
          <Search size={18} className="lux-search-icon" />
          <input
            type="text"
            placeholder="Search treatments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="lux-tabs">
          {["All", "Hair", "Skin", "Nails", "Makeup"].map((cat) => (
            <button
              key={cat}
              className={`lux-tab-item ${activeTab === cat ? "active" : ""}`}
              onClick={() => setActiveTab(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <main className="lux-content">
        {loading ? (
          <div className="lux-loader-wrap">
            <div className="lux-spinner"></div>
          </div>
        ) : filteredServices.length == 0 ? (
          <>
            <NotFound />
          </>
        ) : (
          <div className="lux-table-view">
            <div className="lux-table-header">
              <div className="col-info">Service Details</div>
              <div className="col-cat">Category</div>
              <div className="col-time">Duration</div>
              <div className="col-price">Price</div>
              <div className="col-actions">Actions</div>
            </div>

            <div className="lux-table-body">
              {filteredServices.map((service) => (
                <div key={service.id} className="lux-table-row">
                  <div className="col-info">
                    <div className="lux-row-img">
                      {service.imageUrl ? (
                        <img src={service.imageUrl} alt="" />
                      ) : (
                        <Scissors size={18} />
                      )}
                    </div>
                    <div className="lux-row-text">
                      <span className="lux-row-name">{service.name}</span>
                      <span className="lux-row-sub mobile-only">
                        {service.category}
                      </span>
                    </div>
                  </div>
                  <div className="col-cat">
                    <span className="lux-row-badge">{service.category}</span>
                  </div>
                  <div className="col-time">
                    <div className="lux-meta-item">
                      <Clock size={14} /> {service.duration || "30"} min
                    </div>
                  </div>
                  <div className="col-price">
                    <span className="lux-row-price">
                      ${service.rate || service.price}
                    </span>
                  </div>
                  <div className="col-actions">
                    <div
                      className="lux-action-wrapper"
                      ref={activeMenuId === service.id ? menuRef : null}
                    >
                      <button
                        className="lux-more-btn"
                        onClick={() =>
                          setActiveMenuId(
                            activeMenuId === service.id ? null : service.id
                          )
                        }
                      >
                        <MoreVertical size={20} />
                      </button>

                      {activeMenuId === service.id && (
                        <div className="lux-dropdown-menu">
                          <button onClick={() => openViewModal(service)}>
                            <Eye size={16} /> View Details
                          </button>
                          <button onClick={() => openModal(service)}>
                            <Edit2 size={16} /> Edit Service
                          </button>
                          <button
                            onClick={() => handleDelete(service.id)}
                            className="delete-opt"
                          >
                            <Trash2 size={16} /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <button className="lux-fab" onClick={() => openModal()}>
        <Plus size={28} />
      </button>

      {modalOpen && (
        <div className="lux-modal-overlay">
          <div className="lux-modal-sheet">
            <div className="lux-modal-header">
              <div className="lux-handle"></div>
              <h2>{editingService ? "Edit Service" : "New Service"}</h2>
              <button className="lux-close-x" onClick={closeModal}>
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSaveService} className="lux-modal-form">
              <div className="lux-form-body">
                <div className="lux-upload-area">
                  <Upload
                    listType="picture-card"
                    beforeUpload={() => false}
                    onChange={handleImageUpload}
                    maxCount={1}
                    showUploadList={false}
                  >
                    {image ? (
                      <div className="lux-img-prev-wrap">
                        <img src={image} alt="prev" />
                        <div className="lux-img-mask">
                          <Camera size={20} />
                        </div>
                      </div>
                    ) : (
                      <div className="lux-upload-placeholder">
                        <Camera size={24} />
                        <span>Add Photo</span>
                      </div>
                    )}
                  </Upload>
                </div>
                <div className="lux-input-group">
                  <label>Service Category</label>
                  <CreatableSelect
                    styles={customSelectStyles}
                    options={CATEGORY_OPTIONS}
                    value={category}
                    onChange={setCategory}
                    placeholder="Select category..."
                  />
                </div>
                <div className="lux-input-group">
                  <label>Service Name</label>
                  <input
                    className="lux-input"
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    required
                  />
                </div>
                <div className="lux-input-row">
                  <div className="lux-input-group">
                    <label>Price ($)</label>
                    <input
                      type="number"
                      className="lux-input"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>
                  <div className="lux-input-group">
                    <label>Time (min)</label>
                    <input
                      type="number"
                      className="lux-input"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                    />
                  </div>
                </div>
                <div className="lux-input-group">
                  <label>Description</label>
                  <textarea
                    className="lux-textarea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              <div className="lux-modal-footer">
                <button
                  type="button"
                  className="lux-btn-cancel"
                  onClick={closeModal}
                >
                  Discard
                </button>
                <button type="submit" className="lux-btn-save">
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {viewModalOpen && editingService && (
        <div className="lux-modal-overlay">
          <div className="lux-modal-sheet">
            <div className="lux-modal-header">
              <div className="lux-handle"></div>
              <h2>Service Details</h2>
              <button className="lux-close-x" onClick={closeModal}>
                <X size={24} />
              </button>
            </div>
            <div className="lux-form-body">
              <div className="lux-view-hero">
                {editingService.imageUrl ? (
                  <img
                    src={editingService.imageUrl}
                    alt=""
                    className="lux-view-img"
                  />
                ) : (
                  <div className="lux-view-placeholder">
                    <Scissors size={48} />
                  </div>
                )}
                <div className="lux-view-main-info">
                  <span className="lux-row-badge">
                    {editingService.category}
                  </span>
                  <h3>{editingService.name}</h3>
                  <div className="lux-view-stats">
                    <span>
                      <Clock size={16} /> {editingService.duration || "30"} min
                    </span>
                    <span className="price-tag">
                      ${editingService.rate || editingService.price}
                    </span>
                  </div>
                </div>
              </div>
              <div className="lux-view-desc">
                <label>About this service</label>
                <p>
                  {editingService.description || "No description provided."}
                </p>
              </div>
            </div>
            <div className="lux-modal-footer">
              <button
                className="lux-btn-save"
                style={{ width: "100%" }}
                onClick={closeModal}
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ServicesScreen;
