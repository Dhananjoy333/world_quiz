import { pool } from "@/lib/neondb"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const result = await pool.query(`
        SELECT 
            u.id,
            u.username,
            SUM(s.high_score) AS total_score
        FROM users u
        JOIN scores s ON s.user_id = u.id
        GROUP BY u.id, u.username
        ORDER BY total_score DESC
        LIMIT 10`)
        console.log(result.rows)
        return NextResponse.json(result.rows)
    } catch (error) {
        console.log(error)
        return NextResponse.json([]);
    }
}