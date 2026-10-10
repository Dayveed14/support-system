import { useAuth } from "../context/AuthContext";
import { useTickets } from "../context/TicketContext";
import "../styles/Layout.css";

export default function Layout({ children, activePage, onNavigate, topbarTitle }) {
  const { currentUser, logout } = useAuth();
  const { tickets } = useTickets();

  const openCount = tickets.filter((t) => t.status === "Open").length;

  const customerNav = [
    { id: "dashboard", icon: "🏠", label: "Home" },
    { id: "my-tickets", icon: "🎫", label: "My Tickets", badge: tickets.filter(t => t.customerId === currentUser.id && t.status === "Open").length },
    { id: "new-ticket", icon: "✏️", label: "New Ticket" },
  ];

  const agentNav = [
    { id: "dashboard", icon: "🏠", label: "Home" },
    { id: "all-tickets", icon: "🎫", label: "All Tickets", badge: openCount },
    { id: "my-assigned", icon: "👤", label: "My Assigned" },
  ];

  const adminNav = [
    { id: "dashboard", icon: "📊", label: "Dashboard" },
    { id: "all-tickets", icon: "🎫", label: "All Tickets", badge: openCount },
    { id: "agents", icon: "👥", label: "Agents" },
  ];

  const navItems =
    currentUser.role === "admin" ? adminNav :
    currentUser.role === "agent" ? agentNav : customerNav;

  return (
    <div className="layout-root">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">🎫</div>
          <div className="sidebar-logo-text">SupportDesk</div>
        </div>

        <div className="sidebar-user">
          <div className="sidebar-avatar">{currentUser.avatar}</div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">{currentUser.name}</div>
            <div className="sidebar-user-role">{currentUser.role}</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="sidebar-section-label">Navigation</div>
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`sidebar-nav-item ${activePage === item.id ? "active" : ""}`}
              onClick={() => onNavigate(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
              {item.badge > 0 && <span className="sidebar-nav-badge">{item.badge}</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-logout-btn" onClick={logout}>
            <span>🚪</span> Sign Out
          </button>
        </div>
      </aside>

      <div className="layout-main">
        <div className="main-topbar">
          <div className="topbar-title">{topbarTitle}</div>
          <div className="topbar-actions">
            <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
              {new Date().toLocaleDateString("en-NG", { weekday: "long", month: "short", day: "numeric" })}
            </span>
          </div>
        </div>
        <div className="main-content">{children}</div>
      </div>
    </div>
  );
}
