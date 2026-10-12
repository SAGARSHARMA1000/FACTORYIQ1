import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, Loader2 } from 'lucide-react';
import { uploadDocument } from '../api/client.js';

export default function UploadDropzone({ onUploaded }) {
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      setUploading(true);
      try {
        for (const file of acceptedFiles) {
          await uploadDocument(file);
        }
        onUploaded?.();
      } catch (err) {
        alert('Upload failed: ' + (err.response?.data?.message || err.message));
      } finally {
        setUploading(false);
      }
    },
    [onUploaded]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/csv': ['.csv'],
      'text/plain': ['.txt'],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
        isDragActive ? 'border-teal bg-teal/5' : 'border-tealDim/40 hover:border-teal/60'
      }`}
    >
      <input {...getInputProps()} />
      {uploading ? (
        <div className="flex flex-col items-center gap-2 text-gray-300">
          <Loader2 className="animate-spin text-teal" size={32} />
          <p>Uploading…</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 text-gray-300">
          <UploadCloud className="text-teal" size={32} />
          <p className="font-medium">
            {isDragActive ? 'Drop the files here…' : 'Drag & drop documents, or click to browse'}
          </p>
          <p className="text-xs text-gray-500">
            PDF, PNG, JPG, XLSX, DOCX, CSV, TXT — up to 25MB each
          </p>
        </div>
      )}
    </div>
  );
}
