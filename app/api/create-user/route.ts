import { NextResponse } from "next/server"
import {pool} from "@/lib/neondb";

export async function POST(req: Request) {
    const { clerkId, username } = await req.json()

    try {
        await pool.query(`INSERT INTO users (clerk_user_id, username) VALUES ($1, $2) ON CONFLICT (clerk_user_id) DO NOTHING`,
            [clerkId, username]
        )

        return NextResponse.json({
            message: "User created"
        })
    } catch (error) {
        return NextResponse.json(
            { error: "DB error" },
            { status: 500 }
        )
    }
}