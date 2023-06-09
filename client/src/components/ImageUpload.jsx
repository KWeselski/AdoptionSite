import React, { useState } from 'react';
import Resizer from 'react-image-file-resizer';

import { styles } from '../styles';

const ImageUpload = ({ onFileSelect }) => {
  const [previewUrl, setPreviewUrl] = useState('');
  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        720,
        720,
        'JPEG',
        80,
        0,
        (uri) => {
          resolve(uri);
        },
        'base64'
      );
    });

  const fileSelectHandler = async (e) => {
    setPreviewUrl(URL.createObjectURL(e.target.files[0]));
    const image = await resizeFile(e.target.files[0]);
    onFileSelect(image);
  };

  return (
    <div className={`${styles.flexCenter} flex-col mt-10 gap-5`}>
      <input type="file" onChange={fileSelectHandler} />
      {previewUrl && <img src={previewUrl} alt="Preview" width="200px" />}
    </div>
  );
};

export default ImageUpload;
