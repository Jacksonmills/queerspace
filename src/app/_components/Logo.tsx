import React from "react";
import RotatingEmoji from "./RotatingEmoji";

export default function Logo() {
  return (
    <h1 className="flex text-5xl font-extrabold tracking-tight sm:text-[5rem]">
      Queer<span className="text-[hsl(280,100%,70%)]">Space</span>
      <RotatingEmoji emoji={["🌎", "🌍", "🌏"]} />
    </h1>
  );
}
