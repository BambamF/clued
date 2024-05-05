import { createContext, Dispatch, SetStateAction } from 'react';

type UsersContextType = {
  users: string[];
  setUsers: Dispatch<SetStateAction<string[]>>;
};

export const UsersContext = createContext<UsersContextType>({
  users: [],
  setUsers: () => {},
});