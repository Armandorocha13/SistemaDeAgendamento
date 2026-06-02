// lib/auth-client.ts
const mockUser = {
  id: "user-123",
  name: "Cliente Teste",
  email: "cliente.teste@example.com",
  emailVerified: true,
  image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
};

export const authClient = {
  useSession() {
    const session = { user: mockUser, session: { id: "sess-123", expiresAt: new Date(Date.now() + 86400000) } };

    return {
      data: session,
      isPending: false,
      error: null,
      refetch: () => {},
    };
  },
  signIn: {
    social: async (options: { provider: string }) => {
      return { data: {}, error: null };
    }
  },
  signOut: async () => {
    return { data: {}, error: null };
  }
};

