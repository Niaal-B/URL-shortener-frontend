import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Link as LinkIcon, Copy } from "lucide-react";
import api from '../api/api'

interface ShortUrlFormValues {
  original_url: string;
  slug: string;
}

interface CreateShortUrlFormProps {
  organizationSlug: string;
}

export const CreateShortUrlForm = ({ organizationSlug }: CreateShortUrlFormProps) => {
  const [open, setOpen] = useState(false);
  const [createdUrl, setCreatedUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<ShortUrlFormValues>({
    defaultValues: {
      original_url: "",
      slug: "",
    },
  });

  const onSubmit = async (data: ShortUrlFormValues) => {
    try {
      const response = await api.post("/api/urls/create/", {
        original_url: data.original_url,
        organization_slug: organizationSlug,
        slug: data.slug,
      });
  
      // Assuming your backend returns { short_url: "..." }
      setCreatedUrl(response.data.short_url);
  
      toast({
        title: "Short URL created!",
        description: `Your short URL is ready: ${response.data.short_url}`,
      });
  
      form.reset();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create short URL. Please try again.",
        variant: "destructive",
      });
    }
  };
  

  const copyToClipboard = () => {
    if (createdUrl) {
      navigator.clipboard.writeText(createdUrl);
      toast({
        title: "Copied!",
        description: "Short URL copied to clipboard",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <LinkIcon className="h-4 w-4" />
          Create Short URL
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Short URL</DialogTitle>
          <DialogDescription>
            Create a new short URL for {organizationSlug}
          </DialogDescription>
        </DialogHeader>

        {createdUrl ? (
          <div className="space-y-4 py-4">
            <div className="p-4 rounded-lg bg-muted">
              <p className="text-sm text-muted-foreground mb-2">Your short URL:</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-sm font-mono break-all">{createdUrl}</code>
                <Button size="icon" variant="outline" onClick={copyToClipboard}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button
              onClick={() => {
                setCreatedUrl(null);
                form.reset();
              }}
              className="w-full"
            >
              Create Another
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="original_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Original URL</FormLabel>
                    <FormControl>
                    <Input
  placeholder="https://example.com"
  {...field}
/>

                    </FormControl>
                    <FormMessage>{form.formState.errors.original_url?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Custom Slug</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="promo"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{form.formState.errors.slug?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Creating..." : "Create Short URL"}
              </Button>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};
