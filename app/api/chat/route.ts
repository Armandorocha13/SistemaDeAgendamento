// app/api/chat/route.ts
import { prisma } from "@/lib/prisma";
import { getDateAvailableTimeSlots } from "@/actions/get-date-available-time-slots";

export const POST = async (request: Request) => {
  const { messages } = await request.json();
  const lastMessage = messages[messages.length - 1]?.parts?.[0]?.text || "";
  const lastMessageLower = lastMessage.toLowerCase();

  let responseText = "Olá! Sou o Agenda.ai, seu assistente. Como posso ajudar você com seus agendamentos na The Nails By Julien hoje?";

  if (
    lastMessageLower.includes("horário") ||
    lastMessageLower.includes("disponiv") ||
    lastMessageLower.includes("agenda") ||
    lastMessageLower.includes("hoje") ||
    lastMessageLower.includes("amanhã")
  ) {
    const barbershops = await prisma.barbershop.findMany({
      include: { services: true },
    });

    if (barbershops.length > 0) {
      const nailDesigner = barbershops[0];
      const date = new Date();
      if (lastMessageLower.includes("amanhã")) {
        date.setDate(date.getDate() + 1);
      }

      const slotsResponse = await getDateAvailableTimeSlots({
        barbershopId: nailDesigner.id,
        date: date,
      });
      const slots = slotsResponse?.data || [];

      const formattedDate = date.toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "numeric",
      });
      if (slots.length > 0) {
        responseText =
          `Temos os seguintes horários disponíveis para o dia ${formattedDate} com a ${nailDesigner.name}:\n\n` +
          slots
            .slice(0, 5)
            .map((s) => `- ${s}`)
            .join("\n") +
          `\n\nQual desses horários você prefere? Para agendar, escreva algo como "Quero agendar para [horário]"`;
      } else {
        responseText = `Infelizmente não temos horários disponíveis para o dia ${formattedDate}. Gostaria de verificar outra data?`;
      }
    } else {
      responseText = "Ainda não temos profissionais cadastradas no sistema. Por favor, tente novamente mais tarde.";
    }
  } else if (
    lastMessageLower.includes("preço") ||
    lastMessageLower.includes("valor") ||
    lastMessageLower.includes("serviço") ||
    lastMessageLower.includes("quanto")
  ) {
    const barbershops = await prisma.barbershop.findMany({
      include: { services: true },
    });
    if (barbershops.length > 0 && barbershops[0].services.length > 0) {
      responseText =
        "Os serviços disponíveis de Nails são:\n\n" +
        barbershops[0].services
          .map(
            (s) =>
              `- **${s.name}**: R$ ${(s.priceInCents / 100)
                .toFixed(2)
                .replace(".", ",")}`,
          )
          .join("\n") +
        "\n\nGostaria de agendar algum deles?";
    } else {
      responseText = "Temos diversos serviços de Nail Design como Manutenção de Gel, Esmaltação e Spa das Mãos. Gostaria de ver a lista?";
    }
  } else if (
    lastMessageLower.includes("confirm") ||
    lastMessageLower.includes("quero agendar") ||
    lastMessageLower.includes("pode agendar") ||
    lastMessageLower.includes("marcar")
  ) {
    const timeMatch = lastMessageLower.match(/(\d{2}):(\d{2})/);
    const barbershops = await prisma.barbershop.findMany({
      include: { services: true },
    });

    if (barbershops.length > 0 && barbershops[0].services.length > 0) {
      const nailDesigner = barbershops[0];
      const service = nailDesigner.services[0]; // Default to first service
      const date = new Date();
      if (lastMessageLower.includes("amanhã")) {
        date.setDate(date.getDate() + 1);
      }

      let hours = 14;
      let minutes = 0;
      if (timeMatch) {
        hours = Number(timeMatch[1]);
        minutes = Number(timeMatch[2]);
      }
      date.setHours(hours, minutes, 0, 0);

      try {
        await prisma.booking.create({
          data: {
            serviceId: service.id,
            barbershopId: nailDesigner.id,
            userId: "user-123", // Seeded mock user
            date: date,
            customerPhone: "(11) 99999-9999",
          },
        });

        const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}`;
        const formattedDate = date.toLocaleDateString("pt-BR", {
          day: "numeric",
          month: "numeric",
        });
        responseText = `Perfeito! Seu agendamento de **${service.name}** com **${nailDesigner.name}** está confirmado para o dia **${formattedDate} às ${formattedTime}**!\n\nVocê já pode conferir seu novo agendamento na aba "Agendamentos" do menu lateral.`;
      } catch (err) {
        console.error("Chat booking error:", err);
        responseText = "Desculpe, ocorreu um erro ao tentar criar a reserva. Por favor, tente novamente ou verifique se o horário já está ocupado.";
      }
    } else {
      responseText = "Não foi possível criar o agendamento no momento. Por favor, tente novamente mais tarde.";
    }
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const words = responseText.split(" ");
      for (const word of words) {
        controller.enqueue(encoder.encode(word + " "));
        await new Promise((resolve) => setTimeout(resolve, 80));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
