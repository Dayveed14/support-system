import "../styles/TicketList.css";

export function StatusBadge({ status }) {
  const map = { Open: "open", Pending: "pending", Resolved: "resolved", Closed: "closed" };
  return <span className={`badge badge-${map[status] || "open"}`}>{status}</span>;
}

export function PriorityBadge({ priority }) {
  const map = { Low: "low", Medium: "medium", High: "high", Critical: "critical" };
  return <span className={`priority-badge priority-${map[priority] || "low"}`}>{priority}</span>;
}

export function formatDate(iso) {
  const d = new Date(iso);
  const now = new Date();
  const diff = now - d;
  if (diff < 60000) return "just now";
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  if (diff < 86400000 * 7) return `${Math.floor(diff / 86400000)}d ago`;
  return d.toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" });
}
