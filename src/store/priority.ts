import { create } from "zustand";
import { persist, PersistStorage } from "zustand/middleware";
import { Ticket, User } from "../types/default";

export type GroupingOption = 'status' | 'user' | 'priority';
export type OrderingOption = 'priority' | 'title';

interface priority {
  tickets: Ticket[];
  users: Record<string, User>;
  grouping: GroupingOption;
  ordering: OrderingOption;
  setTickets: (tickets: Ticket[]) => void;
  setUsers: (users: Record<string, User>) => void;
  setGrouping: (grouping: GroupingOption) => void;
  setOrdering: (ordering: OrderingOption) => void;
}
// Custom storage implementation
const customStorage: PersistStorage<priority> = {
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
const usePriorityStore = create<priority>()(
  persist(
    (set) => ({
      grouping: 'status',
      ordering: 'priority',
      tickets: [],
      users: {},
      setGrouping: (data) => set(() => ({ grouping: data })),
      setOrdering: (data) => set(() => ({ ordering: data })),
      setTickets: (data) => set(() => ({ tickets: data })),
      setUsers: (users) => set({ users }),
    }),
    {
      name: "priority-store", // Key for localStorage
      storage: customStorage, // Use the custom storage implementation
    }
  )
);

export default usePriorityStore;
