import Cabecalho from "@/components/cabecalho";
import ItemAgendamento from "@/components/item-agendamento";
import { obterAgendamentosUsuario } from "@/data/agendamentos";
import {
  ContainerPagina,
  ConteudoSecao,
  RolagemSecao,
  TituloSecao,
} from "@/components/ui/page";
import Rodape from "@/components/rodape";
import { obterBarbeariaPrincipal } from "@/data/barbearias";
import ItemServico from "@/components/item-servico";
import { notFound } from "next/navigation";
import PesquisaRapida from "@/components/pesquisa-rapida";
import BannerCarrossel from "@/components/banner-carrossel";

export default async function Home() {
  const barbershop = await obterBarbeariaPrincipal();

  if (!barbershop) {
    return notFound();
  }

  const { confirmedBookings } = await obterAgendamentosUsuario();

  return (
    <div>
      <Cabecalho />
      <ContainerPagina>
        <PesquisaRapida />

        <BannerCarrossel />

        {/* Agendamentos */}
        {confirmedBookings.length > 0 && (
          <ConteudoSecao>
            <TituloSecao>Agendamentos</TituloSecao>
            <RolagemSecao>
              {confirmedBookings.map((booking) => (
                <ItemAgendamento key={booking.id} booking={booking} />
              ))}
            </RolagemSecao>
          </ConteudoSecao>
        )}

        {/* Serviços (Substituindo listas de barbearias) */}
        <ConteudoSecao>
          <TituloSecao>Serviços Disponíveis</TituloSecao>
          <div className="flex flex-col gap-3">
            {barbershop.services.map((service) => (
              <ItemServico
                key={service.id}
                service={service}
                barbershop={barbershop}
              />
            ))}
          </div>
        </ConteudoSecao>

        {/* Sobre Mim (Mantendo simples, mas opcional se o usuário reclamar) */}
        <ConteudoSecao>
          <TituloSecao>Sobre Mim</TituloSecao>
          <div className="bg-card p-4 rounded-xl border border-secondary shadow-sm">
            <p className="text-sm text-gray-500">{barbershop.description}</p>
          </div>
        </ConteudoSecao>

      </ContainerPagina>
      <Rodape />
    </div>
  );
}
