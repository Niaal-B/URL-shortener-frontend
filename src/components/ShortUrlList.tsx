import { useState, useEffect } from "react";
import { Trash2, Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { deleteShortUrl, getShortUrls } from "@/api/organizations";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ShortUrl {
  id: number;
  original_url: string;
  slug: string;
  clicks: number;
  created_at: string;
}

interface ShortUrlListProps {
  organizationSlug: string;
  refreshTrigger?: number;
}

export const ShortUrlList = ({ organizationSlug, refreshTrigger }: ShortUrlListProps) => {
  const [urls, setUrls] = useState<ShortUrl[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const { toast } = useToast();

  const fetchUrls = async () => {
    try {
      setLoading(true);
      const data = await getShortUrls(organizationSlug);
      setUrls(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load short URLs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, [organizationSlug, refreshTrigger]);

  const handleDelete = async (id: number) => {
    try {
      await deleteShortUrl(id);
      toast({
        title: "Success",
        description: "Short URL deleted successfully",
      });
      fetchUrls();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete URL",
        variant: "destructive",
      });
    } finally {
      setDeleteId(null);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Short URL copied to clipboard",
    });
  };

  if (loading) {
    return <p className="text-muted-foreground text-center py-8">Loading URLs...</p>;
  }

  if (urls.length === 0) {
    return (
      <p className="text-muted-foreground text-center py-8">
        No short URLs yet. Create your first one!
      </p>
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Short URL</TableHead>
            <TableHead>Original URL</TableHead>
            <TableHead className="text-center">Clicks</TableHead>
            <TableHead className="text-center">Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {urls.map((url) => {
            const shortUrl = `${window.location.origin}/${organizationSlug}/${url.slug}`;
            return (
              <TableRow key={url.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <a
                      href={shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      {url.slug}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => copyToClipboard(shortUrl)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="max-w-md truncate">{url.original_url}</TableCell>
                <TableCell className="text-center">{url.clicks}</TableCell>
                <TableCell className="text-center">
                  {new Date(url.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => setDeleteId(url.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Short URL</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this short URL? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteId && handleDelete(deleteId)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
