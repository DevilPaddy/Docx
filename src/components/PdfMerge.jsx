import React, { useState, useRef } from 'react';
import { mergePdfFiles } from '../utils/pdf.utils';

const PdfMerge = () => {
  const [mergedPdfUrl, setMergedPdfUrl] = useState(null);
  const [error, setError] = useState('');
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef();

  const handleFiles = async (files) => {
    try {
      const url = await mergePdfFiles(files);
      setMergedPdfUrl(url);
      setError('');
    } catch (err) {
      setError(err.message);
      setMergedPdfUrl(null);
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
    <div className="text-white w-full mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">📎 Merge PDF Files</h1>

      {/* Drag & Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`border-2 border-dashed rounded-lg px-64 py-32 text-center transition-all duration-300 ${
          dragging ? 'border-blue-400 bg-blue-900/10' : 'border-zinc-600'
        }`}
      >
        <p className="text-lg text-zinc-300 mb-2">Drag & drop PDF files here</p>
        <p className="text-sm text-zinc-500">or</p>
        <button
          onClick={() => fileInputRef.current.click()}
          className="mt-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
        >
          Choose Files
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Error message */}
      {error && <p className="text-red-400 mt-4">{error}</p>}

      {/* Download link */}
      {mergedPdfUrl && (
        <div className="mt-6 text-center">
          <a
            href={mergedPdfUrl}
            download="merged.pdf"
            className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Download Merged PDF
          </a>
        </div>
      )}
    </div>
  );
};

export default PdfMerge;
