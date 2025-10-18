import { useState } from "react";
import { Upload, FileSpreadsheet, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  organizationId: z.string().min(1, "Please select an organization"),
  file: z.any().refine((file) => file?.length > 0, "Please select a file"),
});

// Mock organizations - replace with API call
const mockAdminOrganizations = [
  { id: "1", name: "Tech Startup Inc" },
  { id: "2", name: "Marketing Agency" },
];

const BulkUpload = () => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      organizationId: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsUploading(true);
    
    try {
      // TODO: POST to /api/bulk-upload/ with file + organization_id
      console.log("Uploading:", values);
      
      toast({
        title: "Upload successful",
        description: "Your URLs are being processed.",
      });
      
      form.reset();
      setSelectedFile(null);
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      form.setValue("file", e.target.files);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-accent">
          <Upload className="h-8 w-8 text-accent-foreground" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Bulk Upload</h1>
          <p className="text-muted-foreground">Upload CSV or Excel files to create multiple short URLs</p>
        </div>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Your file should contain columns for the original URL and optionally a custom slug.
          Maximum 1000 URLs per upload.
        </AlertDescription>
      </Alert>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Upload File</CardTitle>
          <CardDescription>
            Select an organization and upload your CSV or Excel file
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="organizationId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organization</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an organization" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mockAdminOrganizations.map((org) => (
                          <SelectItem key={org.id} value={org.id}>
                            {org.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="file"
                render={() => (
                  <FormItem>
                    <FormLabel>File</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-4">
                        <label
                          htmlFor="file-upload"
                          className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg cursor-pointer hover:bg-muted/80 transition-colors"
                        >
                          <FileSpreadsheet className="h-5 w-5 text-muted-foreground" />
                          <span className="text-sm font-medium">Choose File</span>
                          <input
                            id="file-upload"
                            type="file"
                            accept=".csv,.xlsx,.xls"
                            className="hidden"
                            onChange={handleFileChange}
                          />
                        </label>
                        {selectedFile && (
                          <span className="text-sm text-muted-foreground">{selectedFile.name}</span>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={isUploading}
              >
                {isUploading ? "Uploading..." : "Upload & Create URLs"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BulkUpload;
