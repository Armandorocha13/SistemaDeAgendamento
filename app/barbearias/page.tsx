import Cabecalho from "@/components/cabecalho";
import Rodape from "@/components/rodape";
import ItemServico from "@/components/item-servico";
import { obterBarbeariaPrincipal } from "@/data/barbearias";
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
  const barbershop = await obterBarbeariaPrincipal();
  
  const services = barbershop?.services.filter(s => 
    search ? s.name.toLowerCase().includes(search.toLowerCase()) : true
  ) || [];

  return (
    <div>
      <Cabecalho />
      <ContainerPagina>
        <ConteudoSecao>
          <TituloSecao>
            Resultados para &quot;{search || ""}&quot;
          </TituloSecao>
          {services.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              Nenhum serviço encontrado.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {services.map((service) => (
                <ItemServico key={service.id} service={service} barbershop={barbershop!} />
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
