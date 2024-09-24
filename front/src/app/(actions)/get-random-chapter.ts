"use server"
import { decrypt, encrypt } from "@/lib/crypto";
import { censorChapterContent, getchapterCookieName, getwordsGuessCookieName, whiteSquare } from "@/lib/utils";
import type { CensorChapter, CurrentRandomChapter, GetRandomChapterResponse } from "@/types";
import { cookies as useCookies } from "next/headers";

export async function fetchRandomChapter(isGospel: boolean): Promise<CensorChapter & { win?: boolean }> {
  const cookies = useCookies();
  const chapterCookieName = getchapterCookieName(isGospel);
  const wordsGuessCookieName = getwordsGuessCookieName(isGospel);

  const storedChapter = cookies.get(chapterCookieName);

  if (!storedChapter) {

    const randomChapter: GetRandomChapterResponse = await fetch(`http://localhost:3333/random-chapter${isGospel ? "?isGospel=true" : ""}`).then(res => res.json());

    const encryptedChapter = encrypt({ 
      bookNumber: randomChapter.bookNumber, 
      chapterNumber: randomChapter.chapterNumber 
    });

    cookies.set(chapterCookieName, encryptedChapter, { maxAge: 60 * 60 * 24 * 7 });

    return censorChapterContent(randomChapter);
  }   

  const wordsGuess = cookies.get(wordsGuessCookieName)?.value;
  const decryptedChapter: CurrentRandomChapter = decrypt(storedChapter.value, "json");

  console.log(decryptedChapter)

  const chapterData: GetRandomChapterResponse = await fetch(
    `http://localhost:3333/chapters/${decryptedChapter.bookNumber}/${decryptedChapter.chapterNumber}`
  ).then(res => res.json());

  const { bookName, chapterNumber, verses, countWordsGuess, win } = censorChapterContent(chapterData, wordsGuess);

  cookies.set(wordsGuessCookieName, JSON.stringify(countWordsGuess), { maxAge: 60 * 60 * 24 * 7 });

  return {
    bookName, 
    chapterNumber,
    verses,
    win
  };
}
