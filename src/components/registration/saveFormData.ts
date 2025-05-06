
import { FormValues } from './schema';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Check, AlertCircle } from "lucide-react";

export const saveFormData = async (data: FormValues, resetForm: () => void) => {
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
    resetForm();
    return true;
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
    return false;
  }
};
