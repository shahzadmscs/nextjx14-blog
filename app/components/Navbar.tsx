import Link from "next/link";
import { ModeToggle } from "./ModeToggle";

export default function Navar() {
  return (
    <nav className="w-full relative flex items-center justify-between mx-w-2xl mx-auto px-8 py-5">
      <Link href="/" className="font-bold text-4xl">
        Shahzad<span className="text-primary">Blog</span>
      </Link>
      <ModeToggle />
    </nav>
  );
}
