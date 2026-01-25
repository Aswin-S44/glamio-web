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
} from "lucide-react";
import "./MyProfileScreen.css";

const MyProfileScreen = () => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
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

        if (!res.ok) throw new Error("Failed to fetch user");

        const data = await res.json();
        setFormData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [token]);

  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const handleSave = async () => {
    setIsEditing(false);
    console.log("Saving to API:", formData);

    const res = await fetch("http://localhost:5000/api/v1/shops", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(formData),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Failed to save profile");
    }

    alert("Profile updated");
  };

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  if (!formData) {
    return <div className="error-container">Failed to load profile.</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header-banner"></div>
        <div className="profile-header-content">
          <div className="profile-avatar-wrapper">
            <img
              src={
                formData?.user?.profileImage ||
                "https://via.placeholder.com/150"
              }
              alt="Profile"
              className="profile-avatar"
            />
            <div className="status-indicator"></div>
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
            <span>
              {formData?.shop?.totalRating || 0} / 5 Rating • Shop Owner
            </span>
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
                    value={formData?.user?.email || ""}
                    onChange={(e) =>
                      handleChange("user", "email", e.target.value)
                    }
                  />
                ) : (
                  <span>{formData?.user?.email}</span>
                )}
              </div>
              <div className="info-item">
                <Phone size={18} />
                {isEditing ? (
                  <input
                    value={formData?.user?.phone || ""}
                    onChange={(e) =>
                      handleChange("user", "phone", e.target.value)
                    }
                  />
                ) : (
                  <span>{formData?.user?.phone || "Add Phone"}</span>
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
                <label>About</label>
                {isEditing ? (
                  <textarea
                    rows="3"
                    value={formData?.shop?.about || ""}
                    onChange={(e) =>
                      handleChange("shop", "about", e.target.value)
                    }
                  />
                ) : (
                  <p>{formData?.shop?.about || "No description provided."}</p>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    <Clock size={14} /> Opening Hours
                  </label>
                  <span>{formData?.shop?.openingHours?.[0] || "Not set"}</span>
                </div>
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

              {formData?.shop?.googleReviewUrl && (
                <a
                  href={formData.shop.googleReviewUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="google-link"
                >
                  <Globe size={16} /> View on Google Maps
                </a>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfileScreen;
