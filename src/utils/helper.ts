import { Ticket,User } from '../types/default';
export const PRIORITY_MAP = {
  4: 'Urgent',
  3: 'High',
  2: 'Medium',
  1: 'Low',
  0: 'No priority',
};

export const groupTicketsByStatus = (tickets: Ticket[]) => {
  const groups: Record<string, Ticket[]> = {
    "Backlog": [],
    "Todo": [],
    "In progress": [],
    "Done": [],
    "Canceled": [],
  };

  tickets.forEach(ticket => {
    if (groups[ticket.status]) {
      groups[ticket.status].push(ticket);
    }
  });

  return groups;
};


export const groupTicketsByUser = (tickets: Ticket[], users: Record<string, User>) => {
  const groups: Record<string, Ticket[]> = {};
  tickets.forEach(ticket => {
    const userName = users[ticket.userId].name;
    if (!groups[userName]) {
      groups[userName] = [];
    }
    groups[userName].push(ticket);
  });
  return groups;
};
export const groupTicketsByUserId = (tickets: Ticket[]) => {
  const groups: Record<string, Ticket[]> = tickets.reduce((result: Record<string, Ticket[]>, ticket: Ticket) => {
      if (!result[ticket.userId]) {
          result[ticket.userId] = [];
      }
      result[ticket.userId].push(ticket);
      return result;
  }, {});

  return groups;
};

export const groupTicketsByPriority = (tickets: Ticket[]) => {
  const groups: Record<string, Ticket[]> = {};
  Object.entries(PRIORITY_MAP).forEach(([priority, label]) => {
    groups[label] = tickets.filter(t => t.priority === Number(priority));
  });
  return groups;
};

export const sortTickets = (tickets: Ticket[], ordering: 'priority' | 'title') => {
  return [...tickets].sort((a, b) => {
    if (ordering === 'priority') {
      return b.priority - a.priority;
    }
    return a.title.localeCompare(b.title);
  });
};