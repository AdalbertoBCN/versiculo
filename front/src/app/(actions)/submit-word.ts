"use server"

import { allWords } from "@/lib/allWords";
import { getwordsGuessCookieName, raise } from "@/lib/utils";
import { WordsGuess } from "@/types";
import { cookies as useCookies } from "next/headers";
import { z } from "zod";

const wordsGuessCookieName = getwordsGuessCookieName(false);

// Validação do formulário
const wordSchema = z.object({
    word: z.string().trim().min(1, { message: "",}).regex(/[^\w\sÀ-ÿ]/ig, { message: "Não conta" })
    .refine(value => !allWords.includes(value.toLowerCase()), { message: "Não conta" })
    .refine(value => {
        const cookies = useCookies();
        const words = value.toLowerCase().split(/\s+/);

        let wordsGuess:WordsGuess = JSON.parse(cookies.get(wordsGuessCookieName)?.value ?? "{}");

        const success = words.every(word => !Object.keys(wordsGuess).includes(word));

        if (!success) {
            words.forEach(word => {
                wordsGuess = raise(wordsGuess, word);
            });
            cookies.set(wordsGuessCookieName, JSON.stringify(wordsGuess), { maxAge: 60 * 60 * 24 * 7 });
        }

        return words.every(word => !Object.keys(wordsGuess).includes(word));
    }, { message: "Você já tentou essa palavra" })
});

// Função para enviar uma palavra
export async function submitWord(_:unknown, formData: FormData) {
    const parsedData = wordSchema.safeParse(Object.fromEntries(formData));
    if (!parsedData.success) {
        return {
            error: { message: parsedData.error.flatten().fieldErrors.word }
        };
    }

    const cookies = useCookies();
    const storedWordsGuess = cookies.get(wordsGuessCookieName);
    const words = parsedData.data.word.toLowerCase().split(/\s+/);

    let wordsGuess: WordsGuess = storedWordsGuess ? JSON.parse(storedWordsGuess.value) : {};

    words.forEach(word => {
        wordsGuess[word] = 0;
    });

    cookies.set(wordsGuessCookieName, JSON.stringify(wordsGuess), { maxAge: 60 * 60 * 24 * 7 });
}
