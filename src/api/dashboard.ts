import api from './api';
import type { DashboardResponse, Organization } from '@/types';

export async function fetchAdminOrganizations(): Promise<Organization[]> {
  try {
    const response = await api.get<DashboardResponse>('/api/dashboard/');
    const allOrgs = response.data.organizations || [];
    return allOrgs.filter((org) => org.role === 'admin');
  } catch (error) {
    console.error('Error fetching dashboard:', error);
    return [];
  }
}
