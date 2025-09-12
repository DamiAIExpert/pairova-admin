// src/components/SafeImage.tsx
"use client";

import React, { useState } from "react";
import NextImage, {
  ImageProps as NextImageProps,
  type StaticImageData,
} from "next/image";

export type SafeImageProps = NextImageProps & { fallbackSrc?: string };

// Helper to resolve Next.js image src without `any`
function resolveSrc(src: SafeImageProps["src"]): string {
  if (typeof src === "string") return src;
  // Static imports have a `src` field
  const s = src as StaticImageData;
  return s.src;
}

export default function SafeImage({
  fallbackSrc = "/logo.svg",
  onError,
  ...props
}: SafeImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    const { alt, className, width, height, src } = props;
    const resolvedSrc = resolveSrc(src) || fallbackSrc;

    return (
      <img
        src={resolvedSrc}
        alt={alt ?? ""}
        className={className}
        width={Number(width) || 1}
        height={Number(height) || 1}
      />
    );
  }

  return (
    <NextImage
      {...props}
      onError={(e) => {
        setFailed(true);
        onError?.(e);
      }}
    />
  );
}
