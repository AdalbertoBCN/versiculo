import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import Spinner from "@/components/spinner";
import { BookOpen, RotateCcwIcon } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
  randomChapter: any;
  handleReestart: () => void;
}

export const Header = ({ randomChapter, handleReestart }: HeaderProps) => {
  return (
    <header className="bg-background sticky top-0 z-10 px-2 py-1 flex">
          {" "}
          {/* Header fixo no topo */}
          <ThemeToggle />
          <div className="flex w-max m-auto items-center gap-1">
            <Link href="/">
              <div className="flex items-center gap-1">
                <BookOpen className="size-5 text-foreground" />
                <h1 className=" text-2xl font-semibold">Versículo</h1>
              </div>
            </Link>
            {randomChapter ? (
              <Button
                size="icon"
                className="bg-transparent hover:bg-foreground/10 rounded-full "
                onClick={handleReestart}
              >
                <RotateCcwIcon className="size-5 text-foreground" />
              </Button>
            ) : (
              <Spinner />
            )}
          </div>
        </header>
  );
};
