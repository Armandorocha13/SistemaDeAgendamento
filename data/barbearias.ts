// Data Access Layer
import { prisma } from "@/lib/prisma";

// Obtém todas as barbearias
export const obterBarbearias = async () => {
  const barbershops = await prisma.barbershop.findMany();
  return barbershops;
};

// Obtém barbearias populares
export const obterBarbeariasPopulares = async () => {
  const popularBarbershops = await prisma.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  });
  return popularBarbershops;
};

// Obtém barbearia por ID
export const obterBarbeariaPorId = async (id: string) => {
  const barbershop = await prisma.barbershop.findUnique({
    where: { id },
    include: { services: true },
  });
  return barbershop;
};

// Obtém barbearias pelo nome do serviço
export const obterBarbeariasPorNomeServico = async (serviceName: string) => {
  const barbershops = await prisma.barbershop.findMany({
    where: {
      services: {
        some: {
          name: {
            contains: serviceName,
            mode: "insensitive",
          },
        },
      },
    },
  });
  return barbershops;
};
