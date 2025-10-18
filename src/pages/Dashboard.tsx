import { useEffect, useState } from 'react';
import api from '../api/api';
import OrganizationCard from '../components/OrganizationCard';
import type { DashboardResponse } from '../types';
import SidebarLayout from '../layout/SidebarLayout';

export default function DashboardPage() {
  const [userData, setUserData] = useState<DashboardResponse | null>(null);

  useEffect(() => {
    api.get<DashboardResponse>('/api/dashboard/')
      .then(res => setUserData(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!userData) return <p>Loading...</p>;

  return (
    <SidebarLayout>
<div style={{ padding: '20px' }}>
      <h2>{userData.message}</h2>
      <p>Email: {userData.email}</p>

      <h3>Your Organizations</h3>
      {userData.organizations.length === 0 ? (
        <p>You’re not part of any organizations yet.</p>
      ) : (
        userData.organizations.map(org => (
          <OrganizationCard key={org.id} org={org} />
        ))
      )}
    </div>
        
    </SidebarLayout>
    
  );
}
