import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-zinc-900 w-full px-6 py-2 mt-12 border-t border-zinc-700">
      <div className="max-w-3xl mx-auto flex flex-col justify-between items-center gap-2">
        <p className="text-zinc-500 text-sm sm:text-base font-light">
          &copy; {new Date().getFullYear()} Docx. All rights reserved.
        </p>
        <p className="text-zinc-500 text-sm sm:text-base font-light">
          Made by <a href="https://linkedin.com/in/anuj-belsare" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-500 transition-colors">Anuj Belsare</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
