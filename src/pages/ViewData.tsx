
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from "@/integrations/supabase/client";
import { Loader2, X, FileSpreadsheet } from 'lucide-react';
import { toast } from 'sonner';

interface Member {
  id: string;
  name: string;
  national_id: string;
  phone_number: string | null;
  gender: string;
  status: string;
  address: string | null;
  notes: string | null;
  created_at: string;
}

const ViewData: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);

  useEffect(() => {
    fetchMembers();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = members.filter(
        member => 
          member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          member.national_id.includes(searchTerm)
      );
      setFilteredMembers(filtered);
    } else {
      setFilteredMembers(members);
    }
  }, [searchTerm, members]);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      if (data) {
        setMembers(data);
        setFilteredMembers(data);
      }
    } catch (error) {
      console.error('Error fetching members:', error);
      toast("خطأ في جلب البيانات", {
        description: "حدث خطأ أثناء محاولة جلب بيانات الأعضاء.",
        icon: <X className="h-4 w-4 text-destructive" />,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExportToExcel = () => {
    // Convert members data to CSV format
    const headers = ['الاسم', 'الرقم القومي', 'الهاتف', 'النوع', 'الصفة', 'العنوان', 'ملاحظات'];
    
    let csvContent = headers.join(',') + '\n';
    
    filteredMembers.forEach(member => {
      const rowData = [
        `"${member.name || ''}"`,
        `"${member.national_id || ''}"`,
        `"${member.phone_number || ''}"`,
        `"${member.gender === 'male' ? 'ذكر' : 'أنثى'}"`,
        `"${member.status || ''}"`,
        `"${member.address || ''}"`,
        `"${member.notes || ''}"`
      ];
      csvContent += rowData.join(',') + '\n';
    });
    
    // Create a Blob from the CSV data
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    // Create a download link and click it
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'members_data.csv');
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast("تم تصدير البيانات", {
      description: "تم تصدير البيانات إلى ملف Excel بنجاح",
      icon: <FileSpreadsheet className="h-4 w-4" />,
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The filtering is already handled by the useEffect
  };

  // Function to format gender and status for display
  const formatGender = (gender: string) => gender === 'male' ? 'ذكر' : 'أنثى';
  const formatStatus = (status: string) => {
    const statusMap: Record<string, string> = {
      'member': 'عضو',
      'leader': 'قيادي',
      'volunteer': 'متطوع',
      'supporter': 'مؤيد',
      'youth': 'شباب'
    };
    return statusMap[status] || status;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8 text-primary">عرض بيانات الأعضاء</h1>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
              <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2 space-x-reverse">
                <Input 
                  type="search" 
                  placeholder="ابحث باسم العضو أو الرقم القومي" 
                  className="text-right"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button type="submit">بحث</Button>
              </form>
              <div>
                <Button 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={handleExportToExcel}
                >
                  تصدير إلى Excel
                </Button>
              </div>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center py-10">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
              </div>
            ) : filteredMembers.length > 0 ? (
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
                    {filteredMembers.map((member, index) => (
                      <TableRow key={member.id}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell>{member.name}</TableCell>
                        <TableCell>{member.national_id}</TableCell>
                        <TableCell>{member.phone_number || '-'}</TableCell>
                        <TableCell>{formatGender(member.gender)}</TableCell>
                        <TableCell>{formatStatus(member.status)}</TableCell>
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
