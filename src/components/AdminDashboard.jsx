import { useTickets } from "../context/TicketContext";
import { useAuth } from "../context/AuthContext";
<<<<<<< HEAD
=======
<<<<<<< HEAD
import { USERS } from "../data/mockData";
import { StatusBadge, PriorityBadge, formatDate } from "./Badges";
import "../styles/Dashboard.css";

const AGENTS = USERS.filter((u) => u.role === "agent");
const CATEGORY_COLORS = ["#4f7cff", "#2ecc71", "#f1c40f", "#e67e22", "#9b59b6", "#1abc9c", "#e74c3c"];

export default function AdminDashboard({ onSelectTicket }) {
  const { tickets } = useTickets();
=======
>>>>>>> 9604213 (sync)
import { StatusBadge, PriorityBadge, formatDate } from "./Badges";
import "../styles/Dashboard.css";

const CATEGORY_COLORS = ["#4f7cff", "#2ecc71", "#f1c40f", "#e67e22", "#9b59b6", "#1abc9c", "#e74c3c"];

export default function AdminDashboard({ onSelectTicket }) {
  const { tickets, ticketsLoading, ticketsError, refreshTickets } = useTickets();
<<<<<<< HEAD
=======
>>>>>>> daddf48 (linked backend)
>>>>>>> 9604213 (sync)
  const { currentUser } = useAuth();

  const open = tickets.filter((t) => t.status === "Open").length;
  const pending = tickets.filter((t) => t.status === "Pending").length;
  const resolved = tickets.filter((t) => t.status === "Resolved").length;
  const closed = tickets.filter((t) => t.status === "Closed").length;
<<<<<<< HEAD
=======
<<<<<<< HEAD

  // agent stats
  const agentStats = AGENTS.map((a) => {
    const assigned = tickets.filter((t) => t.assignedAgentId === a.id);
    const resolvedCount = assigned.filter((t) => t.status === "Resolved" || t.status === "Closed").length;
    return { ...a, total: assigned.length, resolved: resolvedCount };
  }).sort((a, b) => b.total - a.total);

  const maxTotal = Math.max(...agentStats.map((a) => a.total), 1);

  // category breakdown
  const catMap = {};
  tickets.forEach((t) => { catMap[t.category] = (catMap[t.category] || 0) + 1; });
  const catData = Object.entries(catMap).sort((a, b) => b[1] - a[1]);
  const maxCat = Math.max(...catData.map(c => c[1]), 1);

  const recentTickets = [...tickets].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).slice(0, 5);

=======
>>>>>>> 9604213 (sync)
  const catMap = {};
  tickets.forEach((ticket) => { catMap[ticket.category] = (catMap[ticket.category] || 0) + 1; });
  const catData = Object.entries(catMap).sort((a, b) => b[1] - a[1]);
  const maxCat = Math.max(...catData.map(([, count]) => count), 1);
  const recentTickets = [...tickets].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).slice(0, 6);
<<<<<<< HEAD
=======
>>>>>>> daddf48 (linked backend)
>>>>>>> 9604213 (sync)
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div>
      <div className="dashboard-greeting">
        <div className="dashboard-greeting-title">{greeting}, {currentUser.name.split(" ")[0]} 👋</div>
<<<<<<< HEAD
=======
<<<<<<< HEAD
        <div className="dashboard-greeting-sub">Here's your support desk overview for today.</div>
      </div>

      {/* STATS */}
=======
>>>>>>> 9604213 (sync)
        <div className="dashboard-greeting-sub">Admin overview of support requests currently stored in your database.</div>
      </div>

      {ticketsError && (
        <div className="login-error" role="alert" style={{ marginBottom: 16 }}>
          {ticketsError} <button className="btn-secondary" onClick={refreshTickets}>Retry</button>
        </div>
      )}

