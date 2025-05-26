// POST /api/register - Register for an event

import db from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { event_id, name, email } = req.body;

        if (!event_id || !name || !email) {
            return res.status(400).json({ message: "All fields are required" });
        }

        try {
            const stmt = db.prepare('insert into registrations (event_id, name, email) values (?, ?, ?)');
            stmt.run(Number(event_id), name, email);
            return res.status(201).json({ message: "Registration successful" });
        } catch (err) {
            res.status(500).json({ error: 'Internal server error', errorDetails: err })
        }
    } else {
        return res.status(404).json({ message: 'Page not found' })
    }
}