"use client";

import { deleteCookies } from "@/app/(actions)/delete-cookies";
import { fetchRandomChapter } from "@/app/(actions)/get-random-chapter";
import { getWordsGuess } from "@/app/(actions)/get-words-guess";
import { submitWordGospel as actionSubmitWord } from "@/app/(actions)/submit-word-gospel";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import ListWordsGuess from "@/components/list-words-guess";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import WordDisplay from "@/components/word";
import { transparentSquare } from "@/lib/utils";
import { CensorChapter, WordsGuess } from "@/types";
import { Send } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

export default function Evangelhos() {
  const [randomChapter, setRandomChapter] = useState<
    (CensorChapter & { win?: boolean }) | null
  >(null);
  const [wordsGuess, setWordsGuess] = useState<WordsGuess | null>(null);
  const [inputWord, setInputWord] = useState<string>("");
  const [selectedGuess, setSelectedGuess] = useState<string | null>(null);
  const [wordsState, submitWord] = useFormState(actionSubmitWord, null);

  const fetchChapterData = async () => {
    const [chapter, guessedWords] = await Promise.all([
      fetchRandomChapter(true),
      getWordsGuess(true),
    ]);
    setRandomChapter(chapter);
    setWordsGuess(guessedWords);
  };

  useEffect(() => {
    fetchChapterData();
  }, []);

  const handleFormSubmit = async (formData: FormData) => {
    await submitWord(formData);
    fetchChapterData();
    setInputWord("");
    setSelectedGuess(formData.get("word")?.toString() ?? "");
  };

  const handleReestart = async () => {
    setRandomChapter(null);
    setWordsGuess(null);
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    await deleteCookies(true);
    await fetchChapterData();
    setSelectedGuess(null);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex-grow flex flex-col overflow-hidden">
        {" "}
        {/* Container principal */}
        <Header randomChapter={randomChapter} handleReestart={handleReestart} />
        <main className="flex-1 overflow-y-auto px-4 pb-5 pt-2">
          {randomChapter?.win && (
            <div className="w-[95%] mb-4 rounded-sm mx-auto flex flex-col items-center justify-center bg-success/80 text-background font-semibold h-28">
              <h3>Você ganhou!</h3>
            </div>
          )}{" "}
          {/* Main com scroll e largura máxima */}
          {randomChapter && (
            <div>
              <div className="mb-4 text-lg">
                {randomChapter.bookName.map((word, index) => (
                  <WordDisplay
                    selectedGuess={selectedGuess}
                    word={word}
                    index={index}
                    key={word.concat(index.toString())}
                  />
                ))}
                {transparentSquare}
                <WordDisplay
                  word={randomChapter.chapterNumber}
                  selectedGuess={selectedGuess}
                  index={0}
                />
              </div>
              <div>
                {randomChapter.verses.map((verse, upIndex) => (
                  <p
                    key={String(verse.concat(upIndex.toString()))}
                    data-verse={`${String(upIndex).padStart(2, "0")}.`}
                    className="flex flex-wrap items-start text-md tracking-tight leading-snug before:content-[attr(data-verse)] before:font-normal before:tracking-tight before:font-mono before:text-sm ml-8 before:-translate-x-8 before:absolute relative"
                  >
                    {verse.map((word, index) => (
                      <WordDisplay
                        word={word}
                        index={index}
                        key={word.concat(index.toString())}
                        selectedGuess={selectedGuess}
                      />
                    ))}
                  </p>
                ))}
              </div>
            </div>
          )}
        </main>
        <Footer handleFormSubmit={handleFormSubmit} 
          inputWord={inputWord}
          setInputWord={setInputWord}
          win={randomChapter?.win}
        />
      </div>

      <aside className="w-full max-w-52 ml-auto bg-foreground/10">
        <ListWordsGuess
          wordsGuess={wordsGuess}
          setSelectedGuess={setSelectedGuess}
          selectedGuess={selectedGuess}
          wordsState={wordsState}
        />
      </aside>
    </div>
  );
}
