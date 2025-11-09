"use server";

import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";

export async function getSession() {
  // Fetch from API route which preserves custom properties like expires
  const cookieStore = cookies();
  const cookieHeader = cookieStore.toString();
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

  const response = await fetch(`${baseUrl}/api/auth/session`, {
    headers: {
      cookie: cookieHeader,
    },
    cache: "no-store",
  });

  if (response.ok) {
    return await response.json();
  }

  return null;
}

export async function getCurrentUser() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return null;
    }
    return session.user;
  } catch (error) {
    console.error(error);
    return null;
  }
}
