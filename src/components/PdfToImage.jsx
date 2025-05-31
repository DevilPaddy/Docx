import React, { useState, useRef } from 'react';
import { convertPdfToImages } from '../utils/pdf.utils';

const PdfToImage = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef();

  const handleFiles = async (files) => {
    try {
      const imageList = await convertPdfToImages(files[0]);
      setImages(imageList);
      setError('');
    } catch (err) {
      setError(err.message);
      setImages([]);
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
      <h1 className="text-3xl font-bold mb-6 text-center">📤 Convert PDF to Images</h1>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`border-2 border-dashed rounded-lg px-64 py-32 text-center transition-all duration-300 ${
          dragging ? 'border-blue-400 bg-blue-900/10' : 'border-zinc-600'
        }`}
      >
        <p className="text-lg text-zinc-300 mb-2">Drag & drop a PDF file here</p>
        <p className="text-sm text-zinc-500">or</p>
        <button
          onClick={() => fileInputRef.current.click()}
          className="mt-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
        >
          Choose PDF File
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {error && <p className="text-red-400 mt-4">{error}</p>}

      {images.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-center">🖼 Preview & Download Images</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((img, index) => (
              <div key={index} className="bg-zinc-800 p-3 rounded-lg">
                <img src={img.url} alt={`Page ${index + 1}`} className="w-full mb-2 rounded" />
                <a
                  href={img.url}
                  download={img.name}
                  className="block text-center text-sm bg-green-600 py-1 rounded hover:bg-green-700 transition"
                >
                  Download {img.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PdfToImage;
