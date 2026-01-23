import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import "./Dashboard.css";
import AddService from "../AddService/AddService";
import SlotScreen from "../../SlotScreen/SlotScreen";

function Dashboard() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [serviceView, setServiceView] = useState("list");

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
  ];

  const handleTabChange = (id) => {
    setActiveTab(id);
    setServiceView("list");
    setIsMobileOpen(false);
  };

 

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
                <button className="text-link">View All</button>
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
          <div className="view-container animate-fade-in">
            <div className="requests-list">
              {[1, 2, 3].map((i) => (
                <div key={i} className="request-item">
                  <div className="req-user">
                    <div className="avatar-small">U{i}</div>
                    <div>
                      <h4>User Request #{i}</h4>
                      <p>Requested for Bridal Makeup</p>
                    </div>
                  </div>
                  <div className="req-actions">
                    <button className="btn-approve">
                      <Check size={18} />
                    </button>
                    <button className="btn-reject">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "slots":
        return (
          <div>
            <SlotScreen />
          </div>
        );
      case "services":
        return serviceView === "list" ? (
          <div className="view-container animate-fade-in">
            <div className="content-card">
              <div className="table-header">
                <h3>Active Services</h3>
                <button
                  className="add-btn-main"
                  onClick={() => setServiceView("add")}
                >
                  <Plus size={18} /> Add Service
                </button>
              </div>
              <div className="services-grid">
                <div className="service-item-card">
                  <div className="s-img"></div>
                  <div className="s-info">
                    <h4>Hair Coloring</h4>
                    <p>$80.00 • 60 Mins</p>
                  </div>
                  <button className="s-delete">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <AddService />
        );
      default:
        return (
          <div className="view-container">
            <h2>Coming Soon</h2>
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
            <span className="brand-name">GlowBar</span>
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
            <div className="icon-btn">
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
            <h1>
              {serviceView === "add" && activeTab === "services"
                ? "Add New Service"
                : menuItems.find((i) => i.id === activeTab).label}
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
