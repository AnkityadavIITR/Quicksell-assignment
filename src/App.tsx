import React,{useEffect,useState} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { useCallback } from 'react';
import usePriorityStore from './store/priority';
import { API_URL} from './utils/constant';
import { User,Ticket } from './types/default';
import { groupTicketsByStatus, groupTicketsByUser, groupTicketsByPriority, sortTickets } from './utils/helper';
import { TicketCard } from './components/Card';
function App() {
  const [loading, setLoading] = useState(true);
  const { setTickets, setUsers,users,grouping,ordering,tickets } = usePriorityStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        const data = await response.json();
        setTickets(data.tickets);
        // Convert users array to record
        const usersRecord = data.users.reduce((acc: Record<string, User>, user: User) => {
          acc[user.id] = user;
          return acc;
        }, {});
        setUsers(usersRecord);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [setTickets, setUsers]);
  console.log(users); 

  const getGroupedTickets = () => {
    let groupedTickets: Record<string, Ticket[]> = {};

    switch (grouping) {
      case 'status':
        groupedTickets = groupTicketsByStatus(tickets);
        break;
      case 'user':
        groupedTickets = groupTicketsByUser(tickets, users);
        break;
      case 'priority':
        groupedTickets = groupTicketsByPriority(tickets);
        break;
      default:
        groupedTickets = groupTicketsByStatus(tickets); 
    }

    // Sort tickets within each group
    Object.keys(groupedTickets).forEach(key => {
      groupedTickets[key] = sortTickets(groupedTickets[key], ordering);
    });

    return groupedTickets;
  };

  const groupedTickets = getGroupedTickets();
  
  if(loading){
    return <div style={{height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Loading...</div>
  }
  return (
    <div className="App">
      <Navbar/>
      <div className="kanban-board">
        {Object.entries(groupedTickets).map(([groupName, groupTickets]) => (
          <div key={groupName} className="ticket-group">
            <div className="group-header">
              <h2>{groupName}</h2>
              <span className="ticket-count">{groupTickets.length}</span>
            </div>
            <div className="tickets-container">
              {groupTickets.map(ticket => (
                <TicketCard 
                  key={ticket.id} 
                  ticket={ticket} 
                  user={users[ticket.userId]}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
