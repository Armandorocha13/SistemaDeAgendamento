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
        <div className="relative size-10 overflow-hidden rounded-full border border-primary/20">
          <Image
            src="/fotos/logoJu.jpeg"
            alt="Logo The Nails By Julien"
            fill
            className="object-cover"
          />
        </div>
        <h2 className="font-bold text-lg">The Nails By Julien</h2>
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
