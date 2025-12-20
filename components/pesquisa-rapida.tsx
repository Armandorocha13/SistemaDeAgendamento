"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { RolagemSecao } from "./ui/page";
import { Sparkles, Hand, Paintbrush, Droplets } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SearchIcon } from "lucide-react";

// Componente de pesquisa rápida
const PesquisaRapida = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!searchValue.trim()) return;
    router.push(`/barbershops?search=${encodeURIComponent(searchValue.trim())}`);
  };

  return (
    <>
      <form onSubmit={handleSearch} className="flex items-center gap-2">
        <Input
          className="border-border rounded-full"
          placeholder="Pesquisar"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button type="submit" className="h-10 w-10 rounded-full">
          <SearchIcon />
        </Button>
      </form>
      <RolagemSecao>
        <Link
          href="/barbershops?search=manutenção%20de%20gel"
          className="border-border bg-card-background flex shrink-0 items-center justify-center gap-3 rounded-3xl border px-4 py-2"
        >
          <Hand className="size-4" />
          <span className="text-card-foreground text-sm font-medium">
            Manutenção de Gel
          </span>
        </Link>

        <Link
          href="/barbershops?search=esmaltação%20em%20gel"
          className="border-border bg-card-background flex shrink-0 items-center justify-center gap-3 rounded-3xl border px-4 py-2"
        >
          <Paintbrush className="size-4" />
          <span className="text-card-foreground text-sm font-medium">
            Esmaltação em Gel
          </span>
        </Link>

        <Link
          href="/barbershops?search=banho%20de%20gel"
          className="border-border bg-card-background flex shrink-0 items-center justify-center gap-3 rounded-3xl border px-4 py-2"
        >
          <Droplets className="size-4" />
          <span className="text-card-foreground text-sm font-medium">
            Banho de Gel
          </span>
        </Link>

        <Link
          href="/barbershops?search=cuticulagem"
          className="border-border bg-card-background flex shrink-0 items-center justify-center gap-3 rounded-3xl border px-4 py-2"
        >
          <Sparkles className="size-4" />
          <span className="text-card-foreground text-sm font-medium">
            Cuticulagem
          </span>
        </Link>
      </RolagemSecao>
    </>
  );
};

export default PesquisaRapida;
