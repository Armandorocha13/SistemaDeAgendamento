import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL || "file:./dev.db"
});
const prisma = new PrismaClient({ adapter });

async function seedDatabase() {
  try {
    // Limpar o banco de dados antes de semear
    await prisma.booking.deleteMany();
    await prisma.barbershopService.deleteMany();
    await prisma.barbershop.deleteMany();
    await prisma.user.deleteMany();

    const images = [
      "https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png",
      "https://utfs.io/f/45331760-899c-4b4b-910e-e00babb6ed81-16q.png",
      "https://utfs.io/f/5832df58-cfd7-4b3f-b102-42b7e150ced2-16r.png",
      "https://utfs.io/f/7e309eaa-d722-465b-b8b6-76217404a3d3-16s.png",
      "https://utfs.io/f/178da6b6-6f9a-424a-be9d-a2feb476eb36-16t.png",
      "https://utfs.io/f/2f9278ba-3975-4026-af46-64af78864494-16u.png",
      "https://utfs.io/f/988646ea-dcb6-4f47-8a03-8d4586b7bc21-16v.png",
      "https://utfs.io/f/60f24f5c-9ed3-40ba-8c92-0cd1dcd043f9-16w.png",
      "https://utfs.io/f/f64f1bd4-59ce-4ee3-972d-2399937eeafc-16x.png",
      "https://utfs.io/f/e995db6d-df96-4658-99f5-11132fd931e1-17j.png",
      "https://utfs.io/f/3bcf33fc-988a-462b-8b98-b811ee2bbd71-17k.png",
      "https://utfs.io/f/5788be0e-2307-4bb4-b603-d9dd237950a2-17l.png",
      "https://utfs.io/f/6b0888f8-b69f-4be7-a13b-52d1c0c9cab2-17m.png",
      "https://utfs.io/f/ef45effa-415e-416d-8c4a-3221923cd10f-17n.png",
      "https://utfs.io/f/ef45effa-415e-416d-8c4a-3221923cd10f-17n.png",
      "https://utfs.io/f/a55f0f39-31a0-4819-8796-538d68cc2a0f-17o.png",
      "https://utfs.io/f/5c89f046-80cd-4443-89df-211de62b7c2a-17p.png",
      "https://utfs.io/f/23d9c4f7-8bdb-40e1-99a5-f42271b7404a-17q.png",
      "https://utfs.io/f/9f0847c2-d0b8-4738-a673-34ac2b9506ec-17r.png",
      "https://utfs.io/f/07842cfb-7b30-4fdc-accc-719618dfa1f2-17s.png",
      "https://utfs.io/f/0522fdaf-0357-4213-8f52-1d83c3dcb6cd-18e.png",
    ];
    // Nomes criativos para as barbearias
    const creativeNames = [
      "The Nails By Julien",
      "Barbearia Vintage",
      "Corte & Estilo",
      "Barba & Navalha",
      "The Dapper Den",
      "Cabelo & Cia.",
      "Machado & Tesoura",
      "Barbearia Elegance",
      "Aparência Impecável",
      "Estilo Urbano",
      "Estilo Clássico",
    ];

    // Endereços fictícios para as barbearias
    const addresses = [
      "Avenida da Moda, 123 - Centro",
      "Rua da Barbearia, 123",
      "Avenida dos Cortes, 456",
      "Praça da Barba, 789",
      "Travessa da Navalha, 101",
      "Alameda dos Estilos, 202",
      "Estrada do Machado, 303",
      "Avenida Elegante, 404",
      "Praça da Aparência, 505",
      "Rua Urbana, 606",
      "Avenida Clássica, 707",
    ];

    const services = [
      {
        name: "Alongamento P, M (F1/Tip)",
        description: "Alongamento nos tamanhos P ou M com Molde F1 ou Tip, decorada com francesinha e brilhos.",
        price: 110.0,
        imageUrl: "/fotos/WhatsApp Image 2026-06-01 at 22.39.06.jpeg",
        durationInMinutes: 180,
      },
      {
        name: "Alongamento G (F1/Tip)",
        description: "Alongamento tamanho G com Molde F1 ou Tips.",
        price: 130.0,
        imageUrl: "/fotos/WhatsApp Image 2026-06-01 at 22.39.12 (2).jpeg",
        durationInMinutes: 180,
      },
      {
        name: "Manutenção (Até 30 dias)",
        description: "Manutenção de alongamento realizada em até 30 dias.",
        price: 100.0,
        imageUrl: "/fotos/WhatsApp Image 2026-06-01 at 22.39.09 (1).jpeg",
        durationInMinutes: 120,
      },
      {
        name: "Banho de Gel (Francesinha/Glitters)",
        description: "Banho de gel com francesinhas e glitters.",
        price: 100.0,
        imageUrl: "/fotos/WhatsApp Image 2026-06-01 at 22.39.17 (1).jpeg",
        durationInMinutes: 90,
      },
      {
        name: "Banho de Gel c/ Encapsulado",
        description: "Banho de gel com técnica de encapsulamento.",
        price: 110.0,
        imageUrl: "/fotos/WhatsApp Image 2026-06-01 at 22.39.06 (1).jpeg",
        durationInMinutes: 120,
      },
      {
        name: "Manutenção Banho de Gel",
        description: "Manutenção do banho de gel.",
        price: 70.0,
        imageUrl: "/fotos/WhatsApp Image 2026-06-01 at 22.39.13 (1).jpeg",
        durationInMinutes: 60,
      },
      {
        name: "Esmaltação em Gel (Mão)",
        description: "Esmaltação em gel nas mãos com direito a francesinha e brilho.",
        price: 60.0,
        imageUrl: "/fotos/WhatsApp Image 2026-06-01 at 22.39.11.jpeg",
        durationInMinutes: 60,
      },
      {
        name: "Esmaltação em Gel (Pé)",
        description: "Esmaltação em gel nos pés com direito a francesinha e brilho.",
        price: 60.0,
        imageUrl: "/fotos/WhatsApp Image 2026-06-01 at 22.39.10 (1).jpeg",
        durationInMinutes: 60,
      },
      {
        name: "Esmaltação em Gel (Pé e Mão)",
        description: "Esmaltação em gel completa (pé e mão) com francesinha e detalhes com brilho.",
        price: 100.0,
        imageUrl: "/fotos/WhatsApp Image 2026-06-01 at 22.39.16 (2).jpeg",
        durationInMinutes: 120,
      },
      {
        name: "Blindagem Diamante",
        description: "Proteção extra e brilho intenso para suas unhas.",
        price: 70.0,
        imageUrl: "/fotos/WhatsApp Image 2026-06-01 at 22.39.17.jpeg",
        durationInMinutes: 60,
      },
      {
        name: "Postiça Realista",
        description: "Aplicação de unhas postiças com acabamento natural.",
        price: 60.0,
        imageUrl: "/fotos/WhatsApp Image 2026-06-01 at 22.39.18.jpeg",
        durationInMinutes: 90,
      },
      {
        name: "Nail Art Nível 1 - Criativa",
        description: "Degradês ou artes com detalhes em todos os dedos.",
        price: 30.0,
        imageUrl: "/fotos/WhatsApp Image 2026-06-01 at 22.39.09.jpeg",
        durationInMinutes: 30,
      },
      {
        name: "Nail Art Nível 2 - Master Art",
        description: "Desenhos à mão livre, personagens, pedrarias luxo ou efeito 3D.",
        price: 75.0,
        imageUrl: "/fotos/WhatsApp Image 2026-06-01 at 22.39.14 (1).jpeg",
        durationInMinutes: 60,
      },
      {
        name: "Reposição de Unha",
        description: "Reposição individual de unha.",
        price: 10.0,
        imageUrl: "/fotos/WhatsApp Image 2026-06-01 at 22.39.08 (1).jpeg",
        durationInMinutes: 30,
      },
      {
        name: "Remoção com Tratamento",
        description: "Remoção segura do alongamento acompanhada de tratamento para as unhas naturais.",
        price: 30.0,
        imageUrl: "/fotos/WhatsApp Image 2026-06-01 at 22.39.15 (1).jpeg",
        durationInMinutes: 45,
      },
    ];

    // Criar o usuário mockado para integridade referencial
    await prisma.user.create({
      data: {
        id: "user-123",
        name: "Cliente Teste",
        email: "cliente.teste@example.com",
        emailVerified: true,
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
      }
    });

    // Criar as barbearias com nomes e endereços fictícios
    const barbershops = [];
    for (let i = 0; i < creativeNames.length; i++) {
      const name = creativeNames[i];
      const address = addresses[i];
      const imageUrl = images[i];

      const barbershop = await prisma.barbershop.create({
        data: {
          name,
          address,
          imageUrl: imageUrl,
          phones: "(11) 99999-9999,(11) 99999-9999",
          description:
            "Especialista em Alongamentos e Nail Art Artística. Oferecemos técnicas de longa duração e alta performance para garantir a perfeição de cada detalhe.",
        },
      });

      for (const service of services) {
        await prisma.barbershopService.create({
          data: {
            name: service.name,
            description: service.description,
            priceInCents: service.price * 100,
            barbershop: {
              connect: {
                id: barbershop.id,
              },
            },
            imageUrl: service.imageUrl,
            durationInMinutes: service.durationInMinutes,
          },
        });
      }

      barbershops.push(barbershop);
    }

    // Fechar a conexão com o banco de dados
    await prisma.$disconnect();
  } catch (error) {
    console.error("Erro ao criar as barbearias:", error);
  }
}

seedDatabase();
