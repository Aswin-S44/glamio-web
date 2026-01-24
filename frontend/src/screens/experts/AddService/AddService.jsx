import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";
import Upload from "antd/es/upload";
import { convertToBase64 } from "../../../utils/utils";
import { useAuth } from "../../../context/AuthContext";
import "./AddService.css";

const CATEGORY_OPTIONS = [
  { value: "hair_cut", label: "Hair Cut" },
  { value: "skin", label: "Skin Care" },
  { value: "nails", label: "Nail Art" },
  { value: "makeup", label: "Makeup" },
];

const customSelectStyles = {
  control: (base, state) => ({
    ...base,
    padding: "5px",
    borderRadius: "12px",
    border: state.isFocused ? "2px solid #d4a373" : "1px solid #e5e7eb",
    boxShadow: "none",
    "&:hover": { borderColor: "#d4a373" },
  }),
};

function AddService() {
  const { user } = useAuth();
  const token = localStorage.getItem("token");

  const [serviceName, setServiceName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [image, setImage] = useState(null);

  const handleImageUpload = async ({ fileList }) => {
    const base64Images = await Promise.all(fileList.map(convertToBase64));
    if (base64Images.length > 0) {
      setImage(base64Images[0]);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const submitData = {
      name: serviceName,
      imageUrl: image,
      rate: price,
      category: category?.value,
    };

    try {
      const res = await fetch("http://localhost:5000/api/v1/shop/service", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(submitData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to create service");
      }

      console.log("Service created:", result);
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };

  return (
    <div className="admin-container">
      <form className="service-card" onSubmit={onSubmit}>
        <div className="header-section">
          <h2>Add New Service</h2>
          <p>Create a professional service listing for your shop</p>
        </div>

        <div className="form-body">
          <div className="input-group">
            <label>Category</label>
            <CreatableSelect
              isClearable
              options={CATEGORY_OPTIONS}
              styles={customSelectStyles}
              placeholder="Search or type new category..."
              value={category}
              onChange={(newValue) => setCategory(newValue)}
              required
            />
          </div>

          <div className="input-group">
            <label>Service Name</label>
            <input
              type="text"
              placeholder="e.g. Luxury Bridal Facial"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
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

          <div className="input-group">
            <label>Service Image</label>
            <Upload
              listType="picture"
              beforeUpload={() => false}
              onChange={handleImageUpload}
              showUploadList={true}
              maxCount={1}
            >
              <button type="button" className="btn-secondary">
                Select Image
              </button>
            </Upload>
          </div>
        </div>

        <div className="footer-section">
          <button type="button" className="btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Save Service
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddService;
