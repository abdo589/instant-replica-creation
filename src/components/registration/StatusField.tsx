
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";
import { FormValues } from "./schema";

interface StatusFieldProps {
  control: Control<FormValues>;
  isManualEntry: boolean;
  setIsManualEntry: (value: boolean) => void;
}

const StatusField: React.FC<StatusFieldProps> = ({ 
  control, 
  isManualEntry, 
  setIsManualEntry 
}) => {
  return (
    <FormField
      control={control}
      name="status"
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel className="text-right block">الصفة</FormLabel>
          <div className="flex space-x-reverse space-x-2 justify-end">
            <Button 
              type="button" 
              variant={!isManualEntry ? "default" : "outline"} 
              className={!isManualEntry ? "bg-primary text-white" : ""}
              onClick={() => setIsManualEntry(false)}
            >
              من القائمة
            </Button>
            <Button 
              type="button" 
              variant={isManualEntry ? "default" : "outline"}
              className={isManualEntry ? "bg-primary text-white" : ""}
              onClick={() => setIsManualEntry(true)}
            >
              إدخال يدوي
            </Button>
          </div>
          <FormControl>
            {isManualEntry ? (
              <Input
                placeholder="أدخل الصفة"
                value={field.value}
                onChange={field.onChange}
                className="w-full"
              />
            ) : (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="اختر الصفة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="member">عضو</SelectItem>
                  <SelectItem value="leader">قيادي</SelectItem>
                  <SelectItem value="volunteer">متطوع</SelectItem>
                  <SelectItem value="supporter">مؤيد</SelectItem>
                  <SelectItem value="youth">شباب</SelectItem>
                </SelectContent>
              </Select>
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default StatusField;
