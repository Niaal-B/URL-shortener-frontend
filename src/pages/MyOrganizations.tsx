import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Building2 } from "lucide-react";
import { OrganizationCard } from "@/components/OrganizationCard";
import { CreateOrganizationForm } from "@/components/CreateOrganizationForm";
import { fetchAdminOrganizations } from '../api/dashboard';


const MyOrganizations = () => {
  const navigate = useNavigate();
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleRefresh = async () => {
    setLoading(true);
    const admins = await fetchAdminOrganizations();
    setOrganizations(admins);
    setLoading(false);
  };

  useEffect(() => {
    handleRefresh();
  }, []);

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
