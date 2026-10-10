<<<<<<< HEAD
=======
<<<<<<< HEAD
import { createContext, useContext, useState } from "react";
import { INITIAL_TICKETS } from "../data/mockData";

const TicketContext = createContext(null);

export function TicketProvider({ children }) {
  const [tickets, setTickets] = useState(INITIAL_TICKETS);

  const createTicket = (data, user) => {
    const newTicket = {
      id: `TKT-${String(tickets.length + 1).padStart(3, "0")}`,
      ...data,
      status: "Open",
      customerId: user.id,
      customerName: user.name,
      assignedAgentId: null,
      assignedAgentName: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      thread: [
        {
          id: 1,
          authorId: user.id,
          authorName: user.name,
          role: user.role,
          message: data.description,
          timestamp: new Date().toISOString(),
        },
      ],
    };
    setTickets((prev) => [newTicket, ...prev]);
    return newTicket;
  };

  const replyToTicket = (ticketId, message, user) => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id !== ticketId) return t;
        const newReply = {
          id: t.thread.length + 1,
          authorId: user.id,
          authorName: user.name,
          role: user.role,
          message,
          timestamp: new Date().toISOString(),
        };
        return { ...t, thread: [...t.thread, newReply], updatedAt: new Date().toISOString() };
      })
    );
  };

  const updateTicketStatus = (ticketId, status) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId ? { ...t, status, updatedAt: new Date().toISOString() } : t
      )
    );
  };

  const assignTicket = (ticketId, agent) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? {
              ...t,
              assignedAgentId: agent ? agent.id : null,
              assignedAgentName: agent ? agent.name : null,
              updatedAt: new Date().toISOString(),
            }
          : t
      )
    );
  };

  const getTicketById = (id) => tickets.find((t) => t.id === id);

  return (
    <TicketContext.Provider
      value={{ tickets, createTicket, replyToTicket, updateTicketStatus, assignTicket, getTicketById }}
    >
=======
>>>>>>> 9604213 (sync)
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const TicketContext = createContext(null);
const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:4000/api").replace(/\/$/, "");

async function ticketRequest(path, options = {}) {
  const token = localStorage.getItem("supportdesk_token");
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.message || "Could not load tickets.");
  return result.data;
}

export function TicketProvider({ children }) {
  const { currentUser } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [ticketsLoading, setTicketsLoading] = useState(false);
  const [ticketsError, setTicketsError] = useState("");
  const [agents, setAgents] = useState([]);

  const refreshTickets = useCallback(async () => {
    if (!currentUser) {
      setTickets([]);
      return;
    }
    setTicketsLoading(true);
    setTicketsError("");
    try {
      const data = await ticketRequest("/tickets");
      setTickets(data.tickets || []);
      if (["admin", "agent"].includes(currentUser.role)) {
        const agentData = await ticketRequest("/tickets/agents");
        setAgents(agentData.agents || []);
      } else {
        setAgents([]);
      }
    } catch (error) {
      setTicketsError(error.message);
      setTickets([]);
    } finally {
      setTicketsLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    refreshTickets();
  }, [refreshTickets]);

  const createTicket = async (data) => {
    const result = await ticketRequest("/tickets", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const ticket = result.ticket;
    setTickets((previous) => [ticket, ...previous.filter((item) => item.id !== ticket.id)]);
    return ticket;
  };

  const replyToTicket = async (ticket, message) => {
    await ticketRequest(`/tickets/${ticket.dbId}/replies`, {
      method: "POST",
      body: JSON.stringify({ message }),
    });
    await refreshTickets();
  };

  const updateTicketStatus = async (ticket, status) => {
    await ticketRequest(`/tickets/${ticket.dbId}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    await refreshTickets();
  };

  const assignTicket = async (ticket, agentId) => {
    await ticketRequest(`/tickets/${ticket.dbId}/assignment`, {
      method: "PATCH",
      body: JSON.stringify({ agentId: agentId || null }),
    });
    await refreshTickets();
  };

  const getTicketById = (id) => tickets.find((ticket) => ticket.id === id);

  return (
    <TicketContext.Provider value={{
      tickets, ticketsLoading, ticketsError, refreshTickets, createTicket,
      replyToTicket, updateTicketStatus, assignTicket, getTicketById, agents,
    }}>
<<<<<<< HEAD
=======
>>>>>>> daddf48 (linked backend)
>>>>>>> 9604213 (sync)
      {children}
    </TicketContext.Provider>
  );
}

export const useTickets = () => useContext(TicketContext);
