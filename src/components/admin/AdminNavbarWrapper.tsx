"use client";

import { useSession } from "next-auth/react";
import AdminNavbar from "./AdminNavbar";

export default function AdminNavbarWrapper() {
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  return <AdminNavbar />;
}
