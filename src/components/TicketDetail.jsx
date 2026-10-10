import { useState } from "react";
import { useTickets } from "../context/TicketContext";
import { useAuth } from "../context/AuthContext";
import { STATUSES } from "../data/mockData";
import { StatusBadge, PriorityBadge, formatDate } from "./Badges";
import "../styles/TicketDetail.css";

export default function TicketDetail({ ticketId, onBack }) {
  const { getTicketById, replyToTicket, updateTicketStatus, assignTicket, agents } = useTickets();
  const { currentUser } = useAuth();
  const ticket = getTicketById(ticketId);
  const [reply, setReply] = useState("");
  const [busy, setBusy] = useState(false);
  const [actionError, setActionError] = useState("");
  const [actionMessage, setActionMessage] = useState("");

  if (!ticket) return <div style={{ color: "var(--text-secondary)", padding: 40 }}>Ticket not found.</div>;

  const canManage = currentUser.role === "agent" || currentUser.role === "admin";

  const runAction = async (action, successMessage) => {
    setBusy(true);
    setActionError("");
    setActionMessage("");
    try {
      await action();
      setActionMessage(successMessage);
    } catch (error) {
      setActionError(error.message || "The action could not be completed.");
    } finally {
      setBusy(false);
    }
  };

  const handleReply = () => {
    if (!reply.trim() || busy) return;
    runAction(async () => {
      await replyToTicket(ticket, reply.trim());
      setReply("");
    }, "Reply sent.");
  };

  const handleAssign = (e) => {
    const agentId = e.target.value;
    runAction(() => assignTicket(ticket, agentId), "Assignment updated.");
  };

  const handleStatus = (status) => {
    if (status === ticket.status || busy) return;
    runAction(() => updateTicketStatus(ticket, status), "Ticket status updated.");
  };

  return (
    <div className="ticket-detail-root">
      <button className="ticket-detail-back" onClick={onBack}>← Back to tickets</button>

      {/* HEADER */}
      <div className="ticket-detail-header">
        <div className="ticket-detail-top">
          <div>
            <div className="ticket-detail-id">{ticket.id}</div>
            <div className="ticket-detail-title">{ticket.title}</div>
          </div>
          <div className="ticket-detail-badges">
            <StatusBadge status={ticket.status} />
            <PriorityBadge priority={ticket.priority} />
          </div>
        </div>
        <div className="ticket-meta-grid">
          <div className="ticket-meta-item">
            <div className="ticket-meta-label">Customer</div>
            <div className="ticket-meta-value">{ticket.customerName}</div>
          </div>
          <div className="ticket-meta-item">
            <div className="ticket-meta-label">Category</div>
            <div className="ticket-meta-value">{ticket.category}</div>
          </div>
          <div className="ticket-meta-item">
            <div className="ticket-meta-label">Created</div>
            <div className="ticket-meta-value">{formatDate(ticket.createdAt)}</div>
          </div>
          <div className="ticket-meta-item">
            <div className="ticket-meta-label">Last Updated</div>
            <div className="ticket-meta-value">{formatDate(ticket.updatedAt)}</div>
          </div>
          <div className="ticket-meta-item">
            <div className="ticket-meta-label">Assigned To</div>
            <div className="ticket-meta-value">{ticket.assignedAgentName || "—"}</div>
          </div>
        </div>
      </div>

      {(actionError || actionMessage) && (
        <div role="status" style={{ marginBottom: 12, padding: "10px 14px", borderRadius: 8, color: actionError ? "var(--red, #dc2626)" : "var(--green)", background: "var(--surface)", border: "1px solid var(--border)" }}>
          {actionError || actionMessage}
        </div>
      )}

      {/* BODY */}
      <div className="ticket-detail-body">
        {/* THREAD */}
        <div className="ticket-thread-panel">
          {ticket.thread.map((msg) => (
            <div key={msg.id} className={`thread-message ${msg.role === "agent" ? "agent-msg" : ""}`}>
              <div className="thread-msg-header">
                <div className={`thread-msg-avatar ${msg.role}`}>
                  {msg.authorName.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <div className="thread-msg-author">{msg.authorName}</div>
                </div>
                <span className={`thread-msg-role ${msg.role === "agent" ? "agent-role" : ""}`}>{msg.role}</span>
                <span className="thread-msg-time">{formatDate(msg.timestamp)}</span>
              </div>
              <div className="thread-msg-body">{msg.message}</div>
            </div>
          ))}

          {/* REPLY BOX */}
          {ticket.status !== "Closed" && (
            <div className="reply-box">
              <div className="reply-box-title">💬 Add Reply</div>
              <textarea
                className="reply-textarea"
                placeholder="Type your reply here..."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              />
              <div className="reply-actions">
                <button className="btn-primary" onClick={handleReply} disabled={!reply.trim() || busy}>
                  {busy ? "Sending…" : "Send Reply →"}
                </button>
              </div>
            </div>
          )}
          {ticket.status === "Closed" && (
            <div style={{ textAlign: "center", padding: "20px", color: "var(--text-muted)", fontSize: 13 }}>
              🔒 This ticket is closed.
            </div>
          )}
        </div>

        {/* SIDE PANEL (agents/admin only) */}
        {canManage && (
          <div className="ticket-side-panel">
            {currentUser.role === "admin" && <div className="side-card">
              <div className="side-card-title">Assign Agent</div>
              <select className="assign-select" value={ticket.assignedAgentId || ""} onChange={handleAssign} disabled={busy}>
                <option value="">Unassigned</option>
                {agents.map((a) => (
                  <option key={a.id} value={a.id}>{a.name} ({a.email})</option>
                ))}
              </select>
            </div>}

            <div className="side-card">
              <div className="side-card-title">Update Status</div>
              <div className="status-btn-grid">
                {STATUSES.map((s) => (
                  <button
                    key={s}
                    className={`status-btn active-${ticket.status === s ? s.toLowerCase() : ""}`}
                    onClick={() => handleStatus(s)}
                    disabled={busy}
                    style={ticket.status === s ? {} : {}}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
