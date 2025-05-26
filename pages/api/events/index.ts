import { NextApiRequest, NextApiResponse } from "next";
import db from '@/lib/db';

// GET /api/events - List events with pagination and filters
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {

        const { title, location, date, dateBefore, dateAfter, page = '1', limit = '10' } = req.query;

        const pageNum = Math.max(1, Number(page));
        const limitNum = Math.max(1, Number(limit));
        const skipRows = (pageNum - 1) * limitNum;

        let query = 'select * from events where 1=1';

        const params: any[] = [];

        if (title) {
            query += ' and title like ?';
            params.push(`%${title}%`);
        }

        if (location) {
            query += ' and location = ?';
            params.push(location)
        }

        if (date) {
            query += ' and date(date) = date(?)';
            params.push(date);
        }

        if (dateBefore) {
            query += ' and date < ?';
            params.push(dateBefore);
        }

        if (dateAfter) {
            query += ' and date > ?';
            params.push(dateAfter);
        }

        query += ' order by date asc limit ? offset ?';
        params.push(limitNum, skipRows);

        try {
            const stmt = db.prepare(query);
            const events = stmt.all(...params);
            res.status(200).json(events);
        } catch (err) {
            res.status(500).json({ error: 'Internal server error', errorDetails: err })
        }
    } else {
        return res.status(404).json({ message: 'Page not found' })
    }
}