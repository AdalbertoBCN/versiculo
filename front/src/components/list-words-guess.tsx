"use client";
import type { WordsGuess } from "@/types";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Dispatch, SetStateAction } from "react";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";
import Spinner from "./spinner";

interface wordsError {
  error:{
        message: string[] | undefined;
      }
}

interface ListWordsGuessProps {
  wordsGuess: WordsGuess | null;
  setSelectedGuess: Dispatch<SetStateAction<string | null>>;
  selectedGuess: string | null;
  wordsState: wordsError | undefined | null;
}

export default function ListWordsGuess({
  wordsGuess,
  setSelectedGuess,
  selectedGuess,
  wordsState,
}: ListWordsGuessProps) {
  if (!wordsGuess) {
    return (
      <aside className="py-1 w-full flex flex-col">
        <Spinner />
      </aside>
    );
  }

  const guesses = Object.keys(wordsGuess).length;

  const wordsGuessArray = Object.entries(wordsGuess);

  return (
    <div className="py-1 w-full flex flex-col">
      <h2 className="font-medium w-max ml-2 mt-2  ">{guesses} Tentativas</h2>
      <Separator className="mt-2 w-full bg-foreground/40" />
      {wordsState?.error && (
        <div className="text-destructive py-2 flex items-center justify-center bg-destructive/25">
          {wordsState.error.message}
          </div>
      )}
      <ToggleGroup
        type="single"
        className="flex flex-col border-0"
        value={selectedGuess ?? ""}
        onValueChange={(wordGuess) => {
          setSelectedGuess(wordGuess || null);
        }}
      >
        {wordsGuessArray.map(([word, count]) => (
          <>
            <ToggleGroupItem
              className={cn(
                "flex px-3 text-md rounded-none hover:bg-foreground/10 hover:text-current/100 justify-between w-full data-[state=on]:bg-foreground/20 data-[state=on]:text-current/100",
                {
                  "text-destructive": count === 0,
                  "text-success": count > 0,
                }
              )}
              value={word.toLowerCase()}
              key={word}
            >
              <span>{word}</span>
              <span>{count}</span>
            </ToggleGroupItem>
            <Separator className="-m-1 w-full bg-foreground/40" />
          </>
        ))}
      </ToggleGroup>
    </div>
  );
}
