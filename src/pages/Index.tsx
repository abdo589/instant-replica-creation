
import React from 'react';
import Header from '@/components/Header';
import Logo from '@/components/Logo';
import RegistrationForm from '@/components/RegistrationForm';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <Logo />
      
      <main className="flex-grow py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">أمانة الشباب</h1>
            <p className="text-lg text-gray-700">قسم منتزة أول - حزب مستقبل وطن</p>
          </div>
          
          <RegistrationForm />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
