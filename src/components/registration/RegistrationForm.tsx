
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormValues } from "./schema";
import { saveFormData } from "./saveFormData";
import PersonalInfoFields from "./PersonalInfoFields";
import AddressFields from "./AddressFields";
import StatusField from "./StatusField";
import NotesField from "./NotesField";

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
    await saveFormData(data, () => form.reset());
    setIsLoading(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-md overflow-hidden">
      <div className="bg-primary text-white font-bold py-3 px-4 text-center text-xl">
        تسجيل بيانات عضو جديد
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-6">
          <PersonalInfoFields control={form.control} />
          <AddressFields control={form.control} />
          <StatusField 
            control={form.control} 
            isManualEntry={isManualEntry} 
            setIsManualEntry={setIsManualEntry} 
          />
          <NotesField control={form.control} />

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
