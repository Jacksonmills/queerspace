'use client';

import { useCallback, useEffect, useState } from "react";


export default function RotatingPlanet() {
  const [rotation, setRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const emoji = ['🌎', '🌍', '🌏'];
  const rotationsNeeded = emoji.length * 2;

  const createRotationInterval = useCallback(() => {
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setRotation((r) => (r + 1) % emoji.length);
      if (count >= rotationsNeeded) clearInterval(interval);
    }, 500);
    return interval;
  }, [emoji.length, rotationsNeeded]);

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
      className='rotate-6 hover:cursor-cell'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {emoji[rotation]}
    </span>
  );
};