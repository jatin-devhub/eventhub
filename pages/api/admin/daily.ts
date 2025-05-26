import { isAdminAuthorized } from "@/lib/checkAdminAuth";
import db from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

// GET /api/admin/registrations/daily - Registrations grouped by day
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        if (!isAdminAuthorized(req)) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }
        try {
            const stmt = db.prepare(`
                select date(created_at) as date, count(*) as registrations
                from registrations
                where created_at >= date('now', '-30 days')
                group by date(created_at)
                order by date desc;
            `)
            const dailyStats = stmt.all();
            res.status(200).json(dailyStats);
        } catch (err) {
            res.status(500).json({ error: 'Internal server error', errorDetails: err })
        }
    } else {
        return res.status(404).json({ message: 'Page not found' })
    }
}