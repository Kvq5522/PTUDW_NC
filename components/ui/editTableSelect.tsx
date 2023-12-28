import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  banUnban: z.string({
    required_error: "Please select an option.",
  }),
});

export function SelectAccountForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Form data:", data);
    const action = data.banUnban;
  }

  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="banUnban"
          render={({ field }) => (
            <FormItem>
              <Select
                onValueChange={(value) => {
                  console.log("Selected value:", value); // Log the selected value
                }}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Unban" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="true">Ban</SelectItem>
                  <SelectItem value="false">Unban</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
