"use server"
import { getchapterCookieName, getwordsGuessCookieName } from "@/lib/utils";
import { cookies as useCookies } from "next/headers"

export async function deleteCookies(isGospel: boolean) {
    const cookies = useCookies();

    const chapterCookieName = getchapterCookieName(isGospel);
    const wordsGuessCookieName = getwordsGuessCookieName(isGospel);

    cookies.delete(chapterCookieName);
    cookies.delete(wordsGuessCookieName);
}