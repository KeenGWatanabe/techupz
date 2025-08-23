'use client';

const ImageUpload = () => {
  return (
    <div>
      <h2>Upload your images</h2>
      <input type="file" multiple accept="image/*" />
    </div>
  );
};

export default ImageUpload;
