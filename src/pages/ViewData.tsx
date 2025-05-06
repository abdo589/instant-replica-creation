
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ViewData: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-center mb-8">عرض بيانات الأعضاء</h1>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-center text-gray-600">لا توجد بيانات للعرض حالياً</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ViewData;
