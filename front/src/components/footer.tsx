import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface FooterProps {
  inputWord: string;
  setInputWord: (e: string) => void;
  handleFormSubmit: (e: FormData) => void;
  win: undefined | boolean;
}

export const Footer = ({ inputWord, win, handleFormSubmit, setInputWord }: FooterProps) => (
  <footer className="w-full bg-foreground/10 sticky bottom-0 z-10 p-4">
          {" "}
          {/* Footer fixo embaixo */}
          {!win ? (
            <form
              action={async (form) => handleFormSubmit(form)}
              className="w-max flex m-auto gap-x-2"
            >
              <Input
                placeholder="Escreva uma palavra..."
                name="word"
                value={inputWord}
                onChange={(e) => setInputWord(e.target.value)}
              />

              <Button type="submit" size="icon" className="w-14 spect-square">
                <Send className="size-4" />
              </Button>
            </form>
          ) : (
            <div className="flex justify-center">
              <span>Você ganhou!</span>
            </div>
          )}
        </footer>
);
