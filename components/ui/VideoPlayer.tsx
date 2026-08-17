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
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div
        className="
          relative
          aspect-video
          w-full
          max-w-[95%]
          overflow-hidden
          rounded-xl
          md:max-h-[92%]
          md:max-w-[92%]
        "
      >
        <CldVideoPlayer
          id={id}
          src={id}
          poster={mainImage}
          width={1280}
          height={720}
          className="m-0! h-full! w-full!"
          colors={{
            base: "#fff",
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