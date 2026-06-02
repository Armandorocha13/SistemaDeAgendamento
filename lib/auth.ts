// lib/auth.ts
import { cookies } from "next/headers";

const mockUser = {
  id: "user-123",
  name: "Cliente Teste",
  email: "cliente.teste@example.com",
  emailVerified: true,
  image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
};

export const auth = {
  api: {
    async getSession(options?: any) {
      const cookieStore = await cookies();
      const isLoggedIn = cookieStore.get("mock_user_logged_in")?.value !== "false";

      if (isLoggedIn) {
        return {
          user: mockUser,
          session: {
            id: "sess-123",
            expiresAt: new Date(Date.now() + 86400000),
            token: "sess-token",
            createdAt: new Date(),
            updatedAt: new Date(),
            userId: "user-123",
          }
        };
      }
      return null;
    }
  }
} as any;
