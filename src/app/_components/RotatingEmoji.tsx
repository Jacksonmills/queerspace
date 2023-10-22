"use client";

import { useCallback, useEffect, useState } from "react";

const initialEmoji = ["🌎", "🌍", "🌏"];

export default function RotatingEmoji({
  emoji = initialEmoji,
}: {
  emoji: string[];
}) {
  const [rotation, setRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const rotationsNeeded = emoji.length * 2;
  const rotationSpeed = emoji.length * 100;

  const createRotationInterval = useCallback(() => {
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setRotation((r) => (r + 1) % emoji.length);
      if (count >= rotationsNeeded) clearInterval(interval);
    }, rotationSpeed);
    return interval;
  }, [emoji.length, rotationSpeed, rotationsNeeded]);

  useEffect(() => {
    const interval = createRotationInterval();
    return () => clearInterval(interval);
  }, [createRotationInterval]);

  useEffect(() => {
    if (isHovered) {
      const interval = createRotationInterval();
      return () => clearInterval(interval);
    }
  }, [createRotationInterval, isHovered]);

  return (
    <span
      className="rotate-6 hover:cursor-move"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {emoji[rotation]}
    </span>
  );
}
