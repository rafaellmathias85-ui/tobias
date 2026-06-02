import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

export function generateStaticParams() {
  return [];
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
