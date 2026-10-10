import { useTickets } from "../context/TicketContext";
import { useAuth } from "../context/AuthContext";
import { StatusBadge, PriorityBadge, formatDate } from "./Badges";
import "../styles/Dashboard.css";

export default function CustomerDashboard({ onSelectTicket, onNewTicket }) {
  const { tickets, ticketsLoading, ticketsError, refreshTickets } = useTickets();
  const { currentUser } = useAuth();

  const myTickets = tickets.filter((t) => t.customerId === currentUser.id);
  const open = myTickets.filter((t) => t.status === "Open").length;
  const pending = myTickets.filter((t) => t.status === "Pending").length;
  const resolved = myTickets.filter((t) => t.status === "Resolved" || t.status === "Closed").length;

  const recent = [...myTickets].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).slice(0, 5);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div>
      <div className="dashboard-greeting">
        <div className="dashboard-greeting-title">{greeting}, {currentUser.name.split(" ")[0]} 👋</div>
        <div className="dashboard-greeting-sub">Track and manage your support requests below.</div>
      </div>

      {ticketsError && <div className="login-error" role="alert" style={{ marginBottom: 16 }}>
        {ticketsError} <button className="btn-secondary" onClick={refreshTickets}>Retry</button>
      </div>}

      <div className="stats-grid">
        {[
          { label: "Open Tickets", value: open, icon: "📬", color: "#4f7cff" },
          { label: "Pending", value: pending, icon: "⏳", color: "#f1c40f" },
          { label: "Resolved", value: resolved, icon: "✅", color: "#2ecc71" },
          { label: "Total", value: myTickets.length, icon: "🎫", color: "#9b59b6" },
        ].map((s) => (
          <div className="stat-card" key={s.label}>
            <div className="stat-card-accent" style={{ background: s.color }} />
            <div className="stat-card-icon">{s.icon}</div>
            <div className="stat-card-value">{ticketsLoading ? "…" : s.value}</div>
            <div className="stat-card-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="dashboard-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div className="section-title" style={{ marginBottom: 0 }}>Recent Tickets</div>
          <button className="btn-primary" onClick={onNewTicket}>+ New Ticket</button>
        </div>

        {ticketsLoading && recent.length === 0 ? (
          <div className="empty-state"><div className="empty-state-text">Loading your tickets from the database…</div></div>
        ) : recent.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🎫</div>
            <div className="empty-state-title">No tickets yet</div>
            <div className="empty-state-text">Create a ticket to get help from our support team.</div>
          </div>
        ) : (
          recent.map((t) => (
            <div className="recent-ticket-item" key={t.id} onClick={() => onSelectTicket(t.id)}>
              <div className="recent-ticket-info">
                <div className="recent-ticket-id">{t.id}</div>
                <div className="recent-ticket-title">{t.title}</div>
                <div className="recent-ticket-meta">{t.category} · Updated {formatDate(t.updatedAt)}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                <StatusBadge status={t.status} />
                <PriorityBadge priority={t.priority} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
