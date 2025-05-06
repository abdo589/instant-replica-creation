
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Control } from "react-hook-form";
import { FormValues } from "./schema";

interface PersonalInfoFieldsProps {
  control: Control<FormValues>;
}

const PersonalInfoFields: React.FC<PersonalInfoFieldsProps> = ({ control }) => {
  return (
    <>
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel className="text-right block">الاسم</FormLabel>
            <FormControl>
              <Input
                placeholder="أدخل الاسم بالكامل"
                {...field}
                className="w-full"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="nationalId"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel className="text-right block">الرقم القومي</FormLabel>
            <FormControl>
              <Input
                placeholder="أدخل الرقم القومي المكون من 14 رقم"
                {...field}
                className="w-full"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="phoneNumber"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel className="text-right block">رقم التليفون</FormLabel>
            <FormControl>
              <Input
                placeholder="أدخل رقم التليفون"
                {...field}
                className="w-full"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="gender"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel className="text-right block mb-2">النوع</FormLabel>
            <FormControl>
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className="flex flex-row-reverse space-x-reverse space-x-6"
              >
                <div className="flex items-center space-x-reverse space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">ذكر</Label>
                </div>
                <div className="flex items-center space-x-reverse space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">أنثى</Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default PersonalInfoFields;
