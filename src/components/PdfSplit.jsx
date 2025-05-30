import React, { useState, useRef } from 'react';
import { splitPdfFiles } from '../utils/pdf.utils';

const PdfSplit = () => {
  const [splitPages, setSplitPages] = useState([]);
  const [error, setError] = useState('');
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef();

  const handleFiles = async (files) => {
    try {
      const file = files[0];
      const pages = await splitPdfFiles(file);
      setSplitPages(pages);
      setError('');
    } catch (err) {
      setError(err.message);
      setSplitPages([]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleFileChange = (e) => {
    handleFiles(e.target.files);
  };

  return (
    <div className="text-white w-full max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">✂️ Split PDF Files</h1>

      {/* Drag & Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`border-2 border-dashed rounded-lg px-10 py-24 text-center transition-all duration-300 ${
          dragging ? 'border-blue-400 bg-blue-900/10' : 'border-zinc-600'
        }`}
      >
        <p className="text-lg text-zinc-300 mb-2">Drag & drop a PDF file here</p>
        <p className="text-sm text-zinc-500">or</p>
        <button
          onClick={() => fileInputRef.current.click()}
          className="mt-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
        >
          Choose File
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Error */}
      {error && <p className="text-red-400 mt-4">{error}</p>}

      {/* Result */}
      {splitPages.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-center">📄 Download Split Pages</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {splitPages.map((page, idx) => (
              <a
                key={idx}
                href={page.url}
                download={page.name}
                className="bg-green-600 px-4 py-2 rounded text-center hover:bg-green-700 transition"
              >
                Download {page.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PdfSplit;
