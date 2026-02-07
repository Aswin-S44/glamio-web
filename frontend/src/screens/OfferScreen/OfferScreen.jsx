import React, { useState } from "react";
import Upload from "antd/es/upload";
import {
    Plus,
    Search,
    Tag,
    Trash2,
    Edit2,
    Clock,
    X,
    ChevronLeft,
    Percent,
    Camera,
} from "lucide-react";
import "./OfferScreen.css";


const SERVICE_DATA = {
    Hair: [
        { name: "Hair Cut", price: 1200, image: "/dummy/haircut.jpg" },
        { name: "Hair Spa", price: 2500, image: "/dummy/hairspa.jpg" },
    ],
    Nails: [
        { name: "Manicure", price: 1800, image: "/dummy/manicure.jpg" },
        { name: "Pedicure", price: 2200, image: "/dummy/pedicure.jpg" },
    ],
    Skin: [
        { name: "Facial", price: 3000, image: "/dummy/facial.jpg" },
    ],
};




const dummyOffers = [
    {
        id: 1,
        title: "New Year Glow Pack",
        discount: 25,
        validTill: "31 Dec 2026",
        description: "Premium beauty services at festive prices",
        imageUrl: null,
    },
    {
        id: 2,
        title: "Hair Care Combo",
        discount: 15,
        validTill: "No expiry",
        description: "Hair spa + haircut combo",
        imageUrl: null,
    },
];

function OfferScreen() {
    const [category, setCategory] = useState("");
    const [service, setService] = useState("");
    const [regularPrice, setRegularPrice] = useState("");
    const [offerPrice, setOfferPrice] = useState("");
    const [useServiceImage, setUseServiceImage] = useState(false);

    const [offers, setOffers] = useState(dummyOffers);
    const [searchTerm, setSearchTerm] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [editingOffer, setEditingOffer] = useState(null);

    const [title, setTitle] = useState("");
    const [discount, setDiscount] = useState("");
    const [validTill, setValidTill] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);


    const handleCategoryChange = (value) => {
        setCategory(value);
        setService("");
        setRegularPrice("");
        setImage(null);
    };

    const handleServiceChange = (value) => {
        setService(value);
        const selected = SERVICE_DATA[category].find(s => s.name === value);
        if (selected) {
            setRegularPrice(selected.price);
            if (useServiceImage) setImage(selected.image);
        }
    };


    const openModal = (offer = null) => {
        if (offer) {
            setEditingOffer(offer);
            setTitle(offer.title);
            setDiscount(offer.discount);
            setValidTill(offer.validTill);
            setDescription(offer.description);
            setImage(offer.imageUrl);
        } else {
            setEditingOffer(null);
            setTitle("");
            setDiscount("");
            setValidTill("");
            setDescription("");
            setImage(null);
        }
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setEditingOffer(null);
    };

    const handleSave = (e) => {
        e.preventDefault();
        closeModal();
    };

    const filteredOffers = offers.filter((o) =>
        o.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="of-page">
            <header className="of-header">
                <div className="of-nav-brand">
                    <button className="of-back-circle">
                        <ChevronLeft size={20} />
                    </button>
                    <div>
                        <h1>Special Offers</h1>
                        <p>Create attractive deals for your customers</p>
                    </div>
                </div>

                <button className="of-add-btn" onClick={() => openModal()}>
                    <Plus size={20} />
                    <span>New Offer</span>
                </button>
            </header>

            <main className="of-content">
                <div className="of-search">
                    <Search size={18} />
                    <input
                        placeholder="Search offers..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="of-grid">
                    {filteredOffers.map((offer) => (
                        <div key={offer.id} className="of-card">
                            <div className="of-img-wrap">
                                {offer.imageUrl ? (
                                    <img src={offer.imageUrl} alt={offer.title} />
                                ) : (
                                    <div className="of-placeholder">
                                        <Tag size={40} />
                                    </div>
                                )}

                                <div className="of-discount">
                                    <Percent size={14} /> {offer.discount}%
                                </div>
                            </div>

                            <div className="of-body">
                                <h3>{offer.title}</h3>
                                <p>{offer.description}</p>
                            </div>

                            <div className="of-foot">
                                <div className="of-meta">
                                    <Clock size={14} />
                                    <span>{offer.validTill}</span>
                                </div>

                                <div className="of-actions">
                                    <button onClick={() => openModal(offer)}>
                                        <Edit2 size={16} />
                                    </button>
                                    <button>
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="of-add-placeholder" onClick={() => openModal()}>
                        <div className="of-plus-ring">
                            <Plus size={32} />
                        </div>
                        <p>Add Offer</p>
                    </div>
                </div>
            </main>

            {modalOpen && (
                <div className="of-modal-backdrop">
                    <div className="of-modal">
                        <div className="of-modal-header">
                            <h2>{editingOffer ? "Edit Offer" : "New Offer"}</h2>
                            <button onClick={closeModal}>
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="of-form">

                            <select value={category} onChange={(e) => handleCategoryChange(e.target.value)} required>
                                <option value="">Select Category</option>
                                {Object.keys(SERVICE_DATA).map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>

                            <select
                                value={service}
                                onChange={(e) => handleServiceChange(e.target.value)}
                                disabled={!category}
                                required
                            >
                                <option value="">Select Service</option>
                                {category &&
                                    SERVICE_DATA[category].map(s => (
                                        <option key={s.name} value={s.name}>{s.name}</option>
                                    ))}
                            </select>

                            <input
                                type="number"
                                placeholder="Regular Price"
                                value={regularPrice}
                                readOnly
                            />

                            <input
                                type="number"
                                placeholder="Offer Price"
                                value={offerPrice}
                                onChange={(e) => setOfferPrice(e.target.value)}
                                required
                            />

                            <label className="of-toggle">
                                <input style={{width:"auto"}}
                                    type="checkbox"
                                    checked={useServiceImage}
                                    onChange={(e) => {
                                        setUseServiceImage(e.target.checked);
                                        if (e.target.checked && service) {
                                            const img = SERVICE_DATA[category].find(s => s.name === service)?.image;
                                            setImage(img);
                                        }
                                    }}
                                />
                                <span>Use same image as service</span>
                            </label>

                            {!useServiceImage && (
                                <Upload style={{width:"100%", marginTop:"20px", marginBottom:"20px"}}
                                    listType="picture-card"
                                    beforeUpload={() => false}
                                    showUploadList={false}
                                >
                                    {image ? (
                                        <img src={image} alt="preview" className="of-preview" />
                                    ) : (
                                        <div className="of-upload">
                                            <Camera size={24} />
                                            <span>Upload Offer Image</span>
                                        </div>
                                    )}
                                </Upload>
                            )}

                            <div className="of-modal-footer">
                                <button type="button" onClick={closeModal}>Cancel</button>
                                <button type="submit">Save Offer</button>
                            </div>

                        </form>

                    </div>
                </div>
            )}
        </div>
    );
}

export default OfferScreen;
