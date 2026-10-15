"use client";

export default function CloudinaryPDFViewer({ publicId} : {publicId :string} ) {
  
  return (
   <div>
      <iframe
        src={publicId}
        width="100%"
        height="800"
      />
    </div>
  );
}