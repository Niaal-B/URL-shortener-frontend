import { Building2, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface OrganizationCardProps {
  name: string;
  slug: string;
  role: "ADMIN" | "EDITOR" | "VIEWER";
  joinDate: string;
  onClick: () => void;
}

export const OrganizationCard = ({ name, slug, role, joinDate, onClick }: OrganizationCardProps) => {
  const roleVariant = role === "ADMIN" ? "default" : role === "EDITOR" ? "secondary" : "outline";
  
  return (
    <Card 
      className="cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] duration-200 border-border bg-card"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{name}</CardTitle>
              <CardDescription className="text-sm">/{slug}</CardDescription>
            </div>
          </div>
          <Badge variant={roleVariant}>{role}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Joined {joinDate}</span>
        </div>
      </CardContent>
    </Card>
  );
};
