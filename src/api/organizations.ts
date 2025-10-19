import api from "../api/api";

export async function createOrganization(name: string) {
  const response = await api.post("/api/organizations/create/", { name });
  return response.data;
}

export async function getShortUrls(orgSlug: string): Promise<any[]> {
    const res = await api.get("/api/urls/list/", {
      params: { organization_slug: orgSlug },
    });
    return res.data;
  }


export async function deleteShortUrl(id: number): Promise<void> {
  await api.delete(`/api/urls/delete/${id}/`);
}


export const getMyInvitations = async () => {
    const response = await api.get("/api/invitations/my/");
    return response.data;
  };


  export const acceptInvitation = async (token: string) => {
    const response = await api.post("/api/invitations/accept/", { token });
    return response.data;
  };

  export const sendInvitation = async (payload: {
    email: string;
    role: string;
    organization: string; 
  }) => {
    const response = await api.post("/api/invitations/send/", payload);
    return response.data;
  };