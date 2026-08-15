export default function PortfolioVideo({ id }: { id: string }) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const videoUrl = `https://res.cloudinary.com/${cloudName}/video/upload/v1786745203/${id}.mp4`;

  return (
    <div className="h-full min-w-full overflow-hidden">
      <video
        className="h-full w-full object-contain"
        controls
        playsInline
        preload="none"
        
        poster={`https://res.cloudinary.com/${cloudName}/video/upload/so_0.5/v1786745203/${id}.jpg`}
        src={videoUrl}
      />
    </div>
  );
}