import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiGlobe, FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="
        fixed top-0 left-0 w-full
        bg-white/10 backdrop-blur-lg rounded-b-lg
        px-6 py-3 z-50
        border-b border-blue-700/70
        shadow-[0_4px_20px_5px_rgba(29,78,216,0.85)]
      "
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="font-bold text-3xl text-white flex items-center gap-2">
          Docx
          <FiGlobe className="text-blue-400" size={28} />
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <a
            href="https://anujbelsare.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white font-medium hover:text-blue-400 transition"
          >
            My Portfolio
          </a>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white focus:outline-none"
          aria-label="Toggle Menu"
        >
          {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 text-center">
          <a
            href="https://anujbelsare.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white font-medium hover:text-blue-400 transition"
            onClick={() => setMenuOpen(false)}
          >
            My Portfolio
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
