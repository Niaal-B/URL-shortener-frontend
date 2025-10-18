import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Building2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(3, "Organization name must be at least 3 characters").max(100),
});

interface CreateOrganizationFormProps {
  onSuccess: () => void;
}

export const CreateOrganizationForm = ({ onSuccess }: CreateOrganizationFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // TODO: POST to /api/organizations/
      console.log("Creating organization:", values);
      
      toast({
        title: "Organization created",
        description: `${values.name} has been created successfully.`,
      });
      
      form.reset();
      setIsOpen(false);
      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create organization. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!isOpen) {
    return (
      <Button 
        onClick={() => setIsOpen(true)} 
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        size="lg"
      >
        <Plus className="mr-2 h-5 w-5" />
        Create Organization
      </Button>
    );
  }

  return (
    <Card className="border-primary/20 shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Building2 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle>Create New Organization</CardTitle>
            <CardDescription>Start managing your short URLs</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization Name</FormLabel>
                  <FormControl>
                    <Input placeholder="My Organization" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <Button 
                type="submit" 
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Create
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setIsOpen(false);
                  form.reset();
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
