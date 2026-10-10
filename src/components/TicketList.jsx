import { useState } from "react";
import { StatusBadge, PriorityBadge, formatDate } from "./Badges";
import "../styles/TicketList.css";

export default function TicketList({ tickets, onSelect, title, subtitle, headerAction }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const filtered = tickets.filter((t) => {
    const matchSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.customerName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || t.status === statusFilter;
    const matchPriority = priorityFilter === "All" || t.priority === priorityFilter;
    return matchSearch && matchStatus && matchPriority;
  });

  return (
    <div>
      <div className="ticket-list-header">
        <div>
          <div className="ticket-list-title">{title}</div>
          {subtitle && <div className="ticket-list-subtitle">{subtitle}</div>}
        </div>
        {headerAction}
      </div>

      <div className="ticket-filters">
        <input
          className="filter-search"
          placeholder="🔍  Search tickets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option>All</option>
          <option>Open</option>
          <option>Pending</option>
          <option>Resolved</option>
          <option>Closed</option>
        </select>
        <select className="filter-select" value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
          <option>All</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Critical</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🎫</div>
          <div className="empty-state-title">No tickets found</div>
          <div className="empty-state-text">Try adjusting your filters or create a new ticket.</div>
        </div>
      ) : (
        <table className="ticket-table">
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Assigned To</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((ticket) => (
              <tr key={ticket.id} onClick={() => onSelect(ticket.id)}>
                <td className="ticket-id-cell">{ticket.id}</td>
                <td className="ticket-title-cell"><span>{ticket.title}</span></td>
                <td className="ticket-category-cell">{ticket.category}</td>
                <td><StatusBadge status={ticket.status} /></td>
                <td><PriorityBadge priority={ticket.priority} /></td>
                <td>
                  <div className="ticket-agent-cell">
                    {ticket.assignedAgentName ? (
                      <>
                        <div className="agent-mini-avatar">
                          {ticket.assignedAgentName.split(" ").map(n => n[0]).join("")}
                        </div>
                        <span style={{ fontSize: 12 }}>{ticket.assignedAgentName}</span>
                      </>
                    ) : (
                      <span className="unassigned-text">Unassigned</span>
                    )}
                  </div>
                </td>
                <td className="ticket-date-cell">{formatDate(ticket.updatedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
