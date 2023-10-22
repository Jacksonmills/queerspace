import React from "react";
import RotatingEmoji from "./RotatingEmoji";

export default function Logo() {
  return (
    <h1 className="flex  items-center gap-2 text-5xl font-extrabold tracking-tight sm:text-[5rem]">
      <span className="inline-flex flex-col md:flex-row">
        Queer<span className="text-[hsl(280,100%,70%)]">Space</span>
      </span>
      <RotatingEmoji emoji={["🌎", "🌍", "🌏"]} />
    </h1>
  );
}
