import React, { useState } from 'react';

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && ['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
      setSelectedFile(file);
    } else {
      alert('Please upload a valid image file (jpg, png, or gif).');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add the logic for file upload
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept=".jpg,.jpeg,.png,.gif" onChange={handleFileChange} />
      {selectedFile && <p>{selectedFile.name}</p>}
      <button type="submit">Upload</button>
    </form>
  );
};

export default ImageUpload;
