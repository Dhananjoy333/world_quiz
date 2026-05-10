import { NextResponse } from "next/server";
import { pool } from "@/lib/neondb"

export async function POST(req) {
  try {
    const body = await req.json();

    const { clerkId, gameMode, score } = body;

    // user not logged in
    if (!clerkId) {
      return NextResponse.json({
        saved: false,
        message: "user not logged in",
      });
    }

    // find user
    const userResult = await pool.query(
      "SELECT id FROM users WHERE clerk_user_id = $1",
      [clerkId]
    );

    if (userResult.rows.length === 0) {
      return NextResponse.json({
        saved: false,
        message: "user not found",
      });
    }

    const userId = userResult.rows[0].id;

    // insert/update high score
    await pool.query(
      `
      INSERT INTO scores (user_id, game_mode, high_score)
      VALUES ($1, $2, $3)
      ON CONFLICT (user_id, game_mode)
      DO UPDATE SET
      high_score = GREATEST(scores.high_score, EXCLUDED.high_score)
      `,
      [userId, gameMode, score]
    );

    return NextResponse.json({
      saved: true,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Database error" },
      { status: 500 }
    );
  }
}