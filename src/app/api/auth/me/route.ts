import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { jwtVerify } from "jose";

const prisma = new PrismaClient();
const secret = new TextEncoder().encode(process.env.JWT_SECRET || "dev-secret");

export async function GET(req: Request) {
  try {
    const cookie = (req as any).headers.get("cookie") || "";
    const match = cookie.match(/bb_auth=([^;]+)/);
    if (!match) return NextResponse.json({ user: null });
    const token = decodeURIComponent(match[1]);
    const { payload } = await jwtVerify(token, secret);
    const userId = payload.sub as string | undefined;
    if (!userId) return NextResponse.json({ user: null });
    const user = await prisma.user.findUnique({ where: { id: userId }, select: { id: true, email: true, name: true } });
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ user: null });
  }
}


