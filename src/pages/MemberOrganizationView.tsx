import { useParams } from "react-router-dom";
import { Building2, Link as LinkIcon, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const MemberOrganizationView = () => {
  const { slug } = useParams();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-secondary/20">
            <Building2 className="h-8 w-8 text-secondary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground capitalize">{slug?.replace(/-/g, " ")}</h1>
            <p className="text-muted-foreground">Member view (read-only)</p>
          </div>
        </div>
        <Badge variant="secondary" className="gap-2">
          <Eye className="h-4 w-4" />
          VIEWER
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LinkIcon className="h-5 w-5" />
            Organization Short URLs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            View-only access to organization URLs...
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MemberOrganizationView;