<<<<<<< HEAD
=======
>>>>>>> daddf48 (linked backend)
>>>>>>> 9604213 (sync)
      <div className="stats-grid">
        {[
          { label: "Open Tickets", value: open, icon: "📬", color: "#4f7cff" },
          { label: "Pending", value: pending, icon: "⏳", color: "#f1c40f" },
          { label: "Resolved", value: resolved, icon: "✅", color: "#2ecc71" },
          { label: "Closed", value: closed, icon: "🔒", color: "#8890aa" },
          { label: "Total Tickets", value: tickets.length, icon: "🎫", color: "#9b59b6" },
<<<<<<< HEAD
=======
<<<<<<< HEAD
        ].map((s) => (
          <div className="stat-card" key={s.label}>
            <div className="stat-card-accent" style={{ background: s.color }} />
            <div className="stat-card-icon">{s.icon}</div>
            <div className="stat-card-value">{s.value}</div>
            <div className="stat-card-label">{s.label}</div>
=======
>>>>>>> 9604213 (sync)
        ].map((stat) => (
          <div className="stat-card" key={stat.label}>
            <div className="stat-card-accent" style={{ background: stat.color }} />
            <div className="stat-card-icon">{stat.icon}</div>
            <div className="stat-card-value">{ticketsLoading ? "…" : stat.value}</div>
            <div className="stat-card-label">{stat.label}</div>
<<<<<<< HEAD
=======
>>>>>>> daddf48 (linked backend)
>>>>>>> 9604213 (sync)
          </div>
        ))}
      </div>

<<<<<<< HEAD
=======
<<<<<<< HEAD
      {/* GRID: Agent Performance + Category Breakdown */}
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="section-title">👤 Agent Performance</div>
          {agentStats.map((a) => (
            <div className="agent-perf-row" key={a.id}>
              <div className="agent-perf-avatar">{a.avatar}</div>
              <div className="agent-perf-info">
                <div className="agent-perf-name">{a.name}</div>
                <div className="agent-perf-bar-wrap">
                  <div className="agent-perf-bar" style={{ width: `${(a.total / maxTotal) * 100}%` }} />
                </div>
              </div>
              <div className="agent-perf-stats">
                <div className="agent-perf-count">{a.total}</div>
                <div className="agent-perf-sublabel">tickets</div>
              </div>
            </div>
          ))}
        </div>

        <div className="dashboard-card">
          <div className="section-title">📂 By Category</div>
          <div className="category-chart">
            {catData.slice(0, 6).map(([cat, count], i) => (
              <div className="category-row" key={cat}>
                <div className="category-dot" style={{ background: CATEGORY_COLORS[i % CATEGORY_COLORS.length] }} />
                <div className="category-label">{cat}</div>
                <div className="category-bar-wrap">
                  <div className="category-bar" style={{ width: `${(count / maxCat) * 100}%`, background: CATEGORY_COLORS[i % CATEGORY_COLORS.length] }} />
                </div>
                <div className="category-count">{count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RECENT TICKETS */}
      <div className="dashboard-card">
        <div className="section-title">🕐 Recent Activity</div>
        {recentTickets.map((t) => (
          <div className="recent-ticket-item" key={t.id} onClick={() => onSelectTicket(t.id)}>
            <div className="recent-ticket-info">
              <div className="recent-ticket-id">{t.id}</div>
              <div className="recent-ticket-title">{t.title}</div>
              <div className="recent-ticket-meta">{t.customerName} · {t.category}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
              <StatusBadge status={t.status} />
              <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{formatDate(t.updatedAt)}</span>
            </div>
          </div>
        ))}
=======
>>>>>>> 9604213 (sync)
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="section-title">📂 Tickets by Category</div>
          {ticketsLoading ? <div className="dashboard-greeting-sub">Loading ticket data…</div> :
            catData.length === 0 ? <div className="dashboard-greeting-sub">No ticket data yet.</div> : (
              <div className="category-chart">
                {catData.slice(0, 7).map(([category, count], index) => (
                  <div className="category-row" key={category}>
                    <div className="category-dot" style={{ background: CATEGORY_COLORS[index % CATEGORY_COLORS.length] }} />
                    <div className="category-label">{category}</div>
                    <div className="category-bar-wrap">
                      <div className="category-bar" style={{ width: `${(count / maxCat) * 100}%`, background: CATEGORY_COLORS[index % CATEGORY_COLORS.length] }} />
                    </div>
                    <div className="category-count">{count}</div>
                  </div>
                ))}
              </div>
            )}
        </div>
        <div className="dashboard-card">
          <div className="section-title">🛠 Admin Actions</div>
          <p className="dashboard-greeting-sub" style={{ marginBottom: 14 }}>Review all tickets submitted by customers.</p>
          <button className="btn-primary" onClick={refreshTickets} disabled={ticketsLoading}>
            {ticketsLoading ? "Refreshing…" : "↻ Refresh ticket data"}
          </button>
          <div className="dashboard-greeting-sub" style={{ marginTop: 12 }}>
            Ticket counts, categories, and recent activity on this page are loaded from MySQL.
          </div>
        </div>
      </div>

      <div className="dashboard-card">
        <div className="section-title">🕐 Recent Tickets</div>
        {ticketsLoading && tickets.length === 0 ? <div className="dashboard-greeting-sub">Loading tickets…</div> :
          recentTickets.length === 0 ? <div className="empty-state">
            <div className="empty-state-icon">🎫</div>
            <div className="empty-state-title">No tickets yet</div>
            <div className="empty-state-text">Tickets submitted by customers will appear here.</div>
          </div> : recentTickets.map((ticket) => (
            <div className="recent-ticket-item" key={ticket.id} onClick={() => onSelectTicket(ticket.id)}>
              <div className="recent-ticket-info">
                <div className="recent-ticket-id">{ticket.id}</div>
                <div className="recent-ticket-title">{ticket.title}</div>
                <div className="recent-ticket-meta">{ticket.customerName} · {ticket.category}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                <StatusBadge status={ticket.status} />
                <PriorityBadge priority={ticket.priority} />
                <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{formatDate(ticket.updatedAt)}</span>
              </div>
            </div>
          ))}
<<<<<<< HEAD
=======
>>>>>>> daddf48 (linked backend)
>>>>>>> 9604213 (sync)
      </div>
    </div>
  );
}
