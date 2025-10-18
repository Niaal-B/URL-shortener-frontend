import { useOrg } from '../context/OrgContext';
import { NavLink } from 'react-router-dom';

export default function OrgActionsPanel() {
  const { activeOrg } = useOrg();

  if (!activeOrg) {
    return (
      <div style={{ width: '200px', padding: '20px', borderRight: '1px solid #ccc' }}>
        <p>Select an organization to view actions.</p>
      </div>
    );
  }

  return (
    <div style={{ width: '200px', padding: '20px', borderRight: '1px solid #ccc' }}>
      <h4>{activeOrg.name}</h4>
      <NavLink to={`/org/${activeOrg.slug}/namespaces`}>Namespaces</NavLink><br />
      <NavLink to={`/org/${activeOrg.slug}/short-urls`}>Short URLs</NavLink><br />
      {activeOrg.role === 'admin' && (
        <>
          <NavLink to={`/org/${activeOrg.slug}/invite`}>Invite Members</NavLink><br />
          <NavLink to={`/org/${activeOrg.slug}/bulk-upload`}>Bulk Upload</NavLink>
        </>
      )}
    </div>
  );
}
