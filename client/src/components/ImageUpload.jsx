import React, { useState } from 'react';

const ImageUpload = ({ onFileSelect }) => {
  const [previewUrl, setPreviewUrl] = useState('');

  const fileSelectHandler = (e) => {
    setPreviewUrl(URL.createObjectURL(e.target.files[0]));
    onFileSelect(e.target.files[0]);
  };

  return (
    <div className='mt-10 flex flex-col items-center justify-center gap-5'>
      <input type="file" onChange={fileSelectHandler}  />
      {previewUrl && <img src={previewUrl} alt="Preview" width="200px" />}
    </div>
  );
};

export default ImageUpload;