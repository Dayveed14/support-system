import { useState } from "react";
import { useTickets } from "../context/TicketContext";
<<<<<<< HEAD
=======
<<<<<<< HEAD
import { useAuth } from "../context/AuthContext";
=======
>>>>>>> daddf48 (linked backend)
>>>>>>> 9604213 (sync)
import { CATEGORIES, PRIORITIES } from "../data/mockData";
import "../styles/Modal.css";

export default function NewTicketModal({ onClose, onCreated }) {
  const { createTicket } = useTickets();
<<<<<<< HEAD
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
=======
<<<<<<< HEAD
  const { currentUser } = useAuth();
=======
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
>>>>>>> daddf48 (linked backend)
>>>>>>> 9604213 (sync)
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: CATEGORIES[0],
    priority: "Medium",
  });

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

<<<<<<< HEAD
=======
<<<<<<< HEAD
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) return;
    const ticket = createTicket(form, currentUser);
    onCreated && onCreated(ticket);
    onClose();
=======
>>>>>>> 9604213 (sync)
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
<<<<<<< HEAD
=======
>>>>>>> daddf48 (linked backend)
>>>>>>> 9604213 (sync)
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-card">
        <div className="modal-title">Submit a Support Ticket</div>
        <div className="modal-subtitle">Describe your issue and our team will get back to you soon.</div>

        <form onSubmit={handleSubmit}>
<<<<<<< HEAD
          {error && <div className="login-error" role="alert">{error}</div>}
=======
<<<<<<< HEAD
=======
          {error && <div className="login-error" role="alert">{error}</div>}
>>>>>>> daddf48 (linked backend)
>>>>>>> 9604213 (sync)
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
<<<<<<< HEAD
            <button type="button" className="btn-secondary" onClick={onClose} disabled={busy}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={busy}>{busy ? "Submitting…" : "🎫 Submit Ticket"}</button>
=======
<<<<<<< HEAD
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">🎫 Submit Ticket</button>
=======
            <button type="button" className="btn-secondary" onClick={onClose} disabled={busy}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={busy}>{busy ? "Submitting…" : "🎫 Submit Ticket"}</button>
>>>>>>> daddf48 (linked backend)
>>>>>>> 9604213 (sync)
          </div>
        </form>
      </div>
    </div>
  );
}
