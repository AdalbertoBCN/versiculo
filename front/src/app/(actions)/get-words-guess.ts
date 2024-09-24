"use server"
import { getwordsGuessCookieName } from "@/lib/utils";
import { cookies as useCookies } from "next/headers"

export async function getWordsGuess(isGospel: boolean) {
    const cookies = useCookies();

    const wordsGuessCookieName = getwordsGuessCookieName(isGospel);

    const wordsGuess = cookies.get(wordsGuessCookieName)?.value

    return wordsGuess ? JSON.parse(wordsGuess) : {}
}
