import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-8 border-t border-white/10 text-center">
      <div className="container mx-auto px-6">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} <span className="text-white font-bold">Jetskig</span>. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
