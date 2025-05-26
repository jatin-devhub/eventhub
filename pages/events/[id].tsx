import { useRouter } from 'next/router';
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

export default function EventDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [registrationData, setRegistrationData] = useState({ name: '', email: '' });
  const [regLoading, setRegLoading] = useState(false);
  const [regError, setRegError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchEvent = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/events/${id}`);
        if (!res.ok) throw new Error('Event not found');
        const data = await res.json();
        setEvent(data);
      } catch (err) {
        setError('Failed to load event');
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const openModal = () => {
    setModalOpen(true);
    setRegistrationData({ name: '', email: '' });
    setRegError(null);
  };

  const closeModal = () => setModalOpen(false);

  const handleRegister = async () => {
    if (!event) return;
    const { name, email } = registrationData;
    if (!name || !email) {
      setRegError('Name and email are required');
      return;
    }
    setRegLoading(true);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event_id: event.id, name, email }),
      });
      if (!res.ok) throw new Error('Registration failed');
      closeModal();
      alert('Registered successfully');
    } catch (err) {
      setRegError('Registration error');
    } finally {
      setRegLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        {loading && <p>Loading event...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {event && (
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">{event.title}</h1>
            <p>{event.description}</p>
            <p className="text-gray-600">
              {event.location} | {new Date(event.date).toLocaleString()}
            </p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={openModal}
            >
              Register
            </button>
          </div>
        )}

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <h2 className="text-xl font-semibold mb-4">Register for {event?.title}</h2>
          {regError && <p className="text-red-500 mb-2">{regError}</p>}
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
            {regLoading ? 'Submitting...' : 'Submit'}
          </button>
        </Modal>
      </div>
    </>
  );
}