import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

const handler = NextAuth(authOptions)

export const GET = handler.handlers.get
export const POST = handler.handlers.post

