import { CldVideoPlayer } from 'next-cloudinary';


export default function PortfolioVideo({id}:{id:string}) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const videoUrl = `https://res.cloudinary.com/${cloudName}/video/upload/v1786745203/${id}.mp4`;
  return (
    <>
      <div className=" overflow-hidden min-w-full h-full">
 <video
        // ref={videoRef}
        className=" w-full h-full object-contain"
        controls
        autoPlay
        src={videoUrl}
      
      >

      </video>
      </div>
    </>
  );
}