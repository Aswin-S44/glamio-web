import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Clock,
  Edit2,
  Save,
  X,
  Star,
  Plus,
  Trash2,
} from "lucide-react";
import "./MyProfileScreen.css";
import Swal from "sweetalert2";
import Upload from "antd/es/upload";
import { convertToBase64 } from "../../utils/utils";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
  "Daily",
  "Weekends",
];

const MyProfileScreen = () => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/shops", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();

        if (
          data.shop &&
          (!data.shop.openingHours || !Array.isArray(data.shop.openingHours))
        ) {
          data.shop.openingHours = [];
        }
        setFormData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [token]);

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.user?.email || !emailRegex.test(formData.user.email))
      newErrors.email = "Invalid email";
    if (!formData.shop?.parlourName?.trim()) newErrors.parlourName = "Required";
    if (!formData.shop?.googleReviewUrl)
      newErrors.googleReviewUrl = "Google review url required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const addOpeningHour = () => {
    const newHours = [
      ...(formData.shop.openingHours || []),
      { day: "Monday", start: "09:00", end: "18:00" },
    ];
    handleChange("shop", "openingHours", newHours);
  };

  const removeOpeningHour = (index) => {
    const newHours = formData.shop.openingHours.filter((_, i) => i !== index);
    handleChange("shop", "openingHours", newHours);
  };

  const updateOpeningHour = (index, field, value) => {
    const newHours = formData.shop.openingHours.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    handleChange("shop", "openingHours", newHours);
  };

  const handleImageUpload = async (info) => {
    const { fileList } = info;
    if (fileList && fileList.length > 0) {
      const fileToProcess = fileList[fileList.length - 1].originFileObj;

      if (fileToProcess) {
        try {
          const base64 = await convertToBase64(fileToProcess);
          handleChange("user", "profileImage", base64);
        } catch (error) {
          console.error("Image conversion failed", error);
        }
      }
    }
  };

  const handleSave = async () => {
    if (!validate()) return;
    setIsEditing(false);
    try {
      const res = await fetch("http://localhost:5000/api/v1/shops", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed");
      Swal.fire({
        title: "Profile updated!",
        icon: "success",
        draggable: true,
      });
    } catch (err) {
      alert(err.message);
      setIsEditing(true);
    }
  };

  if (loading) return <div className="loading-container">Loading...</div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header-banner"></div>
        <div className="profile-header-content">
          <div className="profile-avatar-wrapper">
            <Upload
              listType="picture-card"
              className="service-uploader"
              beforeUpload={() => false}
              onChange={handleImageUpload}
              maxCount={1}
              showUploadList={false}
              disabled={!isEditing}
            >
              <img
                src={
                  formData?.user?.profileImage ||
                  "https://via.placeholder.com/150"
                }
                alt="Profile"
                className="profile-avatar"
              />
              <div className="status-indicator"></div>
            </Upload>
          </div>
          <div className="header-actions">
            {!isEditing ? (
              <button className="btn-edit" onClick={() => setIsEditing(true)}>
                <Edit2 size={16} /> Edit Profile
              </button>
            ) : (
              <div className="edit-buttons">
                <button
                  className="btn-cancel"
                  onClick={() => setIsEditing(false)}
                >
                  <X size={16} /> Cancel
                </button>
                <button className="btn-save" onClick={handleSave}>
                  <Save size={16} /> Save
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="profile-intro">
          <h1>{formData?.user?.username}</h1>
          <div className="rating-tag">
            <Star size={14} fill="currentColor" />
            <span>{formData?.shop?.totalRating || 0} / 5 Rating</span>
          </div>
        </div>

        <div className="profile-grid">
          <div className="sidebar-info">
            <section className="info-section">
              <h3>Contact Details</h3>
              <div className="info-item">
                <Mail size={18} />
                {isEditing ? (
                  <input
                    className={errors.email ? "input-error" : ""}
                    value={formData?.user?.email || ""}
                    onChange={(e) =>
                      handleChange("user", "email", e.target.value)
                    }
                  />
                ) : (
                  <span>{formData?.user?.email}</span>
                )}
              </div>
            </section>
          </div>

          <div className="main-info">
            <section className="info-section">
              <h3>Shop Information</h3>
              <div className="form-group">
                <label>Parlour Name</label>
                {isEditing ? (
                  <input
                    className={errors.parlourName ? "input-error" : ""}
                    value={formData?.shop?.parlourName || ""}
                    onChange={(e) =>
                      handleChange("shop", "parlourName", e.target.value)
                    }
                  />
                ) : (
                  <p className="text-highlight">
                    {formData?.shop?.parlourName}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label>
                  <Clock size={14} /> Opening Hours
                </label>
                {isEditing ? (
                  <div className="hours-editor">
                    {formData.shop.openingHours?.map((item, index) => (
                      <div key={index} className="hour-row">
                        <select
                          value={item.day}
                          onChange={(e) =>
                            updateOpeningHour(index, "day", e.target.value)
                          }
                        >
                          {DAYS.map((d) => (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          ))}
                        </select>
                        <input
                          type="time"
                          value={item.start}
                          onChange={(e) =>
                            updateOpeningHour(index, "start", e.target.value)
                          }
                        />
                        <span>to</span>
                        <input
                          type="time"
                          value={item.end}
                          onChange={(e) =>
                            updateOpeningHour(index, "end", e.target.value)
                          }
                        />
                        <button
                          className="btn-remove"
                          onClick={() => removeOpeningHour(index)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                    <button className="btn-add-hour" onClick={addOpeningHour}>
                      <Plus size={14} /> Add Schedule
                    </button>
                  </div>
                ) : (
                  <div className="hours-display">
                    {formData.shop.openingHours?.length > 0 ? (
                      formData.shop.openingHours.map((item, i) => (
                        <p key={i}>
                          {item.day}: {item.start} - {item.end}
                        </p>
                      ))
                    ) : (
                      <p>No hours set</p>
                    )}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>
                  <MapPin size={14} /> Location
                </label>
                {isEditing ? (
                  <input
                    value={formData?.shop?.address || ""}
                    onChange={(e) =>
                      handleChange("shop", "address", e.target.value)
                    }
                  />
                ) : (
                  <p>{formData?.shop?.address}</p>
                )}
              </div>

              <div className="form-group">
                <label>
                  <Globe size={14} /> Google Review URL
                </label>
                {isEditing ? (
                  <input
                    className={errors.googleReviewUrl ? "input-error" : ""}
                    value={formData?.shop?.googleReviewUrl || ""}
                    onChange={(e) =>
                      handleChange("shop", "googleReviewUrl", e.target.value)
                    }
                  />
                ) : (
                  formData?.shop?.googleReviewUrl && (
                    <a
                      href={formData.shop.googleReviewUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="google-link"
                    >
                      View on Google Maps
                    </a>
                  )
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfileScreen;
