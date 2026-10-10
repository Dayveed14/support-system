import { useTickets } from "../context/TicketContext";
import { useAuth } from "../context/AuthContext";
import { StatusBadge, PriorityBadge, formatDate } from "./Badges";
import "../styles/Dashboard.css";

export default function AgentDashboard({ onSelectTicket }) {
  const { tickets } = useTickets();
  const { currentUser } = useAuth();

  const myAssigned = tickets.filter((t) => t.assignedAgentId === currentUser.id);
  const open = myAssigned.filter((t) => t.status === "Open").length;
  const pending = myAssigned.filter((t) => t.status === "Pending").length;
  const resolved = myAssigned.filter((t) => t.status === "Resolved" || t.status === "Closed").length;
  const unassigned = tickets.filter((t) => !t.assignedAgentId && t.status === "Open");

  const recent = [...myAssigned].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).slice(0, 5);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div>
      <div className="dashboard-greeting">
        <div className="dashboard-greeting-title">{greeting}, {currentUser.name.split(" ")[0]} 👋</div>
        <div className="dashboard-greeting-sub">Here are your assigned tickets and queue.</div>
      </div>

      <div className="stats-grid">
        {[
          { label: "Assigned to Me", value: myAssigned.length, icon: "👤", color: "#4f7cff" },
          { label: "Open", value: open, icon: "📬", color: "#e67e22" },
          { label: "Pending", value: pending, icon: "⏳", color: "#f1c40f" },
          { label: "Resolved", value: resolved, icon: "✅", color: "#2ecc71" },
        ].map((s) => (
          <div className="stat-card" key={s.label}>
            <div className="stat-card-accent" style={{ background: s.color }} />
            <div className="stat-card-icon">{s.icon}</div>
            <div className="stat-card-value">{s.value}</div>
            <div className="stat-card-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="section-title">📋 My Assigned Tickets</div>
          {recent.length === 0 ? (
            <div style={{ color: "var(--text-muted)", fontSize: 13, textAlign: "center", padding: "20px 0" }}>
              No tickets assigned yet.
            </div>
          ) : recent.map((t) => (
            <div className="recent-ticket-item" key={t.id} onClick={() => onSelectTicket(t.id)}>
              <div className="recent-ticket-info">
                <div className="recent-ticket-id">{t.id}</div>
                <div className="recent-ticket-title">{t.title}</div>
                <div className="recent-ticket-meta">{t.customerName} · {formatDate(t.updatedAt)}</div>
              </div>
              <StatusBadge status={t.status} />
            </div>
          ))}
        </div>

        <div className="dashboard-card">
          <div className="section-title">🔔 Unassigned Queue ({unassigned.length})</div>
          {unassigned.length === 0 ? (
            <div style={{ color: "var(--text-muted)", fontSize: 13, textAlign: "center", padding: "20px 0" }}>
              Queue is clear 🎉
            </div>
          ) : unassigned.slice(0, 5).map((t) => (
            <div className="recent-ticket-item" key={t.id} onClick={() => onSelectTicket(t.id)}>
              <div className="recent-ticket-info">
                <div className="recent-ticket-id">{t.id}</div>
                <div className="recent-ticket-title">{t.title}</div>
                <div className="recent-ticket-meta">{t.customerName}</div>
              </div>
              <PriorityBadge priority={t.priority} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
