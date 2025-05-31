import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Navbar from './pages/Navbar';
import Footer from './pages/Footer';

import PdfMerge from './components/PdfMerge';
import PdfSplit from './components/PdfSplit';
import BgRemover from './components/BgRemover';
import ImageTypeConverter from './components/ImageTypeConverter';
import ImageEnhancer from './components/ImageEnhancer';
import ImageToPdf from './components/ImageToPdf';
import PdfToImage from './components/PdfToImage';

const App = () => {
  return (
    <div className="bg-black min-h-screen w-full text-white flex flex-col">
      <Navbar />

      <main className="flex-1 px-4 py-6 pt-18">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pdf-merge" element={<PdfMerge />} />
          <Route path="/pdf-split" element={<PdfSplit />} />
          <Route path="/bg-remover" element={<BgRemover />} />
          <Route path="/format-converter" element={<ImageTypeConverter />} />
          <Route path="/image-enhancer" element={<ImageEnhancer />} />
          <Route path="/image-to-pdf" element={<ImageToPdf />} />
          <Route path="/pdf-to-image" element={<PdfToImage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
