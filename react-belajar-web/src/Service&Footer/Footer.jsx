import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-base text-gray-100">
            &copy; {new Date().getFullYear()} Kelompok 2. All rights reserved.
          </p>
          <p className="text-base text-gray-100">
            Di buat oleh Kelompok 2
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
