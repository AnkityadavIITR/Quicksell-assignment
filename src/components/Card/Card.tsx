import React from 'react';
import './index.css'
import UserIcon from '../UserIcon';
import { NoPriority } from '../../utils/assets';
import { Ticket, User } from '../../types/default';
import { getStatusIcon,getPriorityIcon } from '../../utils/assets';
import usePriorityStore from '../../store/priority';
export const ticketPriorities = [
    "No priority", 
    "Low",         
    "Medium",      
    "High",        
    "Urgent"     
  ];
function Card({ ticket, userData, hideStatusIcon, hideProfileIcon }: { ticket: Ticket, userData: User, hideStatusIcon: boolean, hideProfileIcon: boolean }) {
  const {grouping, ordering} = usePriorityStore();

    return (
    <div className='card'>
      <div className='top-container'>
        <div className='ticket-id'>{ticket.id}</div>
        {hideProfileIcon ? null : <UserIcon name={userData?.name} available={userData?.available} />}
      </div>
      <div className='middle-container'>
        {hideStatusIcon ? null : getStatusIcon(ticket.status)}
        <div className='title'>{ticket.title}</div>
      </div>
      <div className='bottom-container'>
        {
            grouping=='user' && <div className='more-icon-container'>
              {getPriorityIcon(ticketPriorities[ticket.priority])}          
            </div>
        }
        {ticket.tag.map((t: string) => (
          <div key={t} className='tag-container'>
            <div className='tag-icon'></div>
            <div className='tag-text'>{t}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Card;
