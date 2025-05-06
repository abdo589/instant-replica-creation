
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { FormValues } from "./schema";

interface AddressFieldsProps {
  control: Control<FormValues>;
}

const AddressFields: React.FC<AddressFieldsProps> = ({ control }) => {
  return (
    <FormField
      control={control}
      name="address"
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel className="text-right block">العنوان</FormLabel>
          <FormControl>
            <Input
              placeholder="أدخل العنوان"
              {...field}
              className="w-full"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AddressFields;
