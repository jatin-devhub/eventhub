// GET /api/events/:id - Fetch single event details

import db from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { id } = req.query;

        try {
            const stmt = db.prepare('SELECT * FROM events WHERE id = ?');
            const event = stmt.get(Number(id));
            
            if (!event) return res.status(404).json({ message: 'Event with the given id not found' });
            res.status(200).json(event);
        } catch (err) {
            res.status(500).json({ error: 'Internal server error', errorDetails: err })
        }
    } else {
        return res.status(404).json({ message: 'Page not found' })
    }
}