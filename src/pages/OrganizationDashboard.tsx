import { useParams } from "react-router-dom";
import { Building2, Link as LinkIcon, BarChart3, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const OrganizationDashboard = () => {
  const { slug } = useParams();

  // Mock data - replace with API calls
  const stats = [
    { title: "Total Links", value: "1,284", icon: LinkIcon, color: "text-primary" },
    { title: "Total Clicks", value: "45,678", icon: BarChart3, color: "text-secondary" },
    { title: "Team Members", value: "8", icon: Users, color: "text-accent-foreground" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-primary/10">
          <Building2 className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground capitalize">{slug?.replace(/-/g, " ")}</h1>
          <p className="text-muted-foreground">Organization dashboard</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Short URLs</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            URL management interface coming soon...
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrganizationDashboard;
