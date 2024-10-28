import { create } from "zustand";
import { persist, PersistStorage } from "zustand/middleware";
import { Ticket, User } from "../types/default";

export type GroupingOption = 'status' | 'user' | 'priority';
export type OrderingOption = 'priority' | 'title';

interface Priority {
  grouping: GroupingOption;
  ordering: OrderingOption;
  tickets: Ticket[];
  users: User[];
  setGrouping: (data: GroupingOption) => void;
  setOrdering: (data: OrderingOption) => void;
  setTickets: (data: Ticket[]) => void;
  setUsers: (data: User[]) => void;
}

// Custom storage implementation
const customStorage: PersistStorage<Priority> = {
  getItem: (name) => {
    const item = localStorage.getItem(name);
    return item ? JSON.parse(item) : null;
  },
  setItem: (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name) => {
    localStorage.removeItem(name);
  },
};

// Persist the state in localStorage
const usePriorityStore = create<Priority>()(
  persist(
    (set) => ({
      grouping: 'status',
      ordering: 'priority',
      tickets: [],
      users: [],
      setGrouping: (data) => set(() => ({ grouping: data })),
      setOrdering: (data) => set(() => ({ ordering: data })),
      setTickets: (data) => set(() => ({ tickets: data })),
      setUsers: (data) => set(() => ({ users: data }))
    }),
    {
      name: "priority-store", // Key for localStorage
      storage: customStorage, // Use the custom storage implementation
    }
  )
);

// Export the store hook for use in components
export default usePriorityStore;
