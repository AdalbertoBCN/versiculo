import { deleteCookies } from "@/app/(actions)/delete-cookies";

export const useRestart = (fetchChapterData: () => Promise<void>) => {
  const handleRestart = async () => {
    await deleteCookies();
    await fetchChapterData();
  };

  return { handleRestart };
};
