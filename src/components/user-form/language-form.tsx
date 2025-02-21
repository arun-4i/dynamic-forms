"use client";

import { Plus, Trash } from "lucide-react";
import { Control, useFieldArray } from "react-hook-form";
import { Button } from "../ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { formSchema } from "./dynamic-form";
import { z } from "zod";
import { FloatingLabelInput } from "../ui/floating-label";

type LanguageFormProps = {
  control: Control<z.infer<typeof formSchema>>;
  userIndex: number;
};

const LanguageForm = ({ control, userIndex }: LanguageFormProps) => {
  const { append, remove, fields } = useFieldArray({
    control: control,
    name: `users.${userIndex}.languages`,
  });
    
  return (
    <div>
      <div>
        <div className="mb-1 flex place-content-start items-center gap-2">
          <span className="text-sm">Languages</span>
          <Button
            type="button"
            size={"icon"}
            variant="secondary"
            onClick={() =>
              append({
                language: "",
                proficiency: 0,
              })
            }
          >
            <Plus />
          </Button>
        </div>
      </div>

      {/* language fields */}
      <div>
        {fields.map((field, langIndex) => (
          <div key={field.id} className="grid grid-cols-9 gap-2">
            {/* language name */}
            <FormField
              control={control}
              name={`users.${userIndex}.languages.${langIndex}.language`}
              render={({ field }) => (
                <FormItem className="col-span-4 min-h-[65px]">
                  <FormControl>
                    <FloatingLabelInput
                      {...field}
                      id={`users.${userIndex}.languages.${langIndex}.language`}
                      label="Language"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* proficiency */}
            <FormField
              control={control}
              name={`users.${userIndex}.languages.${langIndex}.proficiency`}
              render={({ field }) => (
                <FormItem className="col-span-4 min-h-[65px]">
                  <FormControl>
                    <FloatingLabelInput
                      {...field}
                      id={`users.${userIndex}.languages.${langIndex}.proficiency`}
                      type="number"
                      onChange={(e) => field.onChange(e.target.valueAsNumber)} // Converts to number
                      value={field.value ?? 0} // Ensures controlled component
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Remove Language Button */}
            {fields.length > 1 && (
              <div className="col-span-1 place-self-end">
                <Button
                  type="button"
                  size={"icon"}
                  variant="destructive"
                  onClick={() => remove(langIndex)}
                >
                  <Trash className="text-sm" />
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Add Language Button */}
    </div>
  );
};

export default LanguageForm;
