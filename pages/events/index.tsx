import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Modal from '@/components/Modal';

interface Event {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filters, setFilters] = useState({ title: '', location: '', date: '' });
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [registrationData, setRegistrationData] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      const res = await fetch(`/api/events?${params.toString()}`);
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      setError('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEvents(); }, [filters]);

  const openModal = (event: Event) => {
    setSelectedEvent(event);
    setModalOpen(true);
    setRegistrationData({ name: '', email: '' });
    setError(null);
  };

  const closeModal = () => { setModalOpen(false); };

  const handleRegister = async () => {
    if (!selectedEvent) return;
    const { name, email } = registrationData;
    if (!name || !email) {
      setError('Name and email are required');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event_id: selectedEvent.id, name, email }),
      });
      if (!res.ok) throw new Error('Registration failed');
      closeModal();
      alert('Registered successfully');
    } catch (err) {
      setError('Registration error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4">Upcoming Events</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            placeholder="Search title"
            className="border p-2"
            value={filters.title}
            onChange={(e) => setFilters({ ...filters, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Location"
            className="border p-2"
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          />
          <input
            type="date"
            className="border p-2"
            value={filters.date}
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
          />
        </div>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <ul className="space-y-4">
          {events.map((event) => (
            <li key={event.id} className="border p-4 rounded">
              <div>
                <h2 className="text-lg font-medium">{event.title}</h2>
                <p>{event.description}</p>
                <p className="text-sm text-gray-500">
                  {event.location} | {new Date(event.date).toLocaleString()}
                </p>
              </div>
              <button
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => openModal(event)}
              >
                Register
              </button>
            </li>
          ))}
        </ul>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <h2 className="text-xl font-semibold mb-4">Register for {selectedEvent?.title}</h2>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <input
            type="text"
            placeholder="Your Name"
            className="border p-2 w-full mb-4"
            value={registrationData.name}
            onChange={(e) => setRegistrationData({ ...registrationData, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Your Email"
            className="border p-2 w-full mb-4"
            value={registrationData.email}
            onChange={(e) => setRegistrationData({ ...registrationData, email: e.target.value })}
          />
          <button
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={handleRegister}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </Modal>
      </div>
    </>
  );
}