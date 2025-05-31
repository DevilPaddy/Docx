import React, { useRef, useState, useCallback } from 'react';
import { SelfieSegmentation } from '@mediapipe/selfie_segmentation';
import '@mediapipe/selfie_segmentation/selfie_segmentation';

const BgRemover = () => {
  const fileInputRef = useRef(null);
  const [resultImg, setResultImg] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const canvasRef = useRef(null);

  const handleImageUpload = async (file) => {
    if (!file) return;
    const img = new Image();
    img.onload = () => processImage(img);
    img.src = URL.createObjectURL(file);
  };

  const processImage = async (image) => {
    const canvas = canvasRef.current;
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext('2d');

    // Optional: Slight sharpening filter (basic enhancement)
    ctx.filter = 'contrast(110%) brightness(105%)';
    ctx.drawImage(image, 0, 0);

    const segmentation = new SelfieSegmentation({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`,
    });

    segmentation.setOptions({ modelSelection: 1 });

    segmentation.onResults((results) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(results.segmentationMask, 0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'source-in';
      ctx.drawImage(image, 0, 0);
      ctx.globalCompositeOperation = 'source-over';
      setResultImg(canvas.toDataURL());
    });

    await segmentation.send({ image });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleImageUpload(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  return (
    <div className="text-white w-full max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">🧠 AI Background Remover</h1>

      <div
        className={`border-2 border-dashed rounded-lg px-10 py-24 text-center transition-all duration-300 ${
          dragActive ? 'border-blue-400 bg-blue-900/10' : 'border-zinc-600'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <p className="text-lg text-zinc-300 mb-2">Drag & Drop your image here</p>
        <button
          onClick={() => fileInputRef.current.click()}
          className="mt-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
        >
          Or Select Image
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {resultImg && (
        <div className="mt-8 text-center">
          <img src={resultImg} alt="Processed" className="mx-auto max-w-md rounded shadow-lg" />
          <a
            href={resultImg}
            download="clean-no-bg.png"
            className="mt-4 inline-block bg-green-600 px-5 py-2 text-white rounded hover:bg-green-700 transition"
          >
            Download Image
          </a>
        </div>
      )}
    </div>
  );
};

export default BgRemover;
