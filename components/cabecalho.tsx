import { BotMessageSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "./ui/button";
import MenuSheet from "./menu";

// Cabeçalho principal da aplicação
const Cabecalho = () => {
  return (
    <header className="bg-background flex items-center justify-between px-5 py-6">
      <Link href="/" className="flex items-center gap-2">
        <div className="relative h-10 w-10 overflow-hidden">
          <Image
            src="/logo.png"
            alt="Logo The Nails By Julien"
            fill
            className="object-contain"
          />
        </div>
        <div className="flex items-baseline gap-2">
          <h2 className="font-bold text-base md:text-lg leading-none font-safira tracking-tight">The Nails</h2>
          <span className="font-signature text-primary text-[1.2rem] leading-none drop-shadow-sm">By Julien</span>
        </div>
      </Link>
      <div className="flex items-center gap-2">
        <Link href="/chat">
          <Button variant="outline" size="icon">
            <BotMessageSquare className="size-5" />
          </Button>
        </Link>
        <MenuSheet />
      </div>
    </header>
  );
};

export default Cabecalho;
