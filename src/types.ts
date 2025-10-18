export interface Organization {
    id: number;
    name: string;
    slug: string;
    role: 'admin' | 'editor' | 'viewer';
    joined_at: string;
  }
  
  export interface DashboardResponse {
    message: string;
    email: string;
    organizations: Organization[];
  }
  