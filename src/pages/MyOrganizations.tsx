import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2 } from "lucide-react";
import { OrganizationCard } from "@/components/OrganizationCard";
import { CreateOrganizationForm } from "@/components/CreateOrganizationForm";

// Mock data - replace with API calls
const mockOrganizations = [
  {
    id: "1",
    name: "Tech Startup Inc",
    slug: "tech-startup",
    role: "ADMIN" as const,
    joinDate: "Jan 15, 2024",
  },
  {
    id: "2",
    name: "Marketing Agency",
    slug: "marketing-agency",
    role: "ADMIN" as const,
    joinDate: "Feb 20, 2024",
  },
];

const MyOrganizations = () => {
  const navigate = useNavigate();
  const [organizations, setOrganizations] = useState(mockOrganizations);

  const handleRefresh = () => {
    // TODO: Fetch organizations from API
    console.log("Refreshing organizations...");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-primary/10">
          <Building2 className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Organizations</h1>
          <p className="text-muted-foreground">Organizations where you're an admin</p>
        </div>
      </div>

      <CreateOrganizationForm onSuccess={handleRefresh} />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {organizations.map((org) => (
          <OrganizationCard
            key={org.id}
            name={org.name}
            slug={org.slug}
            role={org.role}
            joinDate={org.joinDate}
            onClick={() => navigate(`/dashboard/org/${org.slug}`)}
          />
        ))}
      </div>

      {organizations.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No organizations yet</h3>
          <p className="text-muted-foreground">Create your first organization to get started</p>
        </div>
      )}
    </div>
  );
};

export default MyOrganizations;
