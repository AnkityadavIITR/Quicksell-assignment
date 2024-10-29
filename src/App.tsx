import React,{useEffect,useState} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import usePriorityStore from './store/priority';
import { API_URL} from './utils/constant';
import { User,Ticket } from './types/default';
import { groupTicketsByStatus, groupTicketsByUser, groupTicketsByPriority, sortTickets,groupTicketsByUserId } from './utils/helper';
import { TicketCard } from './components/Card';
import Grid from './components/Grid';
function App() {
  const [loading, setLoading] = useState(true);
  const { setTickets, setUsers,users,grouping,ordering,tickets } = usePriorityStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setTickets(data.tickets);
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
        groupedTickets = groupTicketsByUserId(tickets);
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
  console.log("groupedTickets",groupedTickets)
  
  return (
    <div className="App">
      <Navbar/>
      {
        loading ? <div style={{height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Loading...</div> :
        <Grid gridData={groupedTickets} />
      }
    </div>
  );
}

export default App;
