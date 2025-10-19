import { useState } from "react";
import { sendInvitation } from "@/api/invitations";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface SendInvitationFormProps {
  organizationSlug: string;
}

const SendInvitationForm: React.FC<SendInvitationFormProps> = ({ organizationSlug }) => {
  const { toast } = useToast();
  const [email, setEmail] = useState<string>("");
  const [role, setRole] = useState<"admin" | "editor" | "viewer">("viewer");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!email) return;

    setLoading(true);
    try {
      await sendInvitation({ email, role, organization: organizationSlug });
      toast({
        title: "Invitation Sent",
        description: `An invitation was sent to ${email} as ${role}`,
      });
      setEmail("");
      setRole("viewer");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send invitation",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Input
        type="email"
        placeholder="Invitee email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
      />
      <Select value={role} onValueChange={(value) => setRole(value as "admin" | "editor" | "viewer")}>
        <SelectTrigger>
          <SelectValue placeholder="Select a role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="editor">Editor</SelectItem>
          <SelectItem value="viewer">Viewer</SelectItem>
        </SelectContent>
      </Select>
      <Button onClick={handleSubmit} disabled={loading || !email}>
        {loading ? "Sending..." : "Send Invitation"}
      </Button>
    </div>
  );
};

export default SendInvitationForm;