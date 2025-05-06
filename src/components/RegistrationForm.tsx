
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    nationalId: '',
    phoneNumber: '',
    gender: '',
    status: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to a server
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-md overflow-hidden">
      <div className="bg-primary text-white font-bold py-3 px-4 text-center">
        تسجيل بيانات عضو جديد
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="space-y-2">
          <div className="text-right">الاسم</div>
          <Input
            name="name"
            placeholder="أدخل الاسم بالكامل"
            value={formData.name}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <div className="text-right">الرقم القومي</div>
          <Input
            name="nationalId"
            placeholder="أدخل الرقم القومي المكون من 14 رقم"
            value={formData.nationalId}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <div className="text-right">رقم التليفون</div>
          <Input
            name="phoneNumber"
            placeholder="أدخل رقم التليفون"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <div className="text-right mb-2">النوع</div>
          <RadioGroup
            defaultValue={formData.gender}
            onValueChange={(value) => handleSelectChange('gender', value)}
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
        </div>

        <div className="space-y-2">
          <div className="text-right">الصفة</div>
          <div className="flex space-x-reverse space-x-2 justify-end">
            <Button 
              type="button" 
              variant="default" 
              className="bg-primary text-white"
              onClick={() => {}}
            >
              من القائمة
            </Button>
            <Button 
              type="button" 
              variant="outline"
              onClick={() => {}}
            >
              إدخال يدوي
            </Button>
          </div>
          <Select onValueChange={(value) => handleSelectChange('status', value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="اختر الصفة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="member">عضو</SelectItem>
              <SelectItem value="leader">قيادي</SelectItem>
              <SelectItem value="volunteer">متطوع</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-primary text-white font-bold py-2 px-4 rounded mt-6"
        >
          تسجيل البيانات
        </Button>
      </form>
    </div>
  );
};

export default RegistrationForm;
