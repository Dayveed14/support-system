import { useState } from "react";
import { useTickets } from "../context/TicketContext";
import { CATEGORIES, PRIORITIES } from "../data/mockData";
import "../styles/Modal.css";

export default function NewTicketModal({ onClose, onCreated }) {
  const { createTicket } = useTickets();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: CATEGORIES[0],
    priority: "Medium",
  });

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const ticket = await createTicket(form);
      onCreated && onCreated(ticket);
      onClose();
    } catch (err) {
      setError(err.message || "Unable to create ticket. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-card">
        <div className="modal-title">Submit a Support Ticket</div>
        <div className="modal-subtitle">Describe your issue and our team will get back to you soon.</div>

        <form onSubmit={handleSubmit}>
          {error && <div className="login-error" role="alert">{error}</div>}
          <div className="modal-field">
            <label className="modal-label">Issue Title</label>
            <input
              className="modal-input"
              placeholder="Brief summary of your issue"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              required
            />
          </div>

          <div className="modal-row">
            <div className="modal-field">
              <label className="modal-label">Category</label>
              <select className="modal-select" value={form.category} onChange={(e) => set("category", e.target.value)}>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="modal-field">
              <label className="modal-label">Priority</label>
              <select className="modal-select" value={form.priority} onChange={(e) => set("priority", e.target.value)}>
                {PRIORITIES.map((p) => <option key={p}>{p}</option>)}
              </select>
            </div>
          </div>

          <div className="modal-field">
            <label className="modal-label">Description</label>
            <textarea
              className="modal-textarea"
              placeholder="Describe your issue in detail. Include any error messages, steps you've already tried, etc."
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              required
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose} disabled={busy}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={busy}>{busy ? "Submitting…" : "🎫 Submit Ticket"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
