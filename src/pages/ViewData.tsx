
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const ViewData: React.FC = () => {
  // هذا مجرد نموذج للبيانات، في التطبيق الحقيقي ستأتي من قاعدة البيانات
  const dummyData = [
    { id: 1, name: 'محمد أحمد', nationalId: '1234567891234', phone: '01012345678', gender: 'ذكر', status: 'عضو' },
    { id: 2, name: 'سارة محمود', nationalId: '9876543219876', phone: '01198765432', gender: 'أنثى', status: 'متطوع' },
    { id: 3, name: 'أحمد إبراهيم', nationalId: '1472583691472', phone: '01223456789', gender: 'ذكر', status: 'قيادي' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8 text-primary">عرض بيانات الأعضاء</h1>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
              <div className="flex w-full max-w-sm items-center space-x-2 space-x-reverse">
                <Input type="search" placeholder="ابحث باسم العضو أو الرقم القومي" className="text-right" />
                <Button type="submit">بحث</Button>
              </div>
              <div>
                <Button className="bg-green-600 hover:bg-green-700">تصدير إلى Excel</Button>
              </div>
            </div>
            
            {dummyData.length > 0 ? (
              <div className="overflow-x-auto">
                <Table dir="rtl">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">#</TableHead>
                      <TableHead className="text-right">الاسم</TableHead>
                      <TableHead className="text-right">الرقم القومي</TableHead>
                      <TableHead className="text-right">الهاتف</TableHead>
                      <TableHead className="text-right">النوع</TableHead>
                      <TableHead className="text-right">الصفة</TableHead>
                      <TableHead className="text-right">خيارات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dummyData.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell className="font-medium">{row.id}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.nationalId}</TableCell>
                        <TableCell>{row.phone}</TableCell>
                        <TableCell>{row.gender}</TableCell>
                        <TableCell>{row.status}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" className="ml-2">تعديل</Button>
                          <Button variant="outline" size="sm" className="text-red-500">حذف</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-center text-gray-600 py-8">لا توجد بيانات للعرض حالياً</p>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ViewData;
