import React, { useState, useRef } from 'react';
import { convertImageType } from '../utils/image.utils';

const ImageTypeConverter = () => {
  const [convertedUrl, setConvertedUrl] = useState(null);
  const [error, setError] = useState('');
  const [format, setFormat] = useState('image/png');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef();

  const handleFile = async (file) => {
    if (!file) return;
    try {
      const resultUrl = await convertImageType(file, format);
      setConvertedUrl(resultUrl);
      setError('');
    } catch (err) {
      setError(err.message);
      setConvertedUrl(null);
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

  const handleFileChange = (e) => {
    handleFile(e.target.files[0]);
  };

  return (
    <div className="text-white w-full max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">🔄 Convert Image Format</h1>

      {/* Format Selection */}
      <div className="mb-6 text-center">
        <label className="mr-2 text-lg">Convert to:</label>
        <select
          className="bg-zinc-800 text-white p-2 rounded"
          value={format}
          onChange={(e) => setFormat(e.target.value)}
        >
          <option value="image/png">PNG</option>
          <option value="image/jpeg">JPG</option>
          <option value="image/webp">WEBP</option>
        </select>
      </div>

      {/* Drag and Drop Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDrag}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        className={`border-2 border-dashed rounded-lg w-full text-center transition-all duration-300 
        ${dragActive ? 'border-blue-400 bg-blue-900/10' : 'border-zinc-600'} 
        px-4 py-12 sm:px-10 sm:py-16 md:px-20 md:py-24 lg:px-32 lg:py-28`}
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
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {error && <p className="text-red-400 text-center mt-4">{error}</p>}

      {/* Download Result */}
      {convertedUrl && (
        <div className="text-center mt-8">
          <img
            src={convertedUrl}
            alt="Converted"
            className="mx-auto w-full max-w-xs rounded mb-4 shadow"
          />
          <a
            href={convertedUrl}
            download={`converted.${format.split('/')[1]}`}
            className="bg-green-600 px-5 py-2 rounded hover:bg-green-700 transition"
          >
            Download Converted Image
          </a>
        </div>
      )}
    </div>
  );
};

export default ImageTypeConverter;
