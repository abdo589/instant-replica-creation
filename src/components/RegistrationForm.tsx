
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { Check, AlertCircle } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";

// Validation schema
const formSchema = z.object({
  name: z.string().min(1, "الاسم مطلوب"),
  nationalId: z.string()
    .min(14, "الرقم القومي يجب أن يكون 14 رقم")
    .max(14, "الرقم القومي يجب أن يكون 14 رقم")
    .regex(/^\d+$/, "الرقم القومي يجب أن يحتوي على أرقام فقط"),
  phoneNumber: z.string().optional(),
  gender: z.enum(["male", "female"], { required_error: "النوع مطلوب" }),
  status: z.string().min(1, "الصفة مطلوبة"),
  address: z.string().optional(),
  notes: z.string().optional()
});

type FormValues = z.infer<typeof formSchema>;

const RegistrationForm: React.FC = () => {
  const [isManualEntry, setIsManualEntry] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      nationalId: '',
      phoneNumber: '',
      gender: 'male',
      status: '',
      address: '',
      notes: ''
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    
    try {
      // Save the data to Supabase
      const { error } = await supabase.from('members').insert({
        name: data.name,
        national_id: data.nationalId,
        phone_number: data.phoneNumber,
        gender: data.gender,
        status: data.status,
        address: data.address,
        notes: data.notes
      });

      if (error) {
        throw error;
      }

      toast("تم تسجيل البيانات بنجاح", {
        description: "تم حفظ بيانات العضو في قاعدة البيانات",
        icon: <Check className="h-4 w-4" />,
      });
      form.reset();
    } catch (error: any) {
      console.error("Error saving data:", error);
      
      let errorMessage = "حدث خطأ أثناء تسجيل البيانات";
      
      // Handle duplicate national ID error
      if (error.code === "23505") {
        errorMessage = "الرقم القومي مسجل بالفعل";
      }
      
      toast("خطأ في التسجيل", {
        description: errorMessage,
        icon: <AlertCircle className="h-4 w-4 text-destructive" />,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-md overflow-hidden">
      <div className="bg-primary text-white font-bold py-3 px-4 text-center text-xl">
        تسجيل بيانات عضو جديد
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-6">
          <FormField
            control={form.control}
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
            control={form.control}
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
            control={form.control}
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
            control={form.control}
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

          <FormField
            control={form.control}
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

          <FormField
            control={form.control}
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

          <FormField
            control={form.control}
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

          <Button 
            type="submit" 
            className="w-full bg-primary text-white font-bold py-2 px-4 rounded mt-6"
            disabled={isLoading}
          >
            {isLoading ? "جاري التسجيل..." : "تسجيل البيانات"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RegistrationForm;
