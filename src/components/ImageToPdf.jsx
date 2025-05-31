import React, { useState, useRef } from 'react';
import { convertImagesToPdf } from '../utils/image.utils';

const ImageToPdf = () => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef();

  const handleFiles = async (files) => {
    try {
      if (!files || files.length === 0) throw new Error('Please select at least one image file.');
      const result = await convertImagesToPdf(files);
      setPdfUrl(result);
      setError('');
    } catch (err) {
      setError(err.message);
      setPdfUrl(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleFileChange = (e) => {
    handleFiles(e.target.files);
  };

  return (
    <div className="text-white w-full max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">🖼️ Convert Images to PDF</h1>

      <div
        onDrop={handleDrop}
        onDragOver={handleDrag}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        className={`border-2 border-dashed rounded-lg px-64 py-32 text-center transition-all duration-300 ${
          dragActive ? 'border-blue-400 bg-blue-900/10' : 'border-zinc-600'
        }`}
      >
        <p className="text-lg text-zinc-300 mb-2">Drag & drop image files here</p>
        <p className="text-sm text-zinc-500">or</p>
        <button
          onClick={() => fileInputRef.current.click()}
          className="mt-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
        >
          Choose Images
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {error && <p className="text-red-400 text-center mt-4">{error}</p>}

      {pdfUrl && (
        <div className="text-center mt-6">
          <a
            href={pdfUrl}
            download="converted.pdf"
            className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Download PDF
          </a>
        </div>
      )}
    </div>
  );
};

export default ImageToPdf;
