
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Control } from "react-hook-form";
import { FormValues } from "./schema";

interface NotesFieldProps {
  control: Control<FormValues>;
}

const NotesField: React.FC<NotesFieldProps> = ({ control }) => {
  return (
    <FormField
      control={control}
      name="notes"
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel className="text-right block">ملاحظات</FormLabel>
          <FormControl>
            <Textarea
              placeholder="أدخل أي ملاحظات إضافية"
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

export default NotesField;
