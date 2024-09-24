import { CensorChapter, GetRandomChapterResponse, WordsGuess } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { allWords } from "./allWords";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const transparentSquare = "⠀";
export const whiteSquare = "█";;

export const getchapterCookieName = (isGospel:boolean) => isGospel ? "current-random-chapter-gospel" : "current-random-chapter";
export const getwordsGuessCookieName = (isGospel:boolean) => isGospel ? "words-guess-gospel" : "words-guess";

export function raise<T, K extends keyof T>(obj:T, key:K) {

  const { [key]: raisedValue, ...rest } = obj;

  return {
    [key]: raisedValue,
    ...rest
  };
}

export function censorChapterContent(randomChapter: GetRandomChapterResponse, wordsGuess?: string): CensorChapter & { countWordsGuess: WordsGuess, win?: boolean } {
  const wordBoundaryRegex = /([^\u00BF-\u1FFF\u2C00-\uD7FF\w\n\r]*)?([\u00BF-\u1FFF\u2C00-\uD7FF\w]+)([^\u00BF-\u1FFF\u2C00-\uD7FF\w\n\r]*)/ig;
  const separatorRegex = /(\s+)/g;
  const nonWordCharacterRegex = /[^\w\s.,:\(\)!?çáéíóúàèìòùâêîôûãõäëïöüñÁÉÍÓÚÀÈÌÒÙÂÊÎÔÛÃÕÄËÏÖÜÑ]/g
  
  const wordsGuessParsed: WordsGuess = JSON.parse(wordsGuess || "{}");
  
  // zeroing all words
  Object.keys(wordsGuessParsed).forEach((key) => {
    wordsGuessParsed[key] = 0;
  });
  
  // array of keys to lowercase
  const wordsGuessArrayKeys = Object.keys(wordsGuessParsed).map((key) => key.toLowerCase());
  
  randomChapter.bookName = randomChapter.bookName.replace(nonWordCharacterRegex, "");
  randomChapter.bookName = randomChapter.bookName.replace(separatorRegex, transparentSquare);

  const matches = [...randomChapter.bookName.matchAll(wordBoundaryRegex) as any];
  
  const censuredTitle: string[] = [];
  
  console.log(matches)

  matches.forEach((match) => {
    if (match[1]) censuredTitle.push(match[1]);
      if (match[2]) {
        const word = match[2].toLowerCase();
        if (allWords.includes(word)) {
          censuredTitle.push(match[2]);
        }else if(wordsGuessArrayKeys.includes(word)){
          censuredTitle.push(match[2]);
            wordsGuessParsed[word] += 1;
        }
        else {
          censuredTitle.push(whiteSquare.repeat(match[2].length));
        }
      }
      if (match[3]) censuredTitle.push(match[3]);
  });
  
  const chapterNumberStr = randomChapter.chapterNumber.toString();
  const cesoredNumber = !wordsGuessArrayKeys.includes(chapterNumberStr.toLowerCase())
    ? whiteSquare.repeat(chapterNumberStr.length)
    : chapterNumberStr;

  if (wordsGuessArrayKeys.includes(chapterNumberStr.toLowerCase())) {
    wordsGuessParsed[chapterNumberStr.toLowerCase()] += 1;
  }

  const win = !censuredTitle.join("").concat(cesoredNumber).includes(whiteSquare);

  const censuredVerses = randomChapter.verses?.map((verse) => {
    verse.text = verse.text.replace(nonWordCharacterRegex, "");
    verse.text = verse.text.replace(separatorRegex, transparentSquare);

    const matches = [...verse.text.matchAll(wordBoundaryRegex) as any];

    const result: string[] = [];

    matches.forEach((match) => {
      if (match[1]) result.push(match[1]);
      if (match[2]) {
        const word = match[2].toLowerCase();
        if (allWords.includes(word)) {
            result.push(match[2]);
        }else if(wordsGuessArrayKeys.includes(word) || win){
            result.push(match[2]);
            if(!win)
            wordsGuessParsed[word] += 1;
        }
        else {
          result.push(whiteSquare.repeat(match[2].length));
        }
      }
      if (match[3]) result.push(match[3]);
    });

    return result;
  });

  return {
    bookName: censuredTitle,
    chapterNumber: cesoredNumber,
    verses: censuredVerses,
    countWordsGuess: wordsGuessParsed,
    win
  };
}