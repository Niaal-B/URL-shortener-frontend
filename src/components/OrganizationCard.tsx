import RoleBadge from './RoleBadge'
import type { Organization } from '../types';

interface Props {
  org: Organization;
}

export default function OrganizationCard({ org }: Props) {
  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '10px',
      marginBottom: '10px',
      borderRadius: '5px'
    }}>
      <h4>{org.name}</h4>
      <p>Slug: {org.slug}</p>
      <p>Joined: {new Date(org.joined_at).toLocaleDateString()}</p>
      <RoleBadge role={org.role} />
    </div>
  );
}
