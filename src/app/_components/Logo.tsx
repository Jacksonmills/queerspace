import React from 'react';
import RotatingPlanet from './RotatingPlanet';

export default function Logo() {
  return (
    <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
      Queer<span className="text-[hsl(280,100%,70%)]">Space</span><RotatingPlanet />
    </h1>
  );
}


