import React from 'react';
import './index.css'
import UserIcon from '../UserIcon';
import { NoPriority } from '../../utils/assets';
import { Ticket, User } from '../../types/default';
import { getStatusIcon } from '../../utils/assets';
function Card({ ticket, userData, hideStatusIcon, hideProfileIcon }: { ticket: Ticket, userData: User, hideStatusIcon: boolean, hideProfileIcon: boolean }) {
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
        <div className='more-icon-container'>
          <NoPriority />
        </div>
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
