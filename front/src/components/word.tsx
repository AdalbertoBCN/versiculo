"use client";

import { cn, whiteSquare } from "@/lib/utils";
import { useState } from "react";

interface WordProps {
  word: string;
  index: number;
  selectedGuess: string | null;
}

export default function Word({ word, index, selectedGuess }: WordProps) {
    const [showSize, setShowSize] = useState(false);

    function handleWordClick() {
      setShowSize(!showSize);
    }

  return (
    <>
      {index % 2 === 0 ? (
        <span
          data-size={word.length}
          className={cn("relative text-md", {
            "before:content-[attr(data-size)] before:absolute before:text-sm before:top-0.5 before:left-0.5  before:text-background before:font-normal before:tracking-tight before:font-mono":
              showSize && word.includes(whiteSquare),
              "cursor-pointer": word.includes(whiteSquare),
            "after:absolute after:bg-success/50 after:dark:bg-success/65 after:top-0 after:left-0 after:w-full after:h-full after:-z-10 after:scale-110 rounded-md ":
              selectedGuess?.toLocaleLowerCase() === word.toLocaleLowerCase(),
          })}
          onClick={handleWordClick}
        >
          {word}
        </span>
      ) : (
        <>{word}</>
      )}
    </>
  );
}
