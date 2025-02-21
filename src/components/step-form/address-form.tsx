'use client';

import { stepFormSchema } from "@/schemas/step-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { FloatingLabelInput } from "../ui/floating-label";
import { Button } from "../ui/button";
import { Plus, Trash } from "lucide-react";
import { useStepFormStore } from "./store";
import { useEffect } from "react";


const addressFormSchema = stepFormSchema.pick({
  address: true,
})

type AddressFormSchema = z.infer<typeof addressFormSchema>;

const AddressForm = ({ switchTab }: { switchTab: (tabName: string) => void }) => {
  const name = useStepFormStore((state) => state.name);
  const email = useStepFormStore((state) => state.email);
  const phone = useStepFormStore((state) => state.phone);
  const address = useStepFormStore((state) => state.address);

  const setData = useStepFormStore((state) => state.setData);

  const form = useForm<AddressFormSchema>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      address: address?.length > 0
          ? address
          : [
              {
                address_line_1: "",
                address_line_2: "",
                city: "",
                state: "",
                zip: "",
                country: "",
              },
            ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "address",
    control: form.control,
  });

  function onSubmit(data: AddressFormSchema) {
    console.log("addressform: ", data);
    setData(data);
    switchTab("terms");
  }

  useEffect(() => {
    if (!useStepFormStore.persist.hasHydrated) return;

    if (!name || !email || !phone) switchTab("name");

    //  Set form values when Zustand data is available
    if (address?.length > 0) {
      form.reset(address);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, email, phone]);

  return (
    <Form {...form}>
      <div className="flex justify-end mb-4">
        <Button
          type="button"
          variant="secondary"
          onClick={() =>
            append({
              address_line_1: "",
              address_line_2: "",
              city: "",
              state: "",
              zip: "",
              country: "",
            })
          }
        >
          <Plus />
          Add User
        </Button>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <div key={field.id} className="grid grid-cols-12 grid-rows-2 gap-2">
            <FormField
              control={form.control}
              name={`address.${index}.address_line_1`}
              render={({ field }) => (
                <FormItem className="col-span-6 min-h-[65px]">
                  <FormControl>
                    <FloatingLabelInput
                      {...field}
                      id={`address.${index}.address_line_1`}
                      label="Address Line - 1"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`address.${index}.address_line_2`}
              render={({ field }) => (
                <FormItem className="col-span-5 col-start-7 min-h-[65px]">
                  <FormControl>
                    <FloatingLabelInput
                      {...field}
                      id={`address.${index}.address_line_2`}
                      label="Address Line - 2"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`address.${index}.city`}
              render={({ field }) => (
                <FormItem className="col-span-3 col-start-1 min-h-[65px]">
                  <FormControl>
                    <FloatingLabelInput
                      {...field}
                      id={`address.${index}.city`}
                      label="City"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`address.${index}.state`}
              render={({ field }) => (
                <FormItem className="col-span-3 min-h-[65px]">
                  <FormControl>
                    <FloatingLabelInput
                      {...field}
                      id={`address.${index}.state`}
                      label="State"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`address.${index}.zip`}
              render={({ field }) => (
                <FormItem className="col-span-3 min-h-[65px]">
                  <FormControl>
                    <FloatingLabelInput
                      {...field}
                      id={`address.${index}.zip`}
                      label="ZipCode"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`address.${index}.country`}
              render={({ field }) => (
                <FormItem className="col-span-3 min-h-[65px]">
                  <FormControl>
                    <FloatingLabelInput
                      {...field}
                      id={`address.${index}.country`}
                      label="Country"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Remove Address Button */}
            {fields.length > 1 && (
              <div className="col-span-1 col-start-12 row-start-1 justify-self-end">
                <Button
                  type="button"
                  size={"icon"}
                  variant="destructive"
                  onClick={() => remove(index)}
                >
                  <Trash className="text-sm" />
                </Button>
              </div>
            )}
          </div>
        ))}
        <div className="w-full flex place-content-end">
          <Button type="submit">Next</Button>
        </div>
      </form>
    </Form>
  );
};

export default AddressForm