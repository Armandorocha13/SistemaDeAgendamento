import Cabecalho from "@/components/cabecalho";
import Rodape from "@/components/rodape";
import ItemAgendamento from "@/components/item-agendamento";
import { obterAgendamentosUsuario } from "@/data/agendamentos";
import {
  ContainerPagina,
  ConteudoSecao,
  TituloSecao,
} from "@/components/ui/page";

const BookingsPage = async () => {
  const { confirmedBookings, finishedBookings } = await obterAgendamentosUsuario();

  return (
    <div>
      <Cabecalho />
      <ContainerPagina>
        <h1 className="text-xl font-bold">Agendamentos</h1>

        <ConteudoSecao>
          <TituloSecao>Confirmados</TituloSecao>
          {confirmedBookings.length > 0 ? (
            <div className="flex flex-col gap-3">
              {confirmedBookings.map((booking) => (
                <ItemAgendamento key={booking.id} booking={booking} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">
              Nenhum agendamento confirmado.
            </p>
          )}
        </ConteudoSecao>

        <ConteudoSecao>
          <TituloSecao>Finalizados</TituloSecao>
          {finishedBookings.length > 0 ? (
            <div className="flex flex-col gap-3">
              {finishedBookings.map((booking) => (
                <ItemAgendamento key={booking.id} booking={booking} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">
              Nenhum agendamento finalizado.
            </p>
          )}
        </ConteudoSecao>
      </ContainerPagina>
      <Rodape />
    </div>
  );
};

export default BookingsPage;
