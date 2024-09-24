import { useEffect, useState } from "react";
import { fetchRandomChapter } from "@/app/(actions)/get-random-chapter";
import { getWordsGuess } from "@/app/(actions)/get-words-guess";
import { CensorChapter, WordsGuess } from "@/types";

export function useChapter() {
  const [randomChapter, setRandomChapter] = useState<
    (CensorChapter & { win?: boolean }) | null
  >(null);
  const [wordsGuess, setWordsGuess] = useState<WordsGuess | null>(null);

  const fetchChapter = async () => {
    const [chapter, guessedWords] = await Promise.all([
      fetchRandomChapter(),
      getWordsGuess(),
    ]);
    setRandomChapter(chapter);
    setWordsGuess(guessedWords);
  };

  useEffect(() => {
    fetchChapter();
  }, []);

  return { randomChapter, wordsGuess, fetchChapter };
}
