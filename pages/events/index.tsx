import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Modal from '@/components/Modal';
import Link from 'next/link';

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
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [registrationData, setRegistrationData] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [registrationError, setRegistrationError] = useState<string | null>(null);
  const [registerLoading, setRegisterLoading] = useState(false);

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
    setRegisterModalOpen(true);
    setRegistrationData({ name: '', email: '' });
    setRegistrationError(null);
  };

  const closeModal = () => { setRegisterModalOpen(false); };

  const handleRegister = async () => {
    if (!selectedEvent) return;
    const { name, email } = registrationData;
    if (!name || !email) {
      setRegistrationError('Name and email are required');
      return;
    }
    setRegisterLoading(true);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event_id: selectedEvent.id, name, email }),
      });
      if (!res.ok) throw new Error('Registration failed');
      alert('Registered successfully');
      closeModal();
    } catch (err) {
      setError('Registration error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-10">
        <h1 className="text-4xl font-semibold text-center m-2">Find your next event</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-6">
          <input
            type="text"
            placeholder="Search title"
            className="border p-2 rounded-lg"
            value={filters.title}
            onChange={(e) => setFilters({ ...filters, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Location"
            className="border p-2 rounded-lg"
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          />
          <input
            type="date"
            className="border p-2 rounded-lg"
            value={filters.date}
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
          />
        </div>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <ul className="grid grid-cols-1 md:grid-cols-2">
          {events.map((event) => (
            <Link href={`/events/${event.id}`}>
              <li key={event.id} className="border p-4 rounded m-2">
                <div>
                  <h2 className="text-lg font-medium">{event.title}</h2>
                  <p>{event.description.length > 50 ? event.description.substring(0, 50)+"..." : event.description}</p>
                  <p className="text-sm text-gray-500">
                    {event.location} | {new Date(event.date).toLocaleString()}
                  </p>
                </div>
                <button
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    openModal(event);
                  }}
                >
                  Register
                </button>
              </li>
            </Link>
          ))}
        </ul>

        <Modal isOpen={isRegisterModalOpen} onClose={closeModal}>
          <h2 className="text-xl font-semibold mb-4">Register for {selectedEvent?.title}</h2>
          {registrationError && <p className="text-red-500 mb-2">{registrationError}</p>}
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
            {registerLoading ? 'Submitting...' : 'Submit'}
          </button>
        </Modal>
      </div>
    </>
  );
}