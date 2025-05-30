import { PDFDocument } from 'pdf-lib';


// image type conversion
export async function convertImageType(file, targetFormat = 'image/png') {
  if (!file || !file.type.startsWith('image/')) {
    throw new Error('Please upload a valid image file.');
  }

  const image = new Image();
  const url = URL.createObjectURL(file);

  return new Promise((resolve, reject) => {
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0);

      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Failed to convert image.'));
          return;
        }
        const resultUrl = URL.createObjectURL(blob);
        resolve(resultUrl);
      }, targetFormat);
    };

    image.onerror = () => reject(new Error('Failed to load image.'));
    image.src = url;
  });
}


// image to pdf
export async function convertImagesToPdf(files) {
  if (!files || files.length === 0) {
    throw new Error('Please upload one or more image files.');
  }

  const pdfDoc = await PDFDocument.create();

  for (const file of files) {
    if (!file.type.startsWith('image/')) continue;

    const imgBytes = await file.arrayBuffer();
    const image = await (
      file.type === 'image/jpeg'
        ? pdfDoc.embedJpg(imgBytes)
        : pdfDoc.embedPng(imgBytes)
    );

    const page = pdfDoc.addPage([image.width, image.height]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: image.width,
      height: image.height,
    });
  }

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  return URL.createObjectURL(blob);
}

// image clearity enhancer
export async function enhanceImage(file) {
  if (!file.type.startsWith('image/')) {
    throw new Error('Please upload a valid image file.');
  }

  const img = new Image();
  const imageURL = URL.createObjectURL(file);

  return new Promise((resolve, reject) => {
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.filter = 'contrast(110%) brightness(110%)'; // Basic enhancement
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((blob) => {
        if (!blob) return reject(new Error('Failed to enhance image.'));
        resolve(URL.createObjectURL(blob));
      }, 'image/png');
    };

    img.onerror = () => reject(new Error('Failed to load image.'));
    img.src = imageURL;
  });
}


