"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { z } from "zod";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ReactElement } from "react";
import { useCreateWorkspace } from "@/lib/actions/workspace/workspace.hook";

const FormSchema = z.object({
  name: z.string().min(3).max(20),
  plusTrial: z.boolean().default(false).optional(),
})

export const NewWorkspaceCreationForm = (): ReactElement => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      plusTrial: false,
    },
  })

  const createWorkspace = useCreateWorkspace();

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    toast(
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      </pre>
    )

    createWorkspace.mutate({
      name: data.name,
      startTrial: data.plusTrial ?? false,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="gap-2 p-4 rounded-md border shadow">
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Workspace name
                </FormLabel>
                <FormDescription>
                  The name of the workspace you want to create.
                </FormDescription>
              </div>

              <FormControl>
                <Input {...field} placeholder="Workspace name" />
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="plusTrial"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Try Plus for free ?</FormLabel>
                <FormDescription>
                  Get a free trial of our Plus plan for 14 days, no credit card required.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full">
          Open workspace
        </Button>
      </form>
    </Form>
  )
}
