import { PDFDocument } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.mjs',
  import.meta.url
).toString();

// Merge PDFs
export async function mergePdfFiles(files) {
  if (!files || files.length < 2) {
    throw new Error('Please select at least two PDF files to merge.');
  }

  const mergedPdf = await PDFDocument.create();

  for (let file of files) {
    const pdfBytes = await file.arrayBuffer();
    const pdf = await PDFDocument.load(pdfBytes);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  const mergedPdfBytes = await mergedPdf.save();
  const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
  return URL.createObjectURL(blob);
}

// Split PDF
export async function splitPdfFiles(file) {
  if (!file || file.type !== 'application/pdf') {
    throw new Error('Please upload a valid PDF file.');
  }

  const result = [];
  const pdfBytes = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const totalPages = pdfDoc.getPageCount();

  for (let i = 0; i < totalPages; i++) {
    const newPdf = await PDFDocument.create();
    const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
    newPdf.addPage(copiedPage);

    const newPdfBytes = await newPdf.save();
    const blob = new Blob([newPdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    result.push({ name: `page-${i + 1}.pdf`, url });
  }

  return result;
}

// Convert PDF to Images
export async function convertPdfToImages(file) {
  if (!file || file.type !== 'application/pdf') {
    throw new Error('Please upload a valid PDF file.');
  }

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const pageCount = pdf.numPages;

  const imageUrls = [];

  for (let i = 1; i <= pageCount; i++) {
    const page = await pdf.getPage(i);

    const viewport = page.getViewport({ scale: 2 }); // Increase scale for better quality
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({
      canvasContext: context,
      viewport,
    }).promise;

    const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
    const url = URL.createObjectURL(blob);
    imageUrls.push({ name: `page-${i}.png`, url });
  }

  return imageUrls;
}
