import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const Tools = {
    Pdf_merge: {
      Name: 'PDF Merge',
      Icon: '📎',
      Desc: 'Merge multiple PDF files into one.',
      Link: '/pdf-merge'
    },
    Pdf_split: {
      Name: 'PDF Split',
      Icon: '✂️',
      Desc: 'Split a PDF into separate pages.',
      Link: '/pdf-split'
    },
    Image_bg_remover: {
      Name: 'Background Remover',
      Icon: '🪄',
      Desc: 'Remove background from images using AI.',
      Link: '/bg-remover'
    },
    Image_format_changer: {
      Name: 'Format Converter',
      Icon: '🔄',
      Desc: 'Convert between JPG, PNG, and SVG formats.',
      Link: '/format-converter'
    },
    Image_enhancer: {
      Name: 'Image Enhancer',
      Icon: '✨',
      Desc: 'Improve image clarity using AI upscaling.',
      Link: '/image-enhancer'
    },
    Image_to_pdf: {
      Name: 'Image to PDF',
      Icon: '🖼️📄',
      Desc: 'Convert images into a single PDF.',
      Link: '/image-to-pdf'
    },
    Pdf_to_image: {
      Name: 'PDF to Image',
      Icon: '📄🖼️',
      Desc: 'Convert PDF pages to images.',
      Link: '/pdf-to-image'
    }
  };

  return (
    <div className="px-4 md:px-12 py-6">
      <h2 className="text-3xl font-medium text-zinc-400 mb-8">🔨 Select a tool from the following:</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Object.keys(Tools).map((key) => {
          const tool = Tools[key];
          return (
            <Link to={tool.Link} key={key}>
              <div className="p-6 bg-white/5 border border-white/10 rounded-xl shadow-md backdrop-blur-[10px] hover:bg-white/10 transition duration-200">
                <div className="text-4xl mb-2">{tool.Icon}</div>
                <h3 className="text-xl font-semibold text-white mb-1">{tool.Name}</h3>
                <p className="text-sm text-zinc-400">{tool.Desc}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
