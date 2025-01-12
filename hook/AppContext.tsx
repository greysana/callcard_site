"use client";
import { IBusinessDetails, ITemplate, IUser } from "@/types/types";
import { createContext, useContext, useState, ReactNode, FC } from "react";
import { Dispatch, SetStateAction } from "react";

export interface AppContextProps {
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
  templates: ITemplate[] | null;
  setTemplates: Dispatch<SetStateAction<ITemplate[] | null>>;
  selectedDetails: IBusinessDetails | null;
  setselectedDetails: Dispatch<SetStateAction<IBusinessDetails | null>>;
}
const AppContext = createContext<AppContextProps | undefined>(undefined);
interface AppProviderProps {
  children: ReactNode;
}

// Define the AppProvider component
const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [templates, setTemplates] = useState<ITemplate[] | null>(null);
  const [selectedDetails, setselectedDetails] =
    useState<IBusinessDetails | null>(null);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        templates,
        setTemplates,
        selectedDetails,
        setselectedDetails,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export { AppProvider, useAppContext };
