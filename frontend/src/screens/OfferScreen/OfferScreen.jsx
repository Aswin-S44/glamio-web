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
    const [offers, setOffers] = useState(dummyOffers);
    const [searchTerm, setSearchTerm] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [editingOffer, setEditingOffer] = useState(null);

    const [title, setTitle] = useState("");
    const [discount, setDiscount] = useState("");
    const [validTill, setValidTill] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);

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
                            <Upload
                            style={{width:"100%"}}
                                listType="picture-card"
                                beforeUpload={() => false}
                                showUploadList={false}
                            >
                                {image ? (
                                    <img src={image} alt="preview" className="of-preview" />
                                ) : (
                                    <div className="of-upload">
                                        <Camera size={24} />
                                        <span>Upload Image</span>
                                    </div>
                                )}
                            </Upload>

                            <input
                                placeholder="Offer Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />

                            <input
                                type="number"
                                placeholder="Discount %"
                                value={discount}
                                onChange={(e) => setDiscount(e.target.value)}
                                required
                            />

                            <input
                                type="text"
                                placeholder="Valid till (e.g. 31 Dec 2026)"
                                value={validTill}
                                onChange={(e) => setValidTill(e.target.value)}
                            />

                            <textarea
                                rows="3"
                                placeholder="Offer description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />

                            <div className="of-modal-footer">
                                <button type="button" onClick={closeModal}>
                                    Cancel
                                </button>
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
