import { useEffect, useState } from 'react';
import api from '../api/api';
import type { Organization } from '../types';
import { useOrg } from '../context/OrgContext';

export default function OrgSidebar() {
  const [orgs, setOrgs] = useState<Organization[]>([]);
  const { setActiveOrg } = useOrg();

  useEffect(() => {
    api.get('/api/dashboard/')
      .then(res => setOrgs(res.data.organizations))
      .catch(err => console.error(err));
  }, []);

  const adminOrgs = orgs.filter(o => o.role === 'admin');
  const memberOrgs = orgs.filter(o => o.role !== 'admin');

  return (
    <div style={{ width: '250px', padding: '20px', borderRight: '1px solid #ccc' }}>
      <h3>My Organizations</h3>
      {adminOrgs.map(org => (
        <button
          key={org.id}
          onClick={() => setActiveOrg(org)}
          style={{ display: 'block', marginBottom: '8px' }}
        >
          {org.name}
        </button>
      ))}

      <h3>Other Organizations</h3>
      {memberOrgs.map(org => (
        <button
          key={org.id}
          onClick={() => setActiveOrg(org)}
          style={{ display: 'block', marginBottom: '8px' }}
        >
          {org.name}
        </button>
      ))}
    </div>
  );
}
