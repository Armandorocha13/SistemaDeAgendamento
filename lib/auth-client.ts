// lib/auth-client.ts
import { useState, useEffect } from "react";

const mockUser = {
  id: "user-123",
  name: "Cliente Teste",
  email: "cliente.teste@example.com",
  emailVerified: true,
  image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
};

export const authClient = {
  useSession() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    useEffect(() => {
      if (typeof window !== "undefined") {
        const matches = document.cookie.match(/(?:^|; )mock_user_logged_in=([^;]*)/);
        const cookieVal = matches ? matches[1] : null;
        if (cookieVal !== null) {
          setIsLoggedIn(cookieVal !== "false");
        } else {
          document.cookie = "mock_user_logged_in=true; path=/";
          setIsLoggedIn(true);
        }
      }
    }, []);

    const session = isLoggedIn 
      ? { user: mockUser, session: { id: "sess-123", expiresAt: new Date(Date.now() + 86400000) } } 
      : null;

    return {
      data: session,
      isPending: false,
      error: null,
      refetch: () => {},
    };
  },
  signIn: {
    social: async (options: { provider: string }) => {
      if (typeof window !== "undefined") {
        document.cookie = "mock_user_logged_in=true; path=/";
        window.location.reload();
      }
      return { data: {}, error: null };
    }
  },
  signOut: async () => {
    if (typeof window !== "undefined") {
      document.cookie = "mock_user_logged_in=false; path=/";
      window.location.reload();
    }
    return { data: {}, error: null };
  }
};
