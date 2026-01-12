"use server"; // don't forget to add this!

import { z } from "zod";
import { protectedActionClient } from "@/lib/action-client";
import { returnValidationErrors } from "next-safe-action";
import { prisma } from "@/lib/prisma";
import { isPast } from "date-fns";
import { createGoogleCalendarEvent } from "@/lib/google-calendar";

// This schema is used to validate input from client.
const inputSchema = z.object({
  serviceId: z.uuid(),
  date: z.date(),
  customerPhone: z.string().min(1, "O número de telefone é obrigatório."),
});

export const createBooking = protectedActionClient
  .inputSchema(inputSchema)
  .action(async ({ parsedInput: { serviceId, date, customerPhone }, ctx: { user } }) => {
    if (isPast(date)) {
      returnValidationErrors(inputSchema, {
        _errors: ["Data e hora selecionadas já passaram."],
      });
    }
    const service = await prisma.barbershopService.findUnique({
      where: {
        id: serviceId,
      },
      include: {
        barbershop: true,
      },
    });
    // Serviço existe?
    if (!service) {
      returnValidationErrors(inputSchema, {
        _errors: [
          "Serviço não encontrado. Por favor, selecione outro serviço.",
        ],
      });
    }
    // Verificar conflito por intervalo (considerando duração do serviço)
    const candidateStart = date;
    const candidateEnd = new Date(
      candidateStart.getTime() +
      ((service.durationInMinutes ?? 60) * 60 * 1000),
    );
    const sameDayBookings = await prisma.booking.findMany({
      where: {
        barbershopId: service.barbershopId,
        cancelledAt: null,
        date: {
          gte: new Date(
            candidateStart.getFullYear(),
            candidateStart.getMonth(),
            candidateStart.getDate(),
            0,
            0,
            0,
            0,
          ),
          lte: new Date(
            candidateStart.getFullYear(),
            candidateStart.getMonth(),
            candidateStart.getDate(),
            23,
            59,
            59,
            999,
          ),
        },
      },
      include: { service: true },
    });
    const overlaps = sameDayBookings.some((booking) => {
      const start = booking.date;
      const end = new Date(
        start.getTime() +
        ((booking.service?.durationInMinutes ?? 60) * 60 * 1000),
      );
      return candidateStart < end && candidateEnd > start;
    });
    if (overlaps) {
      returnValidationErrors(inputSchema, {
        _errors: ["Data e hora selecionadas já estão agendadas."],
      });
    }
    const booking = await prisma.booking.create({
      data: {
        serviceId,
        date,
        userId: user.id,
        barbershopId: service.barbershopId,
        customerPhone,
      },
    });

    // Sincronizar com Google Calendar
    try {
      const end = new Date(
        date.getTime() + (service.durationInMinutes ?? 60) * 60 * 1000,
      );
      const googleEvent = await createGoogleCalendarEvent({
        summary: `${service.name} - ${service.barbershop.name}`,
        description: `Agendamento realizado por ${user.name} (${customerPhone})`,
        start: date,
        end: end,
      });

      if (googleEvent?.id) {
        await prisma.booking.update({
          where: { id: booking.id },
          data: { googleEventId: googleEvent.id },
        });
      }
    } catch (error) {
      console.error("Erro ao sincronizar com Google Calendar:", error);
      // Não falhamos a reserva se o calendário falhar, mas logamos o erro.
    }

    return booking;
  });
