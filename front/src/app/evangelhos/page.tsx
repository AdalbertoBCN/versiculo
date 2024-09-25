"use client";
import ChapterContent from "@/components/chapter-content";
import ListGuesses from "@/components/list-guesses";
import Spinner from "@/components/spinner";
import SubmitInput from "@/components/submit-input";
import { ThemeToggle } from "@/components/theme-toggle";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGameLogic } from "@/hooks/useGameLogic";
import { BookOpen, RotateCcw } from "lucide-react";
import Link from "next/link";

export default function Evangelhos() {
  const {
    randomChapter,
    selectedGuess,
    handleFormSubmit,
    setInputWord,
    inputWord,
    wordsGuess,
    wordsState,
    setSelectedGuess,
    handleReestart
  } = useGameLogic({ isGospel: true });

  return (
    <div className="flex flex-col h-screen relative">
      <header className="h-16 flex items-center justify-between px-4 bg-foreground/10 dark:bg-foreground/5">
        <Link href="/">
          <h1 className="text-lg">
            Versículo
            <BookOpen className="size-6 inline-block ml-2" />
          </h1>
        </Link>

        <h2 className="text-md font-semibold">
          Evangelhos
          <RotateCcw className="size-5 inline-block ml-2 cursor-pointer" onClick={handleReestart} />
        </h2>

        <ThemeToggle />
      </header>

      <main className="flex flex-1 overflow-hidden">
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex flex-col">
            <ScrollArea className="px-4 h-[calc(100vh-8rem)]">
              {randomChapter ? (
                <ChapterContent
                  randomChapter={randomChapter}
                  selectedGuess={selectedGuess}
                />
              ) : (
                <Spinner />
              )}
            </ScrollArea>
          </div>

          <footer className="static bottom-0 left-0 flex items-center justify-center bg-foreground/10 dark:bg-foreground/5 px-4 py-3">
            {randomChapter ? (
              <SubmitInput
                inputWord={inputWord}
                handleFormSubmit={handleFormSubmit}
                setInputWord={setInputWord}
                win={randomChapter.win}
              />
            ) : (
              <Spinner />
            )}
          </footer>
        </div>

        <aside className="w-48 bg-foreground/10 dark:bg-foreground/5">
          <ListGuesses
            wordsGuess={wordsGuess}
            setSelectedGuess={setSelectedGuess}
            wordsState={wordsState}
            selectedGuess={selectedGuess}
          />
        </aside>
      </main>
    </div>
  );
}
