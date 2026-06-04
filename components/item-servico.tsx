"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { formatarMoeda } from "@/lib/utils";
import { BarbershopService, Barbershop } from "@prisma/client";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Calendar } from "./ui/calendar";
import { ptBR } from "date-fns/locale";
import { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useGetDateAvailableTimeSlots } from "@/hooks/data/use-get-date-availabe-time-slots";
import ResumoAgendamento from "./resumo-agendamento";
import { createBooking } from "@/actions/create-booking";
import { Input } from "./ui/input";

// Card de serviço com fluxo de reserva
interface ItemServicoProps {
  service: BarbershopService;
  barbershop: Barbershop;
}

const ItemServico = ({ service, barbershop }: ItemServicoProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  );
  const [customerPhone, setCustomerPhone] = useState("");
  const [sheetIsOpen, setSheetIsOpen] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);

  const { executeAsync: executeCreateBooking, isPending: isCreatingBooking } =
    useAction(createBooking);

  // TODO: Fix this if "BarbershopService" doesn't have "id" in "BarbershopService" type, but it should.
  // The hook expects params.
  const { data: availableTimeSlots } = useGetDateAvailableTimeSlots({
    barbershopId: barbershop.id,
    serviceId: service.id,
    date: selectedDate,
  });

  useEffect(() => {
    if (selectedDate && availableTimeSlots?.data && availableTimeSlots.data.length === 0) {
      setShowLimitModal(true);
    }
  }, [selectedDate, availableTimeSlots?.data]);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTime(undefined);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleConfirmBooking = async () => {
    if (!selectedDate || !selectedTime || !customerPhone) {
      return;
    }
    const splittedTime = selectedTime.split(":");
    const hours = Number(splittedTime[0]);
    const minutes = Number(splittedTime[1]);
    const date = new Date(selectedDate);
    date.setHours(hours, minutes);

    // Passing customerPhone now
    const result = await executeCreateBooking({
      date,
      serviceId: service.id,
      customerPhone,
    });

    if (result.validationErrors) {
      return toast.error(result.validationErrors._errors?.[0]);
    }
    if (result.serverError) {
      return toast.error(
        "Erro ao criar agendamento. Por favor, tente novamente.",
      );
    }

    toast.success("Reserva realizada com sucesso! Redirecionando para o WhatsApp...");
    
    const formattedDate = date.toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const formattedPrice = formatarMoeda(service.priceInCents);

    const message = `Olá! Gostaria de confirmar meu agendamento:
*Serviço:* ${service.name}
*Data:* ${formattedDate}
*Horário:* ${selectedTime}
*Valor:* ${formattedPrice}
*WhatsApp do Cliente:* ${customerPhone}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5521991498444?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");

    setSheetIsOpen(false);
    setSelectedDate(undefined);
    setSelectedTime(undefined);
    setCustomerPhone("");
  };

  return (
    <div className="border-border bg-card flex gap-3 rounded-2xl border p-3">
      {/* Service Image */}
      <div className="relative h-[110px] w-[110px] shrink-0">
        <Image
          src={service.imageUrl}
          alt={service.name}
          fill
          className="rounded-xl object-cover"
        />
      </div>

      {/* Service Info */}
      <div className="flex flex-1 flex-col justify-between">
        <div className="space-y-1">
          <p className="text-sm font-bold">{service.name}</p>
          <p className="text-muted-foreground text-sm">{service.description}</p>
        </div>

        {/* Price and Booking Button */}
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold">
            {formatarMoeda(service.priceInCents)}
          </p>

          <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
            <SheetTrigger asChild>
              <Button className="rounded-full" size="sm">
                Reservar
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto px-0 pb-0">
              <SheetHeader className="border-border border-b px-5 py-6">
                <SheetTitle>Fazer Reserva</SheetTitle>
              </SheetHeader>

              <div className="border-border border-b px-5 py-6">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  locale={ptBR}
                  className="w-full p-0"
                  disabled={{ before: new Date() }}
                  classNames={{
                    cell: "w-full",
                    day: "w-[36px] h-[36px] mx-auto text-sm bg-transparent hover:bg-muted rounded-full data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground",
                    head_cell:
                      "w-full text-xs font-normal text-muted-foreground capitalize",
                    caption: "capitalize",
                    caption_label: "text-base font-bold",
                    nav: "flex gap-1 absolute right-0 top-0 z-10",
                    nav_button_previous:
                      "w-7 h-7 bg-transparent border border-border rounded-lg hover:opacity-100 hover:bg-transparent",
                    nav_button_next:
                      "w-7 h-7 bg-muted text-muted-foreground rounded-lg hover:opacity-100 hover:bg-muted",
                    month_caption:
                      "flex justify-start pt-1 relative items-center w-full px-0",
                  }}
                />
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div className="border-border flex gap-3 overflow-x-auto border-b px-5 py-6 [&::-webkit-scrollbar]:hidden">
                  {availableTimeSlots?.data && availableTimeSlots.data.length > 0 ? (
                    availableTimeSlots.data.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        className="rounded-full"
                        onClick={() => handleTimeSelect(time)}
                      >
                        {time}
                      </Button>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground text-center w-full py-2">
                      {availableTimeSlots?.data 
                        ? "Limite de agendamentos atingido para este dia. Selecione outra data."
                        : "Carregando horários..."}
                    </p>
                  )}
                </div>
              )}

              {/* Resumo da Reserva */}
              {selectedDate && selectedTime && (
                <div className="px-5 py-6">
                  <ResumoAgendamento
                    serviceName={service.name}
                    servicePrice={service.priceInCents}
                    barbershopName={barbershop.name}
                    date={selectedDate}
                    time={selectedTime}
                  />

                  <div className="mt-5 space-y-2">
                    <p className="text-sm font-bold">Seu WhatsApp</p>
                    <Input
                      placeholder="(11) 99999-9999"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                    />
                  </div>
                </div>
              )}

              <SheetFooter className="px-5 pb-6">
                <Button
                  className="w-full"
                  disabled={!selectedDate || !selectedTime || !customerPhone || isCreatingBooking}
                  onClick={handleConfirmBooking}
                >
                  {isCreatingBooking ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    "Confirmar"
                  )}
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <AlertDialog open={showLimitModal} onOpenChange={setShowLimitModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Data Indisponível</AlertDialogTitle>
            <AlertDialogDescription>
              O limite máximo de agendamentos já foi atingido para este dia. Por favor, selecione uma data diferente para fazer a sua reserva!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => {
              setShowLimitModal(false);
              setSelectedDate(undefined);
            }}>Escolher outra data</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ItemServico;
