import { getSession } from "@/lib/auth/session";
import { adminEscrowQueue } from "@/lib/redis/queues";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { lamportsToSol, solToLamports } from "@/lib/utils/solana";

// Get all user escrows
export async function GET() {
  return new Response("Not get implemented", { status: 501 });
}

// Create Escrow payment by admin
export async function POST(req: NextRequest) {
  return new Response("Not post implemented", { status: 501 });
}
