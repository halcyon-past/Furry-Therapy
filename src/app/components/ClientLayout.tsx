"use client"; // This ensures the component is treated as a client-side component

import { SessionProvider } from "next-auth/react";
import React from "react";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
