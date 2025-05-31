import React, { useState, useRef } from 'react';
import { enhanceImage } from '../utils/image.utils';

const ImageEnhancer = () => {
  const [enhancedUrl, setEnhancedUrl] = useState(null);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef();

  const handleFile = async (file) => {
    if (!file) return;
    try {
      const result = await enhanceImage(file);
      setEnhancedUrl(result);
      setError('');
    } catch (err) {
      setError(err.message);
      setEnhancedUrl(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else {
      setDragActive(false);
    }
  };

  const handleImageChange = (e) => {
    handleFile(e.target.files[0]);
  };

  return (
    <div className="text-white w-full max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">✨ Enhance Image</h1>

      <div
        onDrop={handleDrop}
        onDragOver={handleDrag}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        className={`border-2 border-dashed rounded-lg px-64 py-32 text-center transition-all duration-300 ${
          dragActive ? 'border-blue-400 bg-blue-900/10' : 'border-zinc-600'
        }`}
      >
        <p className="text-lg text-zinc-300 mb-2">Drag & drop an image here</p>
        <p className="text-sm text-zinc-500">or</p>
        <button
          onClick={() => fileInputRef.current.click()}
          className="mt-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
        >
          Choose Image
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      {error && <p className="text-red-400 text-center mt-4">{error}</p>}

      {enhancedUrl && (
        <div className="mt-8 text-center">
          <img
            src={enhancedUrl}
            alt="Enhanced Preview"
            className="mx-auto max-w-md rounded shadow mb-4"
          />
          <a
            href={enhancedUrl}
            download="enhanced-image.png"
            className="bg-green-600 px-5 py-2 rounded hover:bg-green-700 transition"
          >
            Download Enhanced Image
          </a>
        </div>
      )}
    </div>
  );
};

export default ImageEnhancer;
