import { ReactNode } from 'react';
import OrgSidebar from '../components/OrgSidebar';
import OrgActionsPanel from '../components/OrgActionsPanel';

export default function SidebarLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <OrgSidebar />
      <OrgActionsPanel />
      <main style={{ flex: 1, padding: '20px' }}>{children}</main>
    </div>
  );
}
