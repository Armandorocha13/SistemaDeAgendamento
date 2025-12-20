import Cabecalho from "@/components/cabecalho";
import Rodape from "@/components/rodape";
import ItemBarbearia from "@/components/item-barbearia";
import { obterBarbeariasPorNomeServico } from "@/data/barbearias";
import {
  ContainerPagina,
  ConteudoSecao,
  TituloSecao,
} from "@/components/ui/page";

interface BarbershopsPageProps {
  searchParams: Promise<{
    search?: string;
  }>;
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
  const { search } = await searchParams;
  const barbearias = search ? await obterBarbeariasPorNomeServico(search) : [];

  return (
    <div>
      <Cabecalho />
      <ContainerPagina>
        <ConteudoSecao>
          <TituloSecao>Resultados para &quot;{search || ""}&quot;</TituloSecao>
          {barbearias.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              Nenhuma barbearia encontrada.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {barbearias.map((barbershop) => (
                <ItemBarbearia key={barbershop.id} barbershop={barbershop} />
              ))}
            </div>
          )}
        </ConteudoSecao>
      </ContainerPagina>
      <Rodape />
    </div>
  );
};

export default BarbershopsPage;
