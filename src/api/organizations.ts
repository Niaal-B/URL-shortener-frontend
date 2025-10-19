import api from "../api/api";

export async function createOrganization(name: string) {
  const response = await api.post("/api/organizations/create/", { name });
  return response.data;
}
