'use client'
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { FileUp, Check, XCircle } from 'lucide-react';

const FileUpload = () => {
  const [uploadStatus, setUploadStatus] = useState<string>('');

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    try {
      setUploadStatus('uploading');
      const formData = new FormData();
      formData.append('file', file);
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadStatus('success');
      setTimeout(() => setUploadStatus(''), 2000);
    } catch (error) {
      console.error('Upload failed:', error);
      setUploadStatus('error');
      setTimeout(() => setUploadStatus(''), 2000);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: false
  });

  const getIconAndText = () => {
    switch (uploadStatus) {
      case 'uploading':
        return (
          <>
            <FileUp className="animate-bounce" />
            <span className="ml-2">Uploading...</span>
          </>
        );
      case 'success':
        return (
          <>
            <Check />
            <span className="ml-2">Success!</span>
          </>
        );
      case 'error':
        return (
          <>
            <XCircle className="text-red-600" />
            <span className="ml-2">Failed</span>
          </>
        );
      default:
        return (
          <>
            <FileUp />
            <span className="ml-2">Upload</span>
          </>
        );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div
        {...getRootProps()}
        className={`
          px-6 h-12 rounded-lg
          bg-[#ebcc90] hover:bg-[#e0b97a]
          flex items-center justify-center
          cursor-pointer transition-all duration-300
          shadow-lg hover:shadow-xl
          ${isDragActive ? 'scale-105' : 'scale-100'}
        `}
      >
        <input {...getInputProps()} />
        <div className="text-white flex items-center font-medium">
          {getIconAndText()}
        </div>
      </div>

      {isDragActive && (
        <p className="text-sm font-medium text-gray-600">
          Drop the PDF here...
        </p>
      )}

      {uploadStatus === 'error' && (
        <p className="text-sm font-medium text-red-600">
          Upload failed. Please try again.
        </p>
      )}
    </div>
  );
};

export default FileUpload;
