import { NextResponse } from "next/server";
import { pool } from "@/lib/neondb";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ mode: string; clerkId: string }> }
) {
  const { mode, clerkId } = await params;

  try {
    const result = await pool.query(
      `SELECT s.high_score
       FROM scores s
       JOIN users u ON s.user_id = u.id
       WHERE u.clerk_user_id = $1
       AND s.game_mode = $2`,
      [clerkId, mode]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ highScore: 0 });
    }

    return NextResponse.json({
      highScore: result.rows[0].high_score,
    });

  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Database error" },
      { status: 500 }
    );
  }
}