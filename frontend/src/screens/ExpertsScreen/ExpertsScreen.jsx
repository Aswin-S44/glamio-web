import React, { useState, useEffect, useRef } from "react";
import CreatableSelect from "react-select/creatable";
import Upload from "antd/es/upload";
import {
  Plus,
  Search,
  X,
  ChevronLeft,
  Camera,
  MoreVertical,
  Edit2,
  Trash2,
  Eye,
  User,
  MapPin,
  Briefcase,
} from "lucide-react";
import "./ExpertsScreen.css";

const SPECIALISATION_OPTIONS = [
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
    padding: "5px",
    borderRadius: "12px",
    background: "#fdfaf7",
    border: state.isFocused ? "2px solid #d4a373" : "1px solid #faedcd",
    boxShadow: "none",
    "&:hover": { borderColor: "#d4a373" },
  }),
};

function ExpertsScreen() {
  const [experts, setExperts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingExpert, setEditingExpert] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);

  const [expertName, setExpertName] = useState("");
  const [about, setAbout] = useState("");
  const [address, setAddress] = useState("");
  const [specialist, setSpecialist] = useState(null);
  const [image, setImage] = useState(null);

  const token = localStorage.getItem("token");
  const menuRef = useRef();

  useEffect(() => {
    fetchExperts();
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchExperts = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/v1/expert", {
        headers: { Authorization: `${token}` },
      });
      const data = await res.json();
      if (data.experts) setExperts(data.experts);
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

  const handleSaveExpert = async (e) => {
    e.preventDefault();
    const submitData = {
      name: expertName,
      about,
      address,
      image,
      specialist: specialist?.value,
    };

    try {
      const url = editingExpert
        ? `http://localhost:5000/api/v1/expert/${editingExpert.id}`
        : "http://localhost:5000/api/v1/expert";
      const res = await fetch(url, {
        method: editingExpert ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(submitData),
      });
      if (res.ok) {
        fetchExperts();
        closeModal();
      }
    } catch (error) {
      alert("Error saving expert");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this expert?")) {
      try {
        await fetch(`http://localhost:5000/api/v1/expert/${id}`, {
          method: "DELETE",
          headers: { Authorization: `${token}` },
        });
        fetchExperts();
        setActiveMenu(null);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const openModal = (expert = null) => {
    if (expert) {
      setEditingExpert(expert);
      setExpertName(expert.name);
      setAbout(expert.about);
      setAddress(expert.address);
      setSpecialist({ value: expert.specialist, label: expert.specialist });
      setImage(expert.image);
    } else {
      setEditingExpert(null);
      setExpertName("");
      setAbout("");
      setAddress("");
      setSpecialist(null);
      setImage(null);
    }
    setModalOpen(true);
    setActiveMenu(null);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingExpert(null);
  };

  const filteredExperts = experts.filter((ex) => {
    const matchesSearch = ex.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === "All" || ex.specialist === activeTab;
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
            <h1>Our Experts</h1>
            <p>Manage your professional team members</p>
          </div>
        </div>
        <button className="sv-add-btn" onClick={() => openModal()}>
          <Plus size={20} />
          <span>Add Expert</span>
        </button>
      </header>

      <main className="sv-content">
        <div className="sv-filter-bar">
          <div className="sv-search">
            <Search className="sv-search-icon" size={18} />
            <input
              type="text"
              placeholder="Search experts..."
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

        <div className="expert-grid">
          {filteredExperts.map((expert) => (
            <div key={expert.id} className="expert-card">
              <div className="expert-card-header">
                <div className="expert-image-wrapper">
                  {expert.image ? (
                    <img src={expert.image} alt={expert.name} />
                  ) : (
                    <div className="expert-placeholder">
                      <User size={30} />
                    </div>
                  )}
                  <span className="specialist-tag">{expert.specialist}</span>
                </div>
                <div
                  className="expert-actions-wrapper"
                  ref={activeMenu === expert.id ? menuRef : null}
                >
                  <button
                    className="action-dot-btn"
                    onClick={() =>
                      setActiveMenu(activeMenu === expert.id ? null : expert.id)
                    }
                  >
                    <MoreVertical size={20} />
                  </button>
                  {activeMenu === expert.id && (
                    <div className="action-dropdown">
                      <button
                        onClick={() => alert(JSON.stringify(expert, null, 2))}
                      >
                        <Eye size={16} /> View
                      </button>
                      <button onClick={() => openModal(expert)}>
                        <Edit2 size={16} /> Edit
                      </button>
                      <button
                        className="delete-opt"
                        onClick={() => handleDelete(expert.id)}
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="expert-card-body">
                <h3>{expert.name}</h3>
                <p className="expert-about">{expert.about}</p>
                <div className="expert-info">
                  <MapPin size={14} /> <span>{expert.address}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {modalOpen && (
        <div className="sv-modal-backdrop">
          <div className="sv-modal-pane">
            <div className="sv-modal-header">
              <h2>{editingExpert ? "Update Expert" : "New Expert Profile"}</h2>
              <button className="sv-close-btn" onClick={closeModal}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveExpert} className="sv-form">
              <div className="sv-form-scroll">
                <div className="sv-upload-center">
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
                        <span>Add Photo</span>
                      </div>
                    )}
                  </Upload>
                </div>

                <div className="sv-input-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="Expert's name"
                    value={expertName}
                    onChange={(e) => setExpertName(e.target.value)}
                    required
                  />
                </div>

                <div className="sv-input-group">
                  <label>Specialisation</label>
                  <CreatableSelect
                    isClearable
                    options={SPECIALISATION_OPTIONS}
                    styles={customSelectStyles}
                    placeholder="Select expertise..."
                    value={specialist}
                    onChange={(val) => setSpecialist(val)}
                    required
                  />
                </div>

                <div className="sv-input-group">
                  <label>Brief Bio</label>
                  <input
                    type="text"
                    placeholder="e.g. 10 years experience in styling"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    required
                  />
                </div>

                <div className="sv-input-group">
                  <label>Work Address</label>
                  <textarea
                    placeholder="Studio or Shop location"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
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
                  Cancel
                </button>
                <button type="submit" className="sv-btn-save">
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExpertsScreen;
