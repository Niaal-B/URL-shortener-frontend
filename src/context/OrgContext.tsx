import { createContext, useContext, useState, ReactNode } from 'react';
import { Organization } from '../types';

interface OrgContextType {
  activeOrg: Organization | null;
  setActiveOrg: (org: Organization) => void;
}

const OrgContext = createContext<OrgContextType | undefined>(undefined);

export function OrgProvider({ children }: { children: ReactNode }) {
  const [activeOrg, setActiveOrg] = useState<Organization | null>(null);

  return (
    <OrgContext.Provider value={{ activeOrg, setActiveOrg }}>
      {children}
    </OrgContext.Provider>
  );
}

export function useOrg() {
  const context = useContext(OrgContext);
  if (!context) throw new Error('useOrg must be used within OrgProvider');
  return context;
}
