import Cabecalho from "@/components/cabecalho";
import Image from "next/image";
import banner from "@/public/banner-unha.png";
import ItemAgendamento from "@/components/item-agendamento";

import { obterBarbearias, obterBarbeariasPopulares } from "@/data/barbearias";
import { obterAgendamentosUsuario } from "@/data/agendamentos";
import ItemBarbearia from "@/components/item-barbearia";
import {
  ContainerPagina,
  ConteudoSecao,
  RolagemSecao,
  TituloSecao,
} from "@/components/ui/page";
import Rodape from "@/components/rodape";
import PesquisaRapida from "@/components/pesquisa-rapida";

export default async function Home() {
  const barbearias = await obterBarbearias();
  const barbeariasPopulares = await obterBarbeariasPopulares();
  const { confirmedBookings } = await obterAgendamentosUsuario();

  return (
    <div>
      <Cabecalho />
      <ContainerPagina>
        <PesquisaRapida />
        <div className="relative w-full overflow-hidden rounded-2xl">
          <Image
            src={banner}
            alt="Agende nos melhores com a Aparatus"
            sizes="100vw"
            className="h-auto w-full object-cover"
          />
          <div className="absolute inset-0 rounded-2xl bg-linear-to-t from-black/50 to-transparent" />
          <div className="absolute top-[80%] left-5 z-10 -translate-y-1/2">
            <h2 className="text-background font-sour text-3xl font-bold">
              Agende com Nail Designers
            </h2>
            <p className="text-background text-sm">
              Serviços populares e horários disponíveis
            </p>
          </div>
        </div>
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
        <ConteudoSecao>
          <TituloSecao>Nail Designers</TituloSecao>
          <RolagemSecao>
            {barbearias.map((barbershop) => (
              <ItemBarbearia key={barbershop.id} barbershop={barbershop} />
            ))}
          </RolagemSecao>
        </ConteudoSecao>
        <ConteudoSecao>
          <TituloSecao>Nail Designers populares</TituloSecao>
          <RolagemSecao>
            {barbeariasPopulares.map((barbershop) => (
              <ItemBarbearia key={barbershop.id} barbershop={barbershop} />
            ))}
          </RolagemSecao>
        </ConteudoSecao>
      </ContainerPagina>
      <Rodape />
    </div>
  );
}
