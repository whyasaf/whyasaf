"use client";

import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

interface LazyVideoProps {
  src: string;
  className?: string;
  muted?: boolean;
}

/**
 * Muted looping video that starts playing right away and never pauses.
 * A shimmer sits on top only until the first frame exists, so the parent must be `relative`.
 */
const LazyVideo = forwardRef<HTMLVideoElement, LazyVideoProps>(function LazyVideo(
  { src, className = "", muted = true },
  ref
) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  useImperativeHandle(ref, () => videoRef.current as HTMLVideoElement);

  // The video can be ready (or failed) before React attaches its handlers
  useEffect(() => {
    const video = videoRef.current;
    setReady(Boolean(video && (video.readyState >= 2 || video.error)));
  }, [src]);

  return (
    <>
      {!ready && <span className="skeleton absolute inset-0 z-[1]" aria-hidden="true" />}
      <video
        key={src}
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted={muted}
        playsInline
        onLoadedData={() => setReady(true)}
        onError={() => setReady(true)}
        className={className}
      />
    </>
  );
});

export default LazyVideo;
