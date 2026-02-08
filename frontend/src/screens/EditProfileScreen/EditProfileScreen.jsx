import React, { useState } from "react";
import Upload from "antd/es/upload";
import {
  Camera,
  MapPin,
  Store,
  Info,
  Link,
  AlertCircle,
  Trash2,
  UploadCloud,
} from "lucide-react";
import "./EditProfileScreen.css";
import { convertToBase642 } from "../../utils/utils";

function EditProfileScreen() {
  const [formData, setFormData] = useState({
    parlourName: "",
    about: "",
    address: "",
    googleReviewUrl: "",
    shopImage: null,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.parlourName.trim()) {
      newErrors.parlourName = "Parlour name is required";
    } else if (formData.parlourName.length > 100) {
      newErrors.parlourName = "Name must be less than 100 characters";
    }

    if (!formData.about.trim()) {
      newErrors.about = "About section is required";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    } else if (formData.address.length > 100) {
      newErrors.address = "Address must be less than 100 characters";
    }

    if (
      formData.googleReviewUrl &&
      !formData.googleReviewUrl.startsWith("http")
    ) {
      newErrors.googleReviewUrl = "Please enter a valid URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleImageUpload = async (info) => {
    const { fileList } = info;

    if (fileList.length > 0) {
      // Get the last file added
      const lastFile = fileList[fileList.length - 1];
      // Ant Design wraps the native file in originFileObj
      const actualFile = lastFile.originFileObj || lastFile;

      if (actualFile instanceof Blob) {
        try {
          const base64 = await convertToBase642(actualFile);
          setFormData((prev) => ({ ...prev, shopImage: base64 }));
        } catch (error) {
          console.error("Conversion error:", error);
        }
      }
    } else {
      setFormData((prev) => ({ ...prev, shopImage: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        console.log("Submitting Profile:", formData);
        // Add your API call here
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="profile-page-wrapper">
      <div className="profile-container">
        <div className="profile-header">
          <h1>Complete Your Parlour profile</h1>
          <p>Complete these details to get started with your business</p>
        </div>

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="image-upload-section">
            <Upload
              listType="picture-card"
              className="profile-uploader"
              beforeUpload={() => false}
              onChange={handleImageUpload}
              maxCount={1}
              showUploadList={false}
              accept="image/*"
            >
              {formData.shopImage ? (
                <div className="profile-preview-wrapper">
                  <img
                    src={formData.shopImage}
                    alt="Shop"
                    className="profile-preview-img"
                  />
                  <div className="preview-overlay">
                    <Trash2
                      size={20}
                      onClick={(e) => {
                        e.stopPropagation();
                        setFormData((prev) => ({ ...prev, shopImage: null }));
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div className="upload-trigger-circle">
                  <UploadCloud size={28} color="var(--primary)" />
                  <span>Shop Image</span>
                </div>
              )}
            </Upload>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>
                <Store size={18} /> Parlour Name
              </label>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="parlourName"
                  className={errors.parlourName ? "input-error" : ""}
                  placeholder="Enter your parlour name"
                  value={formData.parlourName}
                  onChange={handleInputChange}
                />
                <span className="char-count">
                  {formData.parlourName.length}/100
                </span>
              </div>
              {errors.parlourName && (
                <span className="error-msg">
                  <AlertCircle size={14} /> {errors.parlourName}
                </span>
              )}
            </div>

            <div className="form-group">
              <label>
                <Info size={18} /> About
              </label>
              <textarea
                name="about"
                className={errors.about ? "input-error" : ""}
                placeholder="Brief description of your services..."
                value={formData.about}
                onChange={handleInputChange}
                rows="3"
              />
              {errors.about && (
                <span className="error-msg">
                  <AlertCircle size={14} /> {errors.about}
                </span>
              )}
            </div>

            <div className="form-group">
              <label>
                <MapPin size={18} /> Address
              </label>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="address"
                  className={errors.address ? "input-error" : ""}
                  placeholder="Street, City, Zip"
                  value={formData.address}
                  onChange={handleInputChange}
                />
                <span className="char-count">
                  {formData.address.length}/100
                </span>
              </div>
              {errors.address && (
                <span className="error-msg">
                  <AlertCircle size={14} /> {errors.address}
                </span>
              )}
            </div>

            <div className="form-group">
              <label>
                <Link size={18} /> Google Review URL (Optional)
              </label>
              <input
                type="url"
                name="googleReviewUrl"
                className={errors.googleReviewUrl ? "input-error" : ""}
                placeholder="https://g.page/your-shop/review"
                value={formData.googleReviewUrl}
                onChange={handleInputChange}
              />
              {errors.googleReviewUrl && (
                <span className="error-msg">
                  <AlertCircle size={14} /> {errors.googleReviewUrl}
                </span>
              )}
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Updating..." : "Complete Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfileScreen;
