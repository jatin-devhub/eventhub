import { useEffect, useState } from 'react';
import Header from '@/components/Header';

interface PopularEvent {
  id: number;
  title: string;
  registration_count: number;
}
interface DailyStat {
  date: string;
  registrations: number;
}

export default function AnalyticsPage() {
  const [popular, setPopular] = useState<PopularEvent[]>([]);
  const [daily, setDaily] = useState<DailyStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [popRes, dailyRes] = await Promise.all([
          fetch('/api/admin/popular'),
          fetch('/api/admin/daily'),
        ]);
        if (!popRes.ok || !dailyRes.ok) throw new Error();
        const popData: PopularEvent[] = await popRes.json();
        const dailyData: DailyStat[] = await dailyRes.json();
        setPopular(popData);
        setDaily(dailyData);
      } catch {
        setError('Failed to load analytics');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return (
    <>
      <Header />
      <p className="p-4">Loading analytics...</p>
    </>
  );

  if (error) return (
    <>
      <Header />
      <p className="p-4 text-red-500">{error}</p>
    </>
  );

  return (
    <>
      <Header />
      <div className="container mx-auto p-4 space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-2">Popular Events</h2>
          {popular.length > 0 ? (
            <ul className="list-disc pl-6">
              {popular.map(e => (
                <li key={e.id}>{e.title} — {e.registration_count} registrations</li>
              ))}
            </ul>
          ) : (
            <p>No registration data available.</p>
          )}
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Daily Registrations</h2>
          {daily.length > 0 ? (
            <ul className="list-disc pl-6">
              {daily.map(d => (
                <li key={d.date}>{new Date(d.date).toLocaleDateString()} — {d.registrations}</li>
              ))}
            </ul>
          ) : (
            <p>No registration data available for the last 30 days.</p>
          )}
        </section>
      </div>
    </>
  );
}