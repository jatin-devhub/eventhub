import Link from 'next/link';

export default function Header() {
  return (
    <nav className="h-[10vh] shadow flex items-center px-10">
      <Link href="/events">
        <div className="text-2xl font-bold">EventHub</div>
      </Link>
    </nav>
  );
}