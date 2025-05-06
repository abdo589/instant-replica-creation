
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-primary text-white py-3 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">
          أمانة الشباب - قسم منتزة أول - حزب مستقبل وطن
        </div>
        <div className="flex items-center space-x-reverse space-x-6">
          <Link to="/view" className="hover:underline">
            عرض البيانات
          </Link>
          <Link to="/" className="hover:underline">
            التسجيل
          </Link>
          <img 
            src="/lovable-uploads/5bc27ba7-d55c-4086-b718-be439b28fb8f.png" 
            alt="شعار الحزب" 
            className="h-10 w-auto"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
