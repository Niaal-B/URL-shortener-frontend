import { useState, useEffect } from "react";
import { Mail, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { getMyInvitations,acceptInvitation } from "@/api/organizations";

interface Invitation {
  id: number;
  token: string;
  organization_name: string;
  role: string;
  email: string;
  status: string;
  created_at: string;
}

const PendingInvitations = () => {
  const { toast } = useToast();
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [acceptingId, setAcceptingId] = useState<number | null>(null);

  const fetchInvitations = async () => {
    setIsLoading(true);
    try {
      const data = await getMyInvitations();
      setInvitations(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch invitations",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccept = async (token: string, id: number) => {
    setAcceptingId(id);
    try {
      await acceptInvitation(token);
      toast({
        title: "Success",
        description: "Invitation accepted! You've joined the organization.",
      });
      fetchInvitations();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to accept invitation",
        variant: "destructive",
      });
    } finally {
      setAcceptingId(null);
    }
  };

  useEffect(() => {
    fetchInvitations();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-accent">
          <Mail className="h-8 w-8 text-accent-foreground" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Pending Invitations</h1>
          <p className="text-muted-foreground">Review and accept your organization invitations</p>
        </div>
      </div>

      {invitations.length === 0 && !isLoading && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            You don't have any pending invitations at the moment.
          </AlertDescription>
        </Alert>
      )}

      {isLoading ? (
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-muted rounded w-1/3"></div>
                <div className="h-4 bg-muted rounded w-1/2 mt-2"></div>
              </CardHeader>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4">
          {invitations.map((invitation) => (
            <Card key={invitation.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{invitation.organization_name}</CardTitle>
                    <CardDescription className="mt-2">
                      Invited as <Badge variant="secondary">{invitation.role}</Badge>
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleAccept(invitation.token, invitation.id)}
                      disabled={acceptingId === invitation.id}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      {acceptingId === invitation.id ? "Accepting..." : "Accept"}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  <p>Email: {invitation.email}</p>
                  <p className="mt-1">
                    Received: {new Date(invitation.created_at).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingInvitations;
