"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * <img> with a shimmer placeholder until the file arrives.
 * The parent must be `relative` so the placeholder can fill it.
 */
export default function ShimmerImage(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  // A cached image can finish before React attaches onLoad
  useEffect(() => {
    setLoaded(Boolean(ref.current?.complete));
  }, [props.src]);

  return (
    <>
      {!loaded && <span className="skeleton absolute inset-0" aria-hidden="true" />}
      <img
        {...props}
        ref={ref}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
      />
    </>
  );
}
