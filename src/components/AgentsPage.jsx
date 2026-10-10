import { useTickets } from "../context/TicketContext";
<<<<<<< HEAD
=======
<<<<<<< HEAD
import { USERS } from "../data/mockData";
import { StatusBadge } from "./Badges";
import "../styles/Dashboard.css";

const AGENTS = USERS.filter((u) => u.role === "agent");

export default function AgentsPage({ onSelectTicket }) {
  const { tickets } = useTickets();
=======
>>>>>>> 9604213 (sync)

import { StatusBadge } from "./Badges";
import "../styles/Dashboard.css";

export default function AgentsPage({ onSelectTicket }) {
  const { tickets, agents } = useTickets();
<<<<<<< HEAD
=======
>>>>>>> daddf48 (linked backend)
>>>>>>> 9604213 (sync)

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div className="dashboard-greeting-title">Support Agents</div>
        <div className="dashboard-greeting-sub" style={{ marginTop: 4 }}>Overview of all support agents and their ticket queues.</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
<<<<<<< HEAD
        {agents.map((agent) => {
=======
<<<<<<< HEAD
        {AGENTS.map((agent) => {
=======
        {agents.map((agent) => {
>>>>>>> daddf48 (linked backend)
>>>>>>> 9604213 (sync)
          const agentTickets = tickets.filter((t) => t.assignedAgentId === agent.id);
          const open = agentTickets.filter((t) => t.status === "Open").length;
          const pending = agentTickets.filter((t) => t.status === "Pending").length;
          const resolved = agentTickets.filter((t) => t.status === "Resolved" || t.status === "Closed").length;
          const recent = [...agentTickets].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).slice(0, 4);

          return (
            <div key={agent.id} className="dashboard-card">
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: "50%",
                  background: "var(--accent-glow)", border: "1px solid var(--accent)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 700, color: "var(--accent)", fontSize: 14
<<<<<<< HEAD
                }}>{agent.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</div>
=======
<<<<<<< HEAD
                }}>{agent.avatar}</div>
=======
                }}>{agent.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</div>
>>>>>>> daddf48 (linked backend)
>>>>>>> 9604213 (sync)
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 700, color: "var(--text-primary)" }}>
                    {agent.name}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{agent.email}</div>
                </div>
                <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
                  {[
                    { label: "Open", val: open, color: "var(--accent)" },
                    { label: "Pending", val: pending, color: "var(--yellow)" },
                    { label: "Resolved", val: resolved, color: "var(--green)" },
                  ].map((s) => (
                    <div key={s.label} style={{ textAlign: "center", padding: "8px 14px", background: "var(--surface-2)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)" }}>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 800, color: s.color }}>{s.val}</div>
                      <div style={{ fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {recent.length > 0 && (
                <>
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", color: "var(--text-muted)", marginBottom: 8 }}>
                    Recent Tickets
                  </div>
                  {recent.map((t) => (
                    <div className="recent-ticket-item" key={t.id} onClick={() => onSelectTicket(t.id)}>
                      <div className="recent-ticket-info">
                        <div className="recent-ticket-id">{t.id}</div>
                        <div className="recent-ticket-title">{t.title}</div>
                        <div className="recent-ticket-meta">{t.customerName}</div>
                      </div>
                      <StatusBadge status={t.status} />
                    </div>
                  ))}
                </>
              )}

              {recent.length === 0 && (
                <div style={{ color: "var(--text-muted)", fontSize: 13, paddingTop: 4 }}>No tickets assigned.</div>
              )}
            </div>
          );
        })}
<<<<<<< HEAD
        {agents.length === 0 && <div className="dashboard-card" style={{ color: "var(--text-muted)" }}>No support agents have been registered yet. Promote a user to the agent role in MySQL to make them available here.</div>}
=======
<<<<<<< HEAD
=======
        {agents.length === 0 && <div className="dashboard-card" style={{ color: "var(--text-muted)" }}>No support agents have been registered yet. Promote a user to the agent role in MySQL to make them available here.</div>}
>>>>>>> daddf48 (linked backend)
>>>>>>> 9604213 (sync)
      </div>
    </div>
  );
}
