interface Props {
    role: 'admin' | 'editor' | 'viewer';
  }
  
  export default function RoleBadge({ role }: Props) {
    const colors: Record<Props['role'], string> = {
      admin: '#e74c3c',
      editor: '#3498db',
      viewer: '#95a5a6'
    };
  
    return (
      <span style={{
        backgroundColor: colors[role],
        color: 'white',
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '0.8rem'
      }}>
        {role.toUpperCase()}
      </span>
    );
  }
  