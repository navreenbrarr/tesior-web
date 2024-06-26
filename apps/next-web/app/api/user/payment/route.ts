import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth/session";
import { lamportsToSol } from "@/lib/utils/solana";
import { Redis } from "@/lib/payments-worker/redis";

// Get all user payments
export async function GET() {
  try {
    const session = await getSession();

    const payments = await prisma.payment.findMany({
      where: {
        user_id: session.user.id,
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });

    const newPayments = payments.map((payment) => {
      return {
        ...payment,
        amount: lamportsToSol(payment.amount),
      };
    });

    return NextResponse.json(newPayments, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(error.message, { status: 500 });
  }
}

// Payout user balance to user (by application escrow)
export async function POST() {
  try {
    const session = await getSession();
    const userId = session?.user?.id;

    if (!userId) {
      return new Response("User is required", { status: 400 });
    }

    await prisma.$transaction(
      async (tx: any) => {
        const user = await tx.user.findUnique({
          where: { id: userId },
        });
        if (!user) {
          throw new Error("User not found");
        }
        if (user.pending_amount < 30000000) {
          throw new Error(
            "Your need to have atleast 0.03 sol as pending amount to withdraw."
          );
        }
        const amount = user.pending_amount;

        if (user.locked_amount > 0) {
          throw new Error(
            "You already have a pending payout. Please wait for it to be processed."
          );
        }

        await tx.user.update({
          where: {
            id: userId,
          },
          data: {
            pending_amount: {
              decrement: amount,
            },
            locked_amount: {
              increment: amount,
            },
          },
        });
      },
      {
        isolationLevel: "Serializable", // runs all concurrent request in series and prevents double spending
      }
    );

    try {
      await Redis.getInstance().send("user_payment", {
        data: {
          userId,
        },
      });
    } catch (error) {
      console.error("Failed to add to queue", error);
      return NextResponse.json(
        {
          error: "An error occurred while creating escrow: " + error,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Pending amount locked. Payout will be processed shortly" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "An error occurred while processing payout: " + error.message,
      },
      { status: 500 }
    );
  }
}
