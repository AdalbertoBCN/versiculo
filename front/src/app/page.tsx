import { BadgeAleatorio } from "@/components/badge-aleatorio";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen flex gap-2 items-center justify-center">
      <div className="absolute top-2 left-2"> 
        <ThemeToggle />
      </div>
      <Link href="/aleatorio">
        <Button className="text-background h-[10vh] w-[35vw] text-xl">
          <span className="text-purple-800">Ale</span>
          <span className="text-destructive dark:brightness-75">at</span>
          <span className="text-success">óri</span>
          <span className="text-purple-800">o</span>
        </Button>
      </Link>
      <Link href="/evangelhos">
        <Button className="h-[10vh] w-[35vw]">
          <span className="text-lg text-success dark:brightness-100 brightness-75">
            Evangelhos
          </span>
        </Button>
      </Link>
    </main>
  );
}
