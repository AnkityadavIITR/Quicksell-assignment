import React, { useMemo } from 'react';
import "./index.css"
import { NoPriority,AddSvg } from '../../utils/assets';
import { Ticket, User } from '../../types/default';
import { getPriorityIcon, getStatusIcon } from '../../utils/assets';
import UserIcon from '../UserIcon';
import usePriorityStore from '../../store/priority';
import Card from '../Card/Card';



function Column({ tickets, groupBy}: { tickets: Ticket[], groupBy: string}) {
  const {grouping,users} = usePriorityStore();

    const title = useMemo(() => {
        if (grouping === "status")
            return groupBy;
        if (grouping === "priority")
            return groupBy;
        if (grouping === "user")
            return users[groupBy].name;
    }, [grouping, groupBy]);

    const icon = useMemo(() => {
        if (grouping === "status")
            return getStatusIcon(groupBy);
        if (grouping === "priority")
            return getPriorityIcon(groupBy);
        if (grouping === "user")
            return <UserIcon name={users[groupBy].name} available={users[groupBy].available} />
    }, [grouping, groupBy])


    return (
        <div className='column'>
            <div className='column-header'>
                <div className='column-header-left-container'>
                    {icon}
                    <div className='column-title'>
                        {title}
                        <span className='count'>{tickets.length}</span>
                    </div>
                </div>
                <div className='column-header-right-container'>
                    <AddSvg />
                    <NoPriority />
                </div>
            </div>
            <div className='cards-container'>
                {tickets.map((ticket: Ticket) => <Card key={ticket.id} ticket={ticket} userData={users[ticket.userId]} hideStatusIcon={grouping === "status"} hideProfileIcon={grouping === "user"} />)}
            </div>
        </div>
    );
}

export default Column;
