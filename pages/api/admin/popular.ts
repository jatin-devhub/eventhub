import { isAdminAuthorized } from "@/lib/checkAdminAuth";
import db from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

// GET /api/admin/popular-events - Top events in last 30 days
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        if (!isAdminAuthorized(req)) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }
        try {
            const stmt = db.prepare(`
                select ev.id, ev.title, count(reg.id) as registration_count
                from events ev
                left join registrations reg on ev.id = reg.event_id
                group by ev.id
                order by registration_count desc
                limit 10;
            `);
            const popularEvents = stmt.all();
            res.status(200).json(popularEvents);
        } catch (err) {
            res.status(500).json({ error: 'Internal server error', errorDetails: err })
        }
    } else {
        return res.status(404).json({ message: 'Page not found' })
    }
}