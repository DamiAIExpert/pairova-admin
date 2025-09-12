"use client";

import React, { useState } from "react";
import NextImage, { ImageProps as NextImageProps } from "next/image";

/**
 * SafeImage renders next/image in production,
 * but if the optimizer fails (sandbox/preview), it falls back to a plain <img>.
 */
export type SafeImageProps = NextImageProps & { fallbackSrc?: string };

export default function SafeImage({
  fallbackSrc = "/fallback.png",
  onError,
  ...props
}: SafeImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    // width/height are required for layout to stay stable
    const { alt, className, width, height, src } = props;
    const resolvedSrc =
      typeof src === "string" ? src : (src as any)?.src ?? fallbackSrc;

    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={resolvedSrc as string}
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
