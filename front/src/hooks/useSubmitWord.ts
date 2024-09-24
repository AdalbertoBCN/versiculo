import { useFormState } from "react-dom";
import { submitWord as actionSubmitWord } from "@/app/(actions)/submit-word";

export function useSubmitWord() {
  const [wordsState, submitWord] = useFormState(actionSubmitWord, null);

  const handleFormSubmit = async (formData: FormData, fetchChapterData: () => Promise<void>) => {
    await submitWord(formData);
    fetchChapterData();
  };

  return { wordsState, handleFormSubmit };
}
  