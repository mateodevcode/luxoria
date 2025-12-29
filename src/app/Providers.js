"use client";
import { SessionProvider } from "next-auth/react";
import { useAuthSync } from "@/core/hooks/useAuthSync";

// Componente que sincroniza la sesión con Zustand
const SessionSync = ({ children }) => {
  useAuthSync(); // Sincroniza automáticamente
  return <>{children}</>;
};

export const AuthProvider = ({ children }) => {
  return (
    <SessionProvider>
      <SessionSync>{children}</SessionSync>
    </SessionProvider>
  );
};
