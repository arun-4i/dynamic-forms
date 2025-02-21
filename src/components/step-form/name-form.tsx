'use client';
import { stepFormSchema } from "@/schemas/step-form-schema"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { FloatingLabelInput } from "../ui/floating-label";
import { useStepFormStore } from "./store";
import { Button } from "../ui/button";
import { useEffect } from "react";

const nameFormSchema = stepFormSchema.pick({
  name: true,
  email: true,
  phone: true
})

type NameFormSchema = z.infer<typeof nameFormSchema>;

const NameForm = ({ switchTab }: { switchTab: (tabName: string) => void }) => {

    const name = useStepFormStore((state) => state.name);
    const email = useStepFormStore((state) => state.email);
  const phone = useStepFormStore((state) => state.phone);
  
  const setData = useStepFormStore((state) => state.setData);

  const form = useForm<NameFormSchema>({
    resolver: zodResolver(nameFormSchema),
    defaultValues: {
      name: name??"",
      email: email??"",
      phone: {
        primary: phone?.primary??"",
        secondary: phone?.secondary??"",
      },
    },
  });

  function onSubmit(data: NameFormSchema) {
    console.log("Form submitted:", data);
    setData(data);
    switchTab("address");
  }

  
  useEffect(() => {
    if (!useStepFormStore.persist.hasHydrated) return;
  }, []);

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="min-h-[65px]">
                  <FormControl>
                    <FloatingLabelInput
                      {...field}
                      id="name"
                      label="Name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="min-h-[65px]">
                  <FormControl>
                    <FloatingLabelInput
                      {...field}
                      id="email"
                      label="Email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone.primary"
              render={({ field }) => (
                <FormItem className="min-h-[65px]">
                  <FormControl>
                    <FloatingLabelInput
                      {...field}
                      id="phone.primary"
                      label=" Primary Number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone.secondary"
              render={({ field }) => (
                <FormItem className="min-h-[65px]">
                  <FormControl>
                    <FloatingLabelInput
                      {...field}
                      id="phone.secondary"
                      label=" Secondary Number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex place-content-end">
            <Button type="submit">Next</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default NameForm