import { stepFormSchema } from "@/schemas/step-form-schema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Checkbox } from "../ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { useStepFormStore } from "./store";
import { useEffect } from "react";

const termsFormSchema = stepFormSchema.pick({
  terms: true,
});

type TermsFormSchema = z.infer<typeof termsFormSchema>;

const TermsForms = ({
  switchTab,
}: {
  switchTab: (tabName: string) => void;
}) => {
  const name = useStepFormStore((state) => state.name);
  const email = useStepFormStore((state) => state.email);
  const phone = useStepFormStore((state) => state.phone);
  const address = useStepFormStore((state) => state.address);

  const form = useForm<TermsFormSchema>({
    resolver: zodResolver(termsFormSchema),
    defaultValues: {
      terms: false,
    },
  });

  function onSubmit(data: TermsFormSchema) {
    console.log("Form submitted:", {
      ...data,
      name,
      email,
      phone,
      address,
    });

    useStepFormStore.persist.clearStorage();
   
    // Delay reload slightly to ensure state is cleared before reloading
    setTimeout(() => {
       switchTab("name");
      window.location.reload();
    }, 200);
  }

  useEffect(() => {
    if (!useStepFormStore.persist.hasHydrated) return;

    if (!name || !email || !phone) switchTab("name");

    if (!address) switchTab("address");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, email, phone, address]);

  return (
    <div>
      <Card className="min-h-72 place-content-center">
        <div className="place-self-center">Render PDF Here</div>
      </Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="min-h-[65px] flex items-center justify-start">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="mt-1 "
                  />
                </FormControl>
                <FormLabel className="pl-2 place-self-center">
                  Accept Terms and Conditions <FormMessage className="pt-2" />
                </FormLabel>
              </FormItem>
            )}
          />

          <div className="w-full flex place-content-end">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TermsForms;
