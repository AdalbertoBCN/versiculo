import WordDisplay from "@/components/word";
import { transparentSquare } from "@/lib/utils";
import { CensorChapter } from "@/types";

interface ChapterDisplayProps {
  randomChapter: CensorChapter & { win?: boolean };
  selectedGuess: string | null;
}

export const ChapterDisplay = ({ randomChapter, selectedGuess }: ChapterDisplayProps) => (
  <>
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
          className="flex flex-wrap items-start text-md tracking-tight leading-snug font-mono before:content-[attr(data-verse)] before:font-normal before:tracking-tight before:font-mono before:text-sm ml-8 before:-translate-x-8 before:absolute relative"
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
  </>
);
