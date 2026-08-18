"use client";

import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";

interface PortfolioVideoProps {
  id: string;
  mainImage: string;
}

export default function PortfolioVideo({
  id,
  mainImage,
}: PortfolioVideoProps) {
  console.log("id: "+id )
  console.log("mainImage: "+  mainImage)
  return (
    <div className="flex ">
      <div
        className="
          relative
          aspect-video
          w-full
          rounded-xl
          "
      >
        <CldVideoPlayer
          id={id}
          src={id}
          poster={mainImage}
         
          className="h-full w-full object-contain"
          colors={{
            base: "#3b1656",
            accent: "#3b1656",
          }}
          transformation={{
            videoCodec: "auto",
            quality: "auto",
          }}
        />
      </div>
    </div>
    
  );
}

