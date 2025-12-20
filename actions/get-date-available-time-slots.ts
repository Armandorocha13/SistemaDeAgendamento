"use server";

import { actionClient } from "@/lib/action-client";
import { prisma } from "@/lib/prisma";
import { endOfDay, format, startOfDay } from "date-fns";
import { z } from "zod";

const inputSchema = z.object({
  barbershopId: z.uuid(),
  date: z.date(),
  serviceId: z.uuid().optional(),
});

const TIME_SLOTS = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
];

export const getDateAvailableTimeSlots = actionClient
  .inputSchema(inputSchema)
  .action(async ({ parsedInput: { barbershopId, date, serviceId } }) => {
    const service = serviceId
      ? await prisma.barbershopService.findUnique({ where: { id: serviceId } })
      : null;
    const bookings = await prisma.booking.findMany({
      where: {
        barbershopId,
        // 2025-12-14 09:00:00
        date: {
          gte: startOfDay(date),
          lte: endOfDay(date),
        },
        cancelledAt: null,
      },
      include: {
        service: true,
      },
    });
    const occupiedIntervals = bookings.map((booking) => {
      const start = booking.date;
      const duration = booking.service?.durationInMinutes ?? 60;
      const end = new Date(start.getTime() + duration * 60 * 1000);
      return { start, end };
    });
    const availableTimeSlots = TIME_SLOTS.filter((slot) => {
      const [h, m] = slot.split(":").map(Number);
      const start = new Date(date);
      start.setHours(h, m, 0, 0);
      const candidateDuration = service?.durationInMinutes ?? 60;
      const end = new Date(start.getTime() + candidateDuration * 60 * 1000);
      const overlaps = occupiedIntervals.some(
        (interval) => start < interval.end && end > interval.start,
      );
      return !overlaps;
    });
    return availableTimeSlots;
  });
