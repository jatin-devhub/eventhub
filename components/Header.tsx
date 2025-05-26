import Link from 'next/link';

export default function Header() {
  return (
    <nav className="h-[8vh] shadow flex items-center px-6">
      <Link href="/events">
        <div className="text-2xl font-bold">EventHub</div>
      </Link>
    </nav>
  );
}