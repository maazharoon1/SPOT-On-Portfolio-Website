"use client";

import { base } from "motion/react-client";
import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";

export default function PortfolioVideo({ id,mainImage }: { id: string , mainImage :string }) {
  return (
    <div className="flex h-full w-full items-center justify-center ">
      <div
        className="
          relative
          w-full
          max-w-[95%]
          overflow-hidden
          rounded-xl
          md:max-h-[92%]
          md:max-w-[92%]
          aspect-video
        "
      >
        <CldVideoPlayer
        id={id}
        poster={mainImage}
          src={id}
          width={1280}
          height={720}
          className="m-0! h-full! w-full!"
          colors={{
            base:"#fff",
            accent:"#3b1656",
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