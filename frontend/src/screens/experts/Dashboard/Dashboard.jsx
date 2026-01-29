import React, { useState, useEffect, use } from "react";
import { useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  UserPlus,
  CalendarCheck,
  Clock,
  Menu,
  X,
  Bell,
  Search,
  Scissors,
  ChevronLeft,
  ChevronRight,
  Plus,
  Check,
  Trash2,
  Sparkles,
  Tag,
  ArrowLeft,
  Upload,
  UserPlus2,
  Upload, LogOut
} from "lucide-react";
import "./Dashboard.css";
import AddService from "../AddService/AddService";
import SlotScreen from "../../SlotScreen/SlotScreen";
import ServicesScreen from "../../ServicesScreen/ServicesScreen";
import ExpertsScreen from "../../ExpertsScreen/ExpertsScreen";
import AddExpert from "../../AddExpert/AddExpert";
import UserRequests from "../../UserRequests/UserRequests";
import AppointmentScreen from "../../AppointmentScreen/AppointmentScreen";
import OfferScreen from "../../OfferScreen/OfferScreen";
import NotificationScreen from "../../Notifications/NotificationScreen";

function Dashboard() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [serviceView, setServiceView] = useState("list");
  const [expertView, setExpertView] = useState("list");
  const navigate = useNavigate()

  const menuItems = [
    { id: "home", label: "Overview", icon: <LayoutDashboard size={20} /> },
    { id: "requests", label: "User Requests", icon: <UserPlus size={20} /> },
    {
      id: "appointments",
      label: "Appointments",
      icon: <CalendarCheck size={20} />,
    },
    { id: "slots", label: "Time Slots", icon: <Clock size={20} /> },
    { id: "services", label: "Services", icon: <Sparkles size={20} /> },
    { id: "offers", label: "Offers", icon: <Tag size={20} /> },
    { id: "experts", label: "Experts", icon: <UserPlus2 size={20} /> },

  ];

  const handleTabChange = (id) => {
    setActiveTab(id);
    setServiceView("list");
    setIsMobileOpen(false);
  };

  const sampleExperts = [
    {
      id: 1,
      shopId: 101,
      name: "Sophia Reynolds",
      about:
        "Senior hair stylist with over 10 years of experience in modern cuts, creative coloring, and bridal transformations.",
      address: "Street 12, Downtown Beauty Hub",
      image:
        "https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?q=80&w=800&auto=format&fit=crop",
      specialist: ["Hair Styling", "Global Coloring", "Keratin"],
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      shopId: 101,
      name: "Marcus Chen",
      about:
        "Specializing in skincare treatments and therapeutic facials designed to rejuvenate and refresh your natural glow.",
      address: "Suite 4, The Grand Plaza",
      image:
        "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?q=80&w=800&auto=format&fit=crop",
      specialist: ["Facials", "Chemical Peels", "Skin Consultation"],
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      shopId: 101,
      name: "Elena Rodriguez",
      about:
        "Award-winning makeup artist known for high-fashion editorial looks and elegant evening glam for special occasions.",
      address: "Studio 15, North Wing Arcade",
      image:
        "https://images.unsplash.com/photo-1583391262775-946328325a77?q=80&w=800&auto=format&fit=crop",
      specialist: ["Bridal Makeup", "Party Glow", "HD Makeup"],
      isActive: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 4,
      shopId: 101,
      name: "Amara J",
      about:
        "Expert in nail art and extensions, focusing on precision, hygiene, and the latest trends in the nail industry.",
      address: "Shop 5, East Riverside",
      image:
        "https://images.unsplash.com/photo-1594465919760-441fe5908ab0?q=80&w=800&auto=format&fit=crop",
      specialist: ["Gel Nails", "Manicure", "Nail Extension"],
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="view-container animate-fade-in">
            <div className="stats-grid">
              <div className="stat-card pink">
                <div className="stat-info">
                  <span>Total Earnings</span>
                  <h2>$2,840.00</h2>
                </div>
                <div className="stat-icon">
                  <Plus size={20} />
                </div>
              </div>
              <div className="stat-card purple">
                <div className="stat-info">
                  <span>Active Clients</span>
                  <h2>124</h2>
                </div>
              </div>
              <div className="stat-card dark">
                <div className="stat-info">
                  <span>New Messages</span>
                  <h2>08</h2>
                </div>
              </div>
            </div>
            <div className="data-table-wrapper">
              <div className="table-header">
                <h3>Recent Appointments</h3>
                <button className="text-link btn-dash">View All</button>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Service</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Anna Smith</td>
                    <td>Hair Styling</td>
                    <td>Oct 12, 2023</td>
                    <td>
                      <span className="badge-confirmed">Confirmed</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      case "requests":
        return (
          <div>
            <UserRequests />
          </div>
        );
      case "slots":
        return (
          <div>
            <SlotScreen />
          </div>
        );
      case "appointments":
        return (
          <div>
            <AppointmentScreen />
          </div>
        );
      case "offers":
        return (
          <div>
            <OfferScreen />
          </div>
        );
        case "notifications":
        return (
          <div>
            <NotificationScreen />
          </div>
        );
      case "services":
        return serviceView === "list" ? (
          <div className="view-container animate-fade-in">
            <div className="content-card">
              <ServicesScreen />
            </div>
          </div>
        ) : (
          <AddService />
        );

      case "experts":
        return expertView === "list" ? (
          <div className="view-container animate-fade-in">
            <div className="content-card">
              <ExpertsScreen expertsData={sampleExperts} />
            </div>
          </div>
        ) : (
          <AddExpert />
        );
      default:
        return (
          <div className="view-container">
            <OfferScreen />
          </div>
        );
    }
  };

  return (
    <div className={`dashboard-root ${isCollapsed ? "collapsed" : ""}`}>
      {isMobileOpen && (
        <div className="overlay" onClick={() => setIsMobileOpen(false)} />
      )}

      <aside className={`side-menu ${isMobileOpen ? "mobile-open" : ""}`}>
        <div className="menu-header">
          <div className="brand">
            <Scissors className="brand-logo" />
            <span className="brand-name">Glamio</span>
          </div>
          <button
            className="collapse-toggle"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <ChevronRight size={18} />
            ) : (
              <ChevronLeft size={18} />
            )}
          </button>
        </div>

        <nav className="menu-items">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`menu-item ${activeTab === item.id ? "active" : ""}`}
              onClick={() => handleTabChange(item.id)}
            >
              <div className="icon-box">{item.icon}</div>
              <span className="item-label">{item.label}</span>
              {activeTab === item.id && <div className="active-indicator" />}
            </button>
          ))}

          <button

            className={`menu-item `}
            onClick={() => navigate("/")}
          >
            <div className="icon-box"><LogOut size={20} /></div>
            <span className="item-label">Logout</span>

          </button>

        </nav>
      </aside>

      <main className="content-body">
        <header className="navbar">
          <div className="nav-left">
            <button
              className="mobile-toggle"
              onClick={() => setIsMobileOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="search-bar">
              <Search size={18} />
              <input type="text" placeholder="Quick Search..." />
            </div>
          </div>
          <div className="nav-right">
            <div onClick={() => setActiveTab("notifications")} className="icon-btn" >
              <Bell size={20} />
              <span className="dot" />
            </div>
            <div className="user-profile">
              <div className="user-avatar">AD</div>
            </div>
          </div>
        </header>

        <section className="page-content">
          <div className="page-header">
            {/* <h1>
              {serviceView === "add" && activeTab === "services"
                ? "Add New Service"
                : menuItems.find((i) => i.id === activeTab).label}
            </h1> */}
            <h1>
              {activeTab === "notifications"
                ? "Notifications"
                : serviceView === "add" && activeTab === "services"
                  ? "Add New Service"
                  : menuItems.find((i) => i.id === activeTab)?.label}
            </h1>
            <p>Managing your beauty studio efficiently</p>
          </div>
          {renderContent()}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
