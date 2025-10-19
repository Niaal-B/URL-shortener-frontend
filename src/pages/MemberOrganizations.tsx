import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users } from "lucide-react";
import { OrganizationCard } from "@/components/OrganizationCard";

import api from "../api/api"; 

interface Organization {
  id: number;
  name: string;
  slug: string;
  role: "EDITOR" | "VIEWER";
  joined_at: string;
}


const MemberOrganizations = () => {
  const navigate = useNavigate();
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  useEffect(() => {
    api.get("/api/organizations/memberships/")
      .then((res) => {
        const rawOrgs = res.data.organizations || [];
        const formatted = rawOrgs.map((org: any) => ({
          id: org.id,
          name: org.name,
          slug: org.slug,
          role: org.role.toUpperCase(),
          joined_at: new Date(org.joined_at).toLocaleDateString(),
        }));
        setOrganizations(formatted);
      })
      .catch((err) => {
        console.error("Failed to fetch member organizations:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-secondary/20">
          <Users className="h-8 w-8 text-secondary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Member Organizations</h1>
          <p className="text-muted-foreground">Organizations where you're a member</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {organizations.map((org) => (
          <OrganizationCard
            key={org.id}
            name={org.name}
            slug={org.slug}
            role={org.role}
            joinDate={org.joinDate}
            onClick={() => navigate(`/member/org/${org.slug}`)}
          />
        ))}
      </div>

      {organizations.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No memberships yet</h3>
          <p className="text-muted-foreground">You haven't been added to any organizations</p>
        </div>
      )}
    </div>
  );
};

export default MemberOrganizations;
