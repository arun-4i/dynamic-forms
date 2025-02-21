"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Plus } from "lucide-react";
import { FloatingLabelInput } from "../ui/floating-label";
import LanguageForm from "./language-form";

const phoneNumberSchema = z.object({
  primary: z.string().min(10, "Please enter a valid phone number"),
  secondary: z.string().min(10, "Please enter a valid phone number"),
});

const languages = z.object({
  language: z.string().min(3, "Language must be greater than 3 letters"),
  proficiency: z.number().min(1, "Proficiency must be greater than 0"),
});

const userSchema = z.object({
  name: z.string().min(3, "Name is required"),
  phoneNumber: phoneNumberSchema,
  languages: z.array(languages).min(1, "Atlest 1 language is required"),
});

export const formSchema = z.object({
  users: z.array(userSchema).min(1, "Atleast 1 user is required"),
});

const DynamicForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      users: [
        {
          name: "",
          phoneNumber: {
            primary: "",
            secondary: "",
          },
          languages: [
            {
              language: "",
              proficiency: 0,
            },
          ],
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "users",
    control: form.control,
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("Form submitted:", data);
    form.reset();
  }

  return (
    <div className="p-4 min-h-screen">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex justify-end mb-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() =>
                append({
                  name: "",
                  phoneNumber: { primary: "", secondary: "" },
                  languages: [
                    {
                      language: "",
                      proficiency: 0,
                    },
                  ],
                })
              }
            >
              <Plus />
              Add User
            </Button>
          </div>
          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {fields.map((field, index) => (
              <div key={field.id}>
                <Card className="h-fit col-span-1">
                  <CardHeader />
                  <CardContent className="space-y-2">
                    {/* Name Field */}
                    <FormField
                      control={form.control}
                      name={`users.${index}.name`}
                      render={({ field }) => (
                        <FormItem className="min-h-[65px]">
                          <FormControl>
                            <FloatingLabelInput
                              {...field}
                              id={`users.${index}.name`}
                              label="Name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Phone Numbers */}
                    <FormField
                      control={form.control}
                      name={`users.${index}.phoneNumber.primary`}
                      render={({ field }) => (
                        <FormItem className="min-h-[65px]">
                          <FormControl>
                            <FloatingLabelInput
                              {...field}
                              id={`users.${index}.phoneNumber.primary`}
                              label="Primary Number"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`users.${index}.phoneNumber.secondary`}
                      render={({ field }) => (
                        <FormItem className="min-h-[65px]">
                          <FormControl>
                            <FloatingLabelInput
                              {...field}
                              id={`users.${index}.phoneNumber.secondary`}
                              label="Secondary Number"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <LanguageForm control={form.control} userIndex={index} />
                    <div className="flex justify-between items-end">
                      <div>
                        {/* Add User Button */}
                        <div></div>
                      </div>
                      {/* Remove User Button */}
                      <div>
                        {fields.length > 1 && (
                          <div className="flex place-content-end">
                            <Button
                              type="button"
                              variant="destructive"
                              onClick={() => remove(index)}
                            >
                              Delete User
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          ̥{/* Submit Button */}
          <div className="flex place-content-end">
            <Button type="submit" size={"lg"} className="w-fit">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default DynamicForm;
