import React from 'react';
import { Ticket, User } from '../../types/default';
import './index.css';
import { PRIORITY_MAP } from '../../utils/helper';

interface TicketCardProps {
  ticket: Ticket;
  user: User;
}

export const TicketCard: React.FC<TicketCardProps> = ({ ticket, user }) => {
  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <span className="ticket-id">{ticket.id}</span>
        <div className="user-avatar" title={user?.name || 'Unassigned'}>
          {user?.available && <span className="available-dot" />}
          {user?.name?.[0] || '?'}
        </div>
      </div>
      <h3 className="ticket-title">{ticket.title}</h3>
      <div className="ticket-footer">
        <span className={`priority-tag priority-${ticket.priority}`}>
          {PRIORITY_MAP[ticket.priority as keyof typeof PRIORITY_MAP]}
        </span>
        {ticket.tag.map((tag) => (
          <span key={tag} className="feature-tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};