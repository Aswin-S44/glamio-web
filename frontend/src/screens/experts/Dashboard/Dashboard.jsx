import React, { useState, useEffect, useRef } from "react";
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
  UserPlus2,
  Upload,
  LogOut,
  User,
  Settings,
  CreditCard,
  ChevronDown,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
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

const chartData = [
  { name: "Mon", revenue: 400, appointments: 24 },
  { name: "Tue", revenue: 300, appointments: 18 },
  { name: "Wed", revenue: 900, appointments: 45 },
  { name: "Thu", revenue: 700, appointments: 32 },
  { name: "Fri", revenue: 1200, appointments: 55 },
  { name: "Sat", revenue: 1500, appointments: 70 },
  { name: "Sun", revenue: 1100, appointments: 40 },
];

function Dashboard() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [serviceView, setServiceView] = useState("list");
  const [expertView, setExpertView] = useState("list");
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      name: "Sophia Reynolds",
      about: "Senior hair stylist with over 10 years of experience.",
      image:
        "https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?q=80&w=800&auto=format&fit=crop",
      specialist: ["Hair Styling", "Global Coloring"],
      isActive: true,
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="view-container animate-fade-in">
            <div className="stats-grid">
              <div className="stat-card gold-gradient">
                <div className="stat-info">
                  <span>Total Revenue</span>
                  <h2>$4,840.00</h2>
                  <p className="trend">+12.5% from last month</p>
                </div>
                <div className="stat-icon-circle">
                  <CreditCard size={24} />
                </div>
              </div>
              <div className="stat-card dark-gradient">
                <div className="stat-info">
                  <span>Appointments</span>
                  <h2>284</h2>
                  <p className="trend">+5.2% from last week</p>
                </div>
                <div className="stat-icon-circle">
                  <CalendarCheck size={24} />
                </div>
              </div>
              <div className="stat-card beige-gradient">
                <div className="stat-info">
                  <span>Active Clients</span>
                  <h2>1,204</h2>
                  <p className="trend">+18 new today</p>
                </div>
                <div className="stat-icon-circle">
                  <User size={24} />
                </div>
              </div>
            </div>

            <div className="charts-section">
              <div className="chart-card">
                <div className="chart-header">
                  <h3>Revenue Analytics</h3>
                  <select className="chart-select">
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                  </select>
                </div>
                <div className="chart-wrapper">
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient
                          id="colorRev"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#d4a373"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="#d4a373"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#f0f0f0"
                      />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#d4a373"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorRev)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="data-table-wrapper">
              <div className="table-header">
                <h3>Upcoming Appointments</h3>
                <button className="btn-outline">View All</button>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Service</th>
                    <th>Date & Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="user-cell">
                        <div className="avatar-xs">AS</div>
                        <span>Anna Smith</span>
                      </div>
                    </td>
                    <td>Premium Hair Styling</td>
                    <td>Today, 02:30 PM</td>
                    <td>
                      <span className="badge-status success">Confirmed</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      case "requests":
        return <UserRequests />;
      case "slots":
        return <SlotScreen />;
      case "appointments":
        return <AppointmentScreen />;
      case "offers":
        return <OfferScreen />;
      case "notifications":
        return <NotificationScreen />;
      case "services":
        return serviceView === "list" ? <ServicesScreen /> : <AddService />;
      case "experts":
        return expertView === "list" ? (
          <ExpertsScreen expertsData={sampleExperts} />
        ) : (
          <AddExpert />
        );
      default:
        return <div className="view-container">Select a tab</div>;
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
            <div className="logo-container">
              <Scissors size={20} />
            </div>
            <span className="brand-name">GLAMIO</span>
          </div>
          <button
            className="collapse-toggle"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <ChevronRight size={16} />
            ) : (
              <ChevronLeft size={16} />
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
              {activeTab === item.id && <div className="active-glow" />}
            </button>
          ))}
          <div className="menu-divider" />
          <button className="menu-item logout" onClick={() => navigate("/")}>
            <div className="icon-box">
              <LogOut size={20} />
            </div>
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
              <input type="text" placeholder="Search clients, services..." />
            </div>
          </div>
          <div className="nav-right">
            <div className="nav-actions">
              <div
                onClick={() => setActiveTab("notifications")}
                className="icon-btn"
              >
                <Bell size={20} />
                <span className="badge-dot" />
              </div>
            </div>
            <div className="profile-dropdown-container" ref={dropdownRef}>
              <div
                className="user-profile-trigger"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <div className="user-avatar">AD</div>
                <div className="user-meta">
                  <span className="user-name">Admin Dash</span>
                  <ChevronDown
                    size={14}
                    className={isProfileOpen ? "rotate" : ""}
                  />
                </div>
              </div>
              {isProfileOpen && (
                <div className="profile-dropdown animate-pop">
                  <div className="dropdown-header">
                    <p className="email">admin@glamio.com</p>
                  </div>
                  <button className="dropdown-item">
                    <User size={16} /> Profile Settings
                  </button>
                  <button className="dropdown-item">
                    <Settings size={16} /> Shop Settings
                  </button>
                  <div className="dropdown-divider" />
                  <button
                    className="dropdown-item text-danger"
                    onClick={() => navigate("/")}
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <section className="page-content">
          <div className="page-header-main">
            {activeTab === "home" && (
              <div className="title-area">
                <h1>Dashboard Overview</h1>
                <p>Welcome back! Here is what's happening today.</p>
              </div>
            )}
          </div>
          {renderContent()}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
