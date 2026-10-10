<<<<<<< HEAD
import { useEffect, useState } from "react";
=======
<<<<<<< HEAD
import { useState } from "react";
=======
import { useEffect, useState } from "react";
>>>>>>> daddf48 (linked backend)
>>>>>>> 9604213 (sync)
import { useAuth } from "./context/AuthContext";
import { useTickets } from "./context/TicketContext";

import Login from "./components/Login";
import Layout from "./components/Layout";
import AdminDashboard from "./components/AdminDashboard";
import AgentDashboard from "./components/AgentDashboard";
import CustomerDashboard from "./components/CustomerDashboard";
import TicketList from "./components/TicketList";
import TicketDetail from "./components/TicketDetail";
import NewTicketModal from "./components/NewTicketModal";
import AgentsPage from "./components/AgentsPage";

function AppInner() {
<<<<<<< HEAD
  const { currentUser, authLoading } = useAuth();
=======
<<<<<<< HEAD
  const { currentUser } = useAuth();
=======
  const { currentUser, authLoading } = useAuth();
>>>>>>> daddf48 (linked backend)
>>>>>>> 9604213 (sync)
  const { tickets } = useTickets();
  const [page, setPage] = useState("dashboard");
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [showNewTicket, setShowNewTicket] = useState(false);

<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> 9604213 (sync)
  useEffect(() => {
    if (currentUser) {
      setPage("dashboard");
      setSelectedTicketId(null);
      setShowNewTicket(false);
    }
  }, [currentUser?.id, currentUser?.role]);

  if (authLoading) return <div className="auth-loading">Loading SupportDesk…</div>;
<<<<<<< HEAD
=======
>>>>>>> daddf48 (linked backend)
>>>>>>> 9604213 (sync)
  if (!currentUser) return <Login />;

  const navigate = (p) => {
    setSelectedTicketId(null);
    if (p === "new-ticket") {
      setShowNewTicket(true);
      setPage("my-tickets");
    } else {
      setPage(p);
    }
  };

  const selectTicket = (id) => setSelectedTicketId(id);
  const goBack = () => setSelectedTicketId(null);

  const myTickets = tickets.filter((t) => t.customerId === currentUser.id);
  const myAssigned = tickets.filter((t) => t.assignedAgentId === currentUser.id);

  const getTitle = () => {
    if (selectedTicketId) return "Ticket Details";
    if (page === "dashboard") return currentUser.role === "admin" ? "Admin Dashboard" : currentUser.role === "agent" ? "Agent Dashboard" : "My Dashboard";
    if (page === "my-tickets") return "My Tickets";
    if (page === "all-tickets") return "All Tickets";
    if (page === "my-assigned") return "My Assigned Tickets";
    if (page === "agents") return "Agents";
    return "SupportDesk";
  };

  const renderContent = () => {
    if (selectedTicketId) {
      return <TicketDetail ticketId={selectedTicketId} onBack={goBack} />;
    }
    if (page === "dashboard") {
      if (currentUser.role === "admin") return <AdminDashboard onSelectTicket={selectTicket} />;
      if (currentUser.role === "agent") return <AgentDashboard onSelectTicket={selectTicket} />;
      return <CustomerDashboard onSelectTicket={selectTicket} onNewTicket={() => setShowNewTicket(true)} />;
    }
    if (page === "my-tickets") return (
      <TicketList tickets={myTickets} onSelect={selectTicket} title="My Tickets"
        subtitle={`${myTickets.length} total tickets`}
        headerAction={<button className="btn-primary" onClick={() => setShowNewTicket(true)}>+ New Ticket</button>}
      />
    );
    if (page === "all-tickets") return (
      <TicketList tickets={tickets} onSelect={selectTicket} title="All Tickets"
        subtitle={`${tickets.length} total tickets`}
      />
    );
    if (page === "my-assigned") return (
      <TicketList tickets={myAssigned} onSelect={selectTicket} title="My Assigned Tickets"
        subtitle={`${myAssigned.length} tickets assigned to you`}
      />
    );
    if (page === "agents") return <AgentsPage onSelectTicket={selectTicket} />;
    return null;
  };

  return (
    <>
      <Layout activePage={selectedTicketId ? null : page} onNavigate={navigate} topbarTitle={getTitle()}>
        {renderContent()}
      </Layout>
      {showNewTicket && (
        <NewTicketModal
          onClose={() => setShowNewTicket(false)}
          onCreated={(ticket) => { setPage("my-tickets"); selectTicket(ticket.id); }}
        />
      )}
    </>
  );
}

export default function App() {
  return <AppInner />;
}
