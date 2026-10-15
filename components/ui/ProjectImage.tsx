"use client";

import { CldImage } from "next-cloudinary";
import type { ComponentProps } from "react";

// Resolve the cloud from the full asset URL rather than the site's default cloud.
export default function ProjectImage(props: ComponentProps<typeof CldImage>) {
  const cloudName = props.src.match(/^https:\/\/res\.cloudinary\.com\/([^/]+)\//)?.[1];
  return <CldImage {...props} config={cloudName ? { cloud: { cloudName } } : props.config} />;
}
